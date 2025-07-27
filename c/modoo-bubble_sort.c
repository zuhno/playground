#include <stdio.h>

int bubbleSort(int arr[10], int len) {
  int i, j, k, t;
  int indexes[10];

  for (k = 0; k < len; k++) {
    indexes[k] = k;
  }

  for (i = 0; i < len - 1; i++) {
    for (j = i + 1; j < len; j++) {
      int temp;
      int temp2;

      if (arr[i] > arr[j]) {
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;

        temp2 = indexes[j];
        indexes[j] = indexes[i];
        indexes[i] = temp2;
      }
    }
  }

  printf("성적순으로 정렬\n");
  for (t = 0; t < len; t++) {
    printf("%d 번째 학생 점수 : %d, 그래프: ", indexes[t] + 1, arr[t]);

    int g;
    for (g = 0; g < arr[t]; g++) {
      printf("*");
    }

    printf("\n");
  }

  return 0;
}

int main() {
  int i, j;
  int scores[10];

  for (i = 0; i < 10; i++) {
    printf("%d 번째 학생 점수:", i + 1);
    scanf("%d", &scores[i]);
  }

  bubbleSort(scores, 10);

  return 0;
}