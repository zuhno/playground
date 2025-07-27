#include <stdio.h>

void sort(int *parr, int start, int len);
void print_arr(int *parr, int len);

int main() {
  int arr[] = {6, 5, 2, 4, 3, 1};
  int len = sizeof(arr) / sizeof(int);

  sort(arr, 0, len);
  print_arr(arr, len);

  return 0;
}

void sort(int *parr, int start, int len) {
  int i, j, key;
  for (i = start + 1; i < len; i++) {
    key = parr[i];
    for (j = i - 1; j >= start && key < parr[j]; j--) {
      parr[j + 1] = parr[j];
    }
    parr[j + 1] = key;
  }
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
