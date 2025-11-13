#include <stdio.h>

int main(int argc, char *argv[]) {
  int a[3] = {9, 0, 0};
  int(*arr)[3] = &a;

  printf("%p\n", a);
  printf("%p\n", &a);
  printf("%p\n", *arr);

  return 0;
}
