#include <stdio.h>

void swap(int *a, int *b);
void sort(int *parr, int left, int right);
int partition(int *parr, int left, int right);
void print_arr(int *parr, int len);

int main() {
  int arr[] = {100,       1,      2,    3,      123,  12321, 1,
               123124214, 435346, 45,   876867, 987,  8908,  234,
               300,       232,    1000, 3,      1212, 233};
  // int arr[] = {5, 1};
  int len = sizeof(arr) / sizeof(int);

  sort(arr, 0, len - 1);
  print_arr(arr, len);

  return 0;
}

void sort(int *parr, int left, int right) {
  if (left < right) {
    int p = partition(parr, left, right);
    sort(parr, left, p);
    sort(parr, p + 1, right);
  }
}

int partition(int *parr, int left, int right) {
  int pivot = parr[left];
  int low = left - 1;
  int high = right + 1;

  while (1) {
    do {
      low++;
    } while (pivot > parr[low]);

    do {
      high--;
    } while (pivot < parr[high]);

    if (low >= high) {
      return high;
    }

    swap(&parr[low], &parr[high]);
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
  printf(" ]\n");
}
