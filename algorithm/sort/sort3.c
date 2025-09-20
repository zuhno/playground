#include <stdio.h>

void swap(int *value1, int *value2);
void print_arr(int *arr, int len, char *prefix);
void bubble(int *arr, int left, int right);
void selection(int *arr, int left, int right);
void insertion(int *arr, int left, int right);
void merge(int *arr, int left, int right, int *temp_arr);
void quick(int *arr, int left, int right);
void shell(int *arr, int left, int right);

int main(int argc, char **argv) {
  int arr1[10] = {9, 3, 4, 2, 1, 5, 6, 7, 8, 0};
  bubble(arr1, 3, 9);
  print_arr(arr1, 10, "bubble: ");

  int arr2[10] = {9, 3, 4, 2, 1, 5, 6, 7, 8, 0};
  selection(arr2, 3, 9);
  print_arr(arr2, 10, "selection: ");

  int arr3[10] = {9, 3, 4, 2, 1, 5, 6, 7, 8, 0};
  insertion(arr3, 3, 9);
  print_arr(arr3, 10, "insertion: ");

  int arr4[10] = {9, 3, 4, 2, 1, 5, 6, 7, 8, 0};
  int temp_arr[10] = {};
  merge(arr4, 3, 9, temp_arr);
  print_arr(arr4, 10, "merge: ");

  int arr5[10] = {9, 3, 4, 2, 1, 5, 6, 7, 8, 0};
  quick(arr5, 3, 9);
  print_arr(arr5, 10, "quick: ");

  int arr6[10] = {9, 3, 4, 2, 1, 5, 6, 7, 8, 0};
  shell(arr6, 3, 9);
  print_arr(arr6, 10, "shell: ");

  return 0;
}

void swap(int *value1, int *value2) {
  int temp = *value1;
  *value1 = *value2;
  *value2 = temp;
}

void print_arr(int *arr, int len, char *prefix) {
  int i;
  while (*prefix != '\0') {
    printf("%c", *(prefix++));
  }
  printf("[ ");
  for (i = 0; i < len; i++) {
    printf("%d", arr[i]);
    if (i < len - 1) {
      printf(", ");
    }
  }
  printf(" ]\n");
}

void bubble(int *arr, int left, int right) {
  int i, j;
  for (i = left; i <= right; i++) {
    for (j = left; j <= right - i - 1 + left; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(&arr[j], &arr[j + 1]);
      }
    }
  }
}

void selection(int *arr, int left, int right) {
  int i, j, min;
  for (i = left; i <= right; i++) {
    min = i;
    for (j = i + 1; j <= right; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    swap(&arr[i], &arr[min]);
  }
}

void insertion(int *arr, int left, int right) {
  int i, j, key;
  for (i = left + 1; i <= right; i++) {
    key = arr[i];
    for (j = i - 1; j >= left && arr[j] > key; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = key;
  }
}

void _merge(int *arr, int left, int mid, int right, int *temp_arr) {
  int i = left;
  int j = mid + 1;
  int k = left;
  int l = left;

  while (i <= mid && j <= right) {
    if (arr[i] < arr[j]) {
      temp_arr[k++] = arr[i++];
    } else {
      temp_arr[k++] = arr[j++];
    }
  }

  if (i > mid) {
    while (j <= right) {
      temp_arr[k++] = arr[j++];
    }
  } else {
    while (i <= mid) {
      temp_arr[k++] = arr[i++];
    }
  }

  while (l <= right) {
    arr[l] = temp_arr[l];
    l++;
  }
}
void merge(int *arr, int left, int right, int *temp_arr) {
  int mid;
  if (left < right) {
    mid = (left + right) / 2;
    merge(arr, left, mid, temp_arr);
    merge(arr, mid + 1, right, temp_arr);
    _merge(arr, left, mid, right, temp_arr);
  }
}

int partition(int *arr, int left, int right) {
  int pivot = arr[left];
  int i = left - 1;
  int j = right + 1;

  while (1) {
    do {
      i++;
    } while (arr[i] < pivot && i <= right);

    do {
      j--;
    } while (arr[j] > pivot && j >= left);

    if (i >= j) {
      return j;
    }

    swap(&arr[i], &arr[j]);
  }
}
void quick(int *arr, int left, int right) {
  int p;
  if (left < right) {
    p = partition(arr, left, right);
    quick(arr, left, p);
    quick(arr, p + 1, right);
  }
}

void _insertion(int *arr, int left, int right, int gap) {
  int i, j, key;
  for (i = left + gap; i <= right; i += gap) {
    key = arr[i];
    for (j = i - gap; j >= left && arr[j] > key; j -= gap) {
      arr[j + gap] = arr[j];
    }
    arr[j + gap] = key;
  }
}
void shell(int *arr, int left, int right) {
  int i, gap;
  for (gap = (right - left) / 2; gap > 0; gap /= 2) {
    if (gap % 2 == 0) {
      gap++;
    }
    for (i = 0; i < gap; i++) {
      _insertion(arr, left + i, right, gap);
    }
  }
}
