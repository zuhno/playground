#include <stdio.h>

// 1. BigNum 구조체의 변수들의 덧셈, 뺄셈을 수행하는 함수를 작성해보세요 (난이도 : 中上)

// 2. BigNum 구조체 변수들의 곱셈을 수행하는 함수를 만들어보세요 (난이도 : 上)

// 3. BigNum 구조체 변수들의 나눗셈을 수행하는 함수를 만들어보세요 (난이도 : 最上)

struct BigNum {
  int i_digit[100];   // 정수 부분
  int d_digit[100];   // 소수 부분
  int i_total_digit;  // 전체 사용되고 있는 정수부분 자리수
  int d_total_digit;  // 전체 사용되고 있는 소수부분 자리수
  char sign;          // 부호, 0 이면 양수, 1 이면 음수. 0 은 양수로 간주한다.
};

int main() {
  return 0;
}