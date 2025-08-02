#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_PARAMS 100
#define DOOR_HAS_GOAT 0
#define DOOR_HAS_CAR 1

typedef struct {
  float change_case_per;
  float keep_case_per;
} result_montyhall;

int g_has_hint = 1;
int g_door_length = 3;
int g_case_length = 1000000;
float g_threshold = 2.0;

result_montyhall simulate_montyhall(void);
void handle_parameters(int argc, char *argv[]);
int make_random_num(int min, int max);
int *make_doors(void);
void keep(int *doors, int *count);
void change(int *doors, int *count);
void print_arr(int *parr, int len);
void print_result(result_montyhall result);

int main(int argc, char *argv[]) {
  handle_parameters(argc, argv);

  result_montyhall result = simulate_montyhall();

  print_result(result);

  return 0;
}

void print_result(result_montyhall result) {
  float diff_rate = result.change_case_per - result.keep_case_per;

  printf("=====================================\n");
  printf("%-26s : %d\n", "Number of doors", g_door_length);
  printf("%-26s : %d\n", "Number of trials", g_case_length);
  printf("%-26s : %.2f%%\n", "Threshold", g_threshold);
  printf("%-26s : %s\n", "Host revealed a goat door",
         g_has_hint ? "Yes" : "No");
  printf(" ----------------------------------- \n");
  printf("%-26s : %.2f%%\n", "Winning rate when keeping", result.keep_case_per);
  printf("%-26s : %.2f%%\n", "Winning rate when changing",
         result.change_case_per);
  printf("%-26s : %.2f%%\n", "Difference in winning rate", diff_rate);
  printf(" ----------------------------------- \n");
  if (diff_rate > g_threshold) {
    printf("Result: Changing is beneficial.\n");
  } else {
    printf("Result: There is no point in changing.\n");
  }
  printf("=====================================\n");
}

void handle_parameters(int argc, char *argv[]) {
  int i = 1, param_count = 0;
  char *equal_sign, *key, *value;

  for (; i < argc; i++) {
    if (strncmp(argv[i], "--", 2) == 0) {
      equal_sign = strchr(argv[i], '=');

      if (equal_sign != NULL) {
        *equal_sign = '\0';
        key = argv[i] + 2;
        value = equal_sign + 1;

        if (param_count < MAX_PARAMS) {
          if (strcmp(key, "door") == 0) {
            g_door_length = atoi(value);
          } else if (strcmp(key, "case") == 0) {
            g_case_length = atoi(value);
          } else if (strcmp(key, "hint") == 0) {
            g_has_hint = atoi(value);
          } else if (strcmp(key, "threshold") == 0) {
            g_threshold = atof(value);
          } else {
            fprintf(stderr, "ERROR: Unsupported argument '--%s'\n", key);
            exit(EXIT_FAILURE);
          }
          param_count++;
        }
      }
    }
  }
}

result_montyhall simulate_montyhall(void) {
  srand(time(NULL));

  int i;
  int keep_case = 0;
  int change_case = 0;
  int *doors;
  result_montyhall result;

  for (i = 0; i < g_case_length; i++) {
    doors = make_doors();
    // print_arr(doors, g_door_length);
    keep(doors, &keep_case);
    change(doors, &change_case);
    free(doors);
  }

  result.keep_case_per = ((float)keep_case / g_case_length) * 100;
  result.change_case_per = ((float)change_case / g_case_length) * 100;

  return result;
}

int make_random_num(int min, int max) {
  return (rand() % (max - min + 1)) + min;
}

int *make_doors(void) {
  int *doors = (int *)malloc(sizeof(int) * g_door_length);
  int i = 0;
  int car_index;

  if (!doors) {
    perror("Failed malloc");
    exit(EXIT_FAILURE);
  }

  car_index = make_random_num(0, g_door_length - 1);

  for (; i < g_door_length; i++) {
    doors[i] = (i == car_index) ? DOOR_HAS_CAR : DOOR_HAS_GOAT;
  }

  return doors;
}

void print_arr(int *parr, int len) {
  int i;

  printf("[ ");
  for (i = 0; i < len; i++) {
    if (i != 0) {
      printf(", ");
    }
    printf("%d", parr[i]);
  }
  printf(" ]\n");
}

void keep(int *doors, int *count) {
  int select_index = make_random_num(0, g_door_length - 1);
  if (doors[select_index]) {
    (*count)++;
  }
}

void change(int *doors, int *count) {
  int first_select_index = make_random_num(0, g_door_length - 1);
  int second_select_index, i, j;
  int hint_index = -1;
  int candidates[g_door_length];

  if (g_has_hint) {
    for (i = 0; i < g_door_length; i++) {
      if (!doors[i] && i != first_select_index) {
        hint_index = i;
        break;
      }
    }
  }

  for (i = 0, j = 0; i < g_door_length; i++) {
    if (i != first_select_index && i != hint_index) {
      candidates[j++] = i;
    }
  }

  second_select_index = candidates[make_random_num(0, j - 1)];

  if (doors[second_select_index]) {
    (*count)++;
  }
}
