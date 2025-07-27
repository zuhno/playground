#include <stdio.h>

void sort(int *parr, int left, int right);
void merge(int *parr, int left, int mid, int right);
void print_arr(int *parr, int len);

int temp_arr[100];

int main() {
  int arr[] = {6, 5, 2, 4, 3, 1};
  int len = sizeof(arr) / sizeof(int);

  sort(arr, 0, len - 1);
  print_arr(arr, len);

  return 0;
}

void merge(int *parr, int left, int mid, int right) {
  int i, j, k, l;
  i = left;
  j = mid + 1;
  k = left; // 임시 배열 인덱스

  while (i <= mid && j <= right) {
    if (parr[i] < parr[j]) {
      temp_arr[k++] = parr[i++];
    } else {
      temp_arr[k++] = parr[j++];
    }
  }

  if (i > mid) {
    while (j <= right) {
      temp_arr[k++] = parr[j++];
    }
  } else {
    while (i <= mid) {
      temp_arr[k++] = parr[i++];
    }
  }

  for (l = left; l <= right; l++) {
    parr[l] = temp_arr[l];
  }
}

void sort(int *parr, int left, int right) {
  int mid;

  if (right > left) {
    mid = (left + right) / 2;
    sort(parr, left, mid);
    sort(parr, mid + 1, right);
    merge(parr, left, mid, right);
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
