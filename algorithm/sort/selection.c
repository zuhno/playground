#include <stdio.h>

void swap(int *a, int *b);
void sort(int *parr, int start, int len);
void print_arr(int *parr, int len);

int main() {
  int arr[] = {6, 5, 2, 4, 3, 1};
  int len = sizeof(arr) / sizeof(int);

  sort(arr, 2, len);
  print_arr(arr, len);

  return 0;
}

void sort(int *parr, int start, int len) {
  int i, j, min;
  for (i = start; i < len; i++) {
    min = i;
    for (j = i + 1; j < len; j++) {
      if (parr[j] < parr[min]) {
        min = j;
      }
    }
    if (i != min) {
      swap(&parr[i], &parr[min]);
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
