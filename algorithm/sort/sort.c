#include <stdio.h>

int restore(int *parr);
void swap(int *a, int *b);
void print_arr(int *arr, int len, char *prefix);

void bubble(int *arr, int left, int right);
void selection(int *arr, int left, int right);
void insertion(int *arr, int left, int right);
void merge(int *arr, int left, int right, int *temp_arr);
void quick(int *arr, int left, int right);
void shell(int *arr, int left, int right);
void heap(int *arr, int left, int right);

int main(int argc, char **argv) {
  int len;
  int arr[100];
  int temp_arr[100];
  char prefix_bubble[] = "bubble sort    : ";
  char prefix_selection[] = "selection sort : ";
  char prefix_insertion[] = "insertion sort : ";
  char prefix_merge[] = "merge sort     : ";
  char prefix_quick[] = "quick sort     : ";
  char prefix_shell[] = "shell sort     : ";
  char prefix_heap[] = "heap sort      : ";

  len = restore(arr);
  bubble(arr, 0, len - 1);
  print_arr(arr, len, prefix_bubble);

  len = restore(arr);
  selection(arr, 0, len - 1);
  print_arr(arr, len, prefix_selection);

  len = restore(arr);
  insertion(arr, 0, len - 1);
  print_arr(arr, len, prefix_insertion);

  len = restore(arr);
  merge(arr, 0, len - 1, temp_arr);
  print_arr(arr, len, prefix_merge);

  len = restore(arr);
  quick(arr, 0, len - 1);
  print_arr(arr, len, prefix_quick);

  len = restore(arr);
  shell(arr, 0, len - 1);
  print_arr(arr, len, prefix_shell);
  return 0;
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
  int min, i, j;
  for (i = left; i <= right; i++) {
    min = i;
    for (j = i + 1; j <= right; j++) {
      if (arr[j] < arr[min]) {
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
  int i, j, k, l;
  i = left;
  j = mid + 1;
  k = left;
  l = left;

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

  for (; l <= right; l++) {
    arr[l] = temp_arr[l];
  }
}
void merge(int *arr, int left, int right, int *temp_arr) {
  if (left < right) {
    int mid = (left + right) / 2;
    merge(arr, left, mid, temp_arr);
    merge(arr, mid + 1, right, temp_arr);
    _merge(arr, left, mid, right, temp_arr);
  }
}

int partition(int *arr, int left, int right) {
  int pivot = arr[left];
  int low = left - 1;
  int high = right + 1;

  while (1) {
    do {
      low++;
    } while (low <= right && arr[low] < pivot);

    do {
      high--;
    } while (high >= left && arr[high] > pivot);

    if (low >= high) {
      return high;
    }

    swap(&arr[low], &arr[high]);
  }
}
void quick(int *arr, int left, int right) {
  if (left < right) {
    int p = partition(arr, left, right);
    quick(arr, left, p);
    quick(arr, p + 1, right);
  }
}

// Insertion sort for shell
void _shell(int *arr, int left, int right, int gap) {
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
  for (gap = (left + right) / 2; gap > left; gap /= 2) {
    if (gap % 2 == 0) {
      gap++;
    }

    for (i = 0; i < gap; i++) {
      _shell(arr, left + i, right, gap);
    }
  }
}

void heap(int *arr, int left, int right) {
  // TODO: implement heap sort
}

int restore(int *parr) {
  int i;
  int arr[] = {100,  1,      2,   3,    123,  12321, 1,   123124214, 435346,
               45,   876867, 987, 8908, 234,  300,   232, 1000,      3,
               1212, 233,    223, 1546, 4578, 9,     76,  4565,      34524,
               31,   1,      3,   234,  66,   45,    986, 76,        6580};
  int len = sizeof(arr) / sizeof(int);

  for (i = 0; i < len; i++) {
    parr[i] = arr[i];
  }

  return len;
}

void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}

void print_arr(int *arr, int len, char *prefix) {
  int i;

  printf("%s", prefix);
  printf("[ ");
  for (i = 0; i < len; i++) {
    if (i != 0) {
      printf(", ");
    }
    printf("%d", arr[i]);
  }
  printf(" ]\n");
}
