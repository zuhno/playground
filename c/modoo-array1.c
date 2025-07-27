// 배열 실습 - 소수 출력 프로그램 만들기

#include <math.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
  int prime = 5, index = 2;
  int primeArr[1000], isPrime, num;

  primeArr[0] = 2;
  primeArr[1] = 3;

  for (;;) {
    isPrime = 1;
    for (num = 2; pow(num, 2) <= prime; num++) {
      if (prime % num == 0) {
        isPrime = 0;
        break;
      }
    }

    if (isPrime) {
      primeArr[index] = prime;
      printf("%d\n", primeArr[index]);
      index++;

      if (index == 1000) {
        break;
      }
    }

    prime += 2;
  }

  return 0;
}
