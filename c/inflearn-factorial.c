#include <stdio.h>

int fact(int n) {
  if (n == 1 || n == 0)
    return 1;
  return n * fact(n - 1);
}

int main(int argc, char *argv[]) {
  int ret, num;

  printf("어떤 수의 팩토리얼을 구해볼까요? ");
  scanf("%d", &num);

  ret = fact(num);

  printf("result : %d\n", ret);

  return 0;
}
