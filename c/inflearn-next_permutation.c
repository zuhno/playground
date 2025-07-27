#include <stdio.h>

int next_permutation(int *parr, int len);
void quick_sort(int *parr, int left, int right);
void swap(int *i, int *j);
void print_arr(int *parr, int len);

int main(int argc, char *argv[]) {
  int arr[] = {1, 3, 2, 6, 5, 4};
  int len = sizeof(arr) / sizeof(int);

  quick_sort(arr, 0, len - 1);

  do {
    print_arr(arr, len);
  } while (next_permutation(arr, len));

  return 0;
}

int next_permutation(int *parr, int len) {
  int pivot;
  int i = len - 2;
  int j = len - 1;

  // 오른쪽 -> 왼쪽, i < i + 1 인 인덱스를 찾는다
  while (i >= 0 && parr[i] >= parr[i + 1]) {
    i--;
  }
  pivot = i;

  if (pivot < 0) {
    return 0;
  }

  // 오른쪽 -> 왼쪽, 피봇보다 큰 인덱스 중에 피봇 값보다 큰 수를 찾는다
  while (j > pivot && parr[j] <= parr[pivot]) {
    j--;
  }

  swap(&parr[pivot], &parr[j]);
  // 피봇보다 큰 인덱스부터 정렬(여기선 오름차순)
  quick_sort(parr, pivot + 1, len - 1);

  return 1;
}

int partition(int *parr, int left, int right) {
  int pivot = parr[left];
  int low = left - 1;
  int high = right + 1;

  while (1) {
    do {
      low++;
    } while (low <= right && parr[low] < pivot);

    do {
      high--;
    } while (high >= left && parr[high] > pivot);

    if (low >= high) {
      return high;
    }

    swap(&parr[low], &parr[high]);
  }
}
void quick_sort(int *parr, int left, int right) {
  int p;
  if (left < right) {
    p = partition(parr, left, right);
    quick_sort(parr, left, p);
    quick_sort(parr, p + 1, right);
  }
}

void swap(int *i, int *j) {
  int temp = *i;
  *i = *j;
  *j = temp;
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
