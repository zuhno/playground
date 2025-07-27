#include <stdio.h>

int int_arr[5];
float float_arr[5];
double double_arr[5];
char char_arr[5];

int main(int argc, char *argv[]) {
  printf("int 배열 초기값: ");
  for (int i = 0; i < 5; i++) {
    printf("%d ", int_arr[i]);
  }
  printf("\n");

  printf("float 배열 초기값: ");
  for (int i = 0; i < 5; i++) {
    printf("%f ", float_arr[i]);
  }
  printf("\n");

  printf("double 배열 초기값: ");
  for (int i = 0; i < 5; i++) {
    printf("%lf ", double_arr[i]);
  }
  printf("\n");

  printf("char 배열 초기값: ");
  for (int i = 0; i < 5; i++) {
    printf("%d ", char_arr[i]);
  }
  printf("\n");

  return 0;
}
