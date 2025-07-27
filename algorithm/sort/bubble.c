#include <stdio.h>

void swap(int *a, int *b);
void sort(int *parr, int start, int len);
void print_arr(int *parr, int len);

int main() {
  int arr[] = {5, 2, 4, 3, 1};
  int len = sizeof(arr) / sizeof(int);

  sort(arr, 1, len);
  print_arr(arr, len);

  return 0;
}

void sort(int *parr, int start, int len) {
  int i, j;
  for (i = start; i < len; i++) {
    for (j = start; j < len - 1 - i + start; j++) {
      if (parr[j] > parr[j + 1]) {
        swap(&parr[j], &parr[j + 1]);
      }
    }
  }
}

void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
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
  printf(" ]");
}
