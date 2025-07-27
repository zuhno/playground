#include <stdio.h>

void sort(int *arr, int left, int right);
void insertion(int *arr, int left, int right, int gap);
void swap(int *a, int *b);
void print_arr(int *arr, int len);

int main(int argc, char **argv) {
  int arr[] = {100,  1,      2,   3,    123,  12321, 1,   123124214, 435346,
               45,   876867, 987, 8908, 234,  300,   232, 1000,      3,
               1212, 233,    223, 1546, 4578, 9,     76,  4565,      34524,
               31,   1,      3,   234,  66,   45,    986, 76,        6580};
  int len = sizeof(arr) / sizeof(int);

  sort(arr, 0, len - 1);
  print_arr(arr, len);

  return 0;
}

void sort(int *arr, int left, int right) {
  int i;
  int gap = (right - left) / 2;

  for (; gap > 0; gap /= 2) {
    if (gap % 2 == 0) {
      gap++;
    }
    for (i = 0; i < gap; i++) {
      insertion(arr, left + i, right, gap);
    }
  }
}

void insertion(int *arr, int left, int right, int gap) {
  int i, j, key;
  for (i = left + gap; i <= right; i += gap) {
    key = arr[i];
    for (j = i - gap; j >= left; j -= gap) {
      if (arr[j] <= key) {
        break;
      }
      arr[j + gap] = arr[j];
    }
    arr[j + gap] = key;
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
