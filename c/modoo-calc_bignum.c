#include <stdio.h>

// 1. BigNum 구조체의 변수들의 덧셈, 뺄셈을 수행하는 함수를 작성해보세요 (난이도
// : 中上)

// 2. BigNum 구조체 변수들의 곱셈을 수행하는 함수를 만들어보세요 (난이도 : 上)

// 3. BigNum 구조체 변수들의 나눗셈을 수행하는 함수를 만들어보세요 (난이도 :
// 最上)

/** Big Number 구조체 */
typedef struct {
  short i_digit[100]; // 정수 부분
  short d_digit[100]; // 소수 부분
  int i_total_digit;  // 전체 사용되고 있는 정수부분 자리수
  int d_total_digit;  // 전체 사용되고 있는 소수부분 자리수
  short sign; // 부호, 0 이면 양수, 1 이면 음수. 0 은 양수로 간주한다.
} BigNum;

/** 실수형 데이터를 나타내는 문자열을 Big Number 구조체로 변환 */
void convBigNum(BigNum *dest, char *str);
/** 덧셈 연산 */
int add(BigNum *num1, BigNum *num2);
/** 뺄셈 연산 */
int sub(BigNum *num1, BigNum *num2);
/** 곱셈 연산 */
int mul(BigNum *num1, BigNum *num2);
/** 나눗셈 연산 */
int div(BigNum *num1, BigNum *num2);

int main() {
  char temp_str1[300], temp_str2[300];
  BigNum big_num1, big_num2;

  int result_add, result_sub, result_mul, result_div;

  printf("큰 수 연산을 시작합니다.\n");
  printf("첫번째 수를 입력하세요 : ");
  scanf("%299s", temp_str1);
  fflush(stdout);
  printf("두번째 수를 입력하세요 : ");
  scanf("%299s", temp_str2);

  convBigNum(&big_num1, temp_str1);
  convBigNum(&big_num2, temp_str2);

  result_add = add(&big_num1, &big_num2);
  printf("\n덧셈 결과 : %d\n", result_add);

  result_sub = sub(&big_num1, &big_num2);
  printf("뺄셈 결과 : %d\n", result_sub);

  result_mul = mul(&big_num1, &big_num2);
  printf("곱셈 결과 : %d\n", result_mul);

  result_div = div(&big_num1, &big_num2);
  printf("나눗셈 결과 : %d\n", result_div);

  return 0;
}

void convBigNum(BigNum *dest, char *str) {
  int is_decimal = 0;
  int int_index = 0;
  int dec_index = 0;

  dest->i_total_digit = 0;
  dest->d_total_digit = 0;
  dest->sign = 1;
  if (*str == '-') {
    dest->sign = 0;
    str++;
  } else if (*str == '+') {
    str++;
  }

  while (*str) {
    if (*str == '.') {
      is_decimal = 1;
      str++;
      continue;
    }

    if (is_decimal) {
      dest->d_digit[dec_index] = *str - '0';
      dest->d_total_digit++;
      dec_index++;
    } else {
      dest->i_digit[int_index] = *str - '0';
      dest->i_total_digit++;
      int_index++;
    }

    str++;
  }
}

int add(BigNum *num1, BigNum *num2) { return 0; }
int sub(BigNum *num1, BigNum *num2) { return 0; }
int mul(BigNum *num1, BigNum *num2) { return 0; }
int div(BigNum *num1, BigNum *num2) { return 0; }
