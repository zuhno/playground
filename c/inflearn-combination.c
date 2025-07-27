#include <stdio.h>

#define N 10
#define R 4

void combination(int start, int *arr, int *temp);
void print_arr(int *arr, int len);

int temp_index = -1;
int count = 0;

int main(int argc, char **argv) {
  int arr[N] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  int temp[R];

  combination(-1, arr, temp);
  printf("total count : %d\n", count); // N! / (R! * (N - R)!)

  return 0;
}

void combination(int start, int *arr, int *temp) {
  int i;

  if (R == temp_index + 1) {
    print_arr(temp, R);
    count++;
    return;
  }

  for (i = start + 1; i < N; i++) {
    temp[++temp_index] = arr[i];
    combination(i, arr, temp);
    temp_index--;
  }
}

void print_arr(int *arr, int len) {
  int i;

  printf("[ ");
  for (i = 0; i < len; i++) {
    if (i != 0) {
      printf(", ");
    }
    printf("%d", arr[i]);
  }
  printf(" ]\n");
}
