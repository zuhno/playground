#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Monty Hall Problem

#define HAS_HINT 1
#define QUESTION_COUNT 5
#define TOTAL_QUESTIONS 10000000

int make_random_num(int min, int max);
int *make_questions();
void print_arr(int *parr, int len);
void dont_switch(int *questions, int *count);
void do_switch(int *questions, int *count);

int main(int argc, char *argv[]) {
  srand(time(NULL));
  int i;
  int dont_switch_case = 0;
  int do_switch_case = 0;
  int *questions;
  double dont_switch_case_per, do_switch_case_per;

  for (i = 0; i < TOTAL_QUESTIONS; i++) {
    questions = make_questions();
    // print_arr(questions, QUESTION_COUNT);
    dont_switch(questions, &dont_switch_case);
    do_switch(questions, &do_switch_case);
    free(questions);
  }

  dont_switch_case_per = ((double)dont_switch_case / TOTAL_QUESTIONS) * 100;
  do_switch_case_per = ((double)do_switch_case / TOTAL_QUESTIONS) * 100;

  printf("Don't switch case : %.2f%%\n", dont_switch_case_per);
  printf("Do switch case : %.2f%%\n", do_switch_case_per);

  if (dont_switch_case_per < do_switch_case_per) {
    printf("It is beneficial to change your choice.\n");
  } else {
    printf("There is no point in changing your choice.\n");
  }

  return 0;
}

int make_random_num(int min, int max) {
  return (rand() % (max - min + 1)) + min;
}

int *make_questions() {
  int *questions = (int *)malloc(sizeof(int) * QUESTION_COUNT);
  int has_correct = 0;
  int i = 0;

  while (1) {
    int answer = make_random_num(0, 1);

    if (has_correct && answer) {
      continue;
    }
    if (answer) {
      has_correct = 1;
    }

    questions[i++] = answer;
    if (i == QUESTION_COUNT) {
      if (!has_correct) {
        questions[i - 1] = 1;
      }
      break;
    }
  }

  return questions;
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

void dont_switch(int *questions, int *count) {
  int select_index = make_random_num(0, QUESTION_COUNT - 1);
  if (questions[select_index]) {
    (*count)++;
  }
}

void do_switch(int *questions, int *count) {
  int select_index = make_random_num(0, QUESTION_COUNT - 1);
  int select_index2, i;
  int hint_index = -1;

  if (!questions[select_index]) {
#if HAS_HINT
    for (i = 0; i < QUESTION_COUNT; i++) {
      if (!questions[i] && i != select_index) {
        hint_index = i;
        break;
      }
    }
#endif

    while (1) {
      select_index2 = make_random_num(0, QUESTION_COUNT - 1);
      if (select_index != select_index2 && select_index2 != hint_index) {
        break;
      }
    }
    if (questions[select_index2]) {
      (*count)++;
    }
  }
}
