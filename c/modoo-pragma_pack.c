#include <stdio.h>

// pragma pack은 마소계열 컴파일러에 유효한 문장인데
// 구조체를 더블 워드 정렬말고 1바이트 단위로 정렬하라는 뜻.
// 값은 1,2,4,8,16 등이 올 수 있다.
// ! 사용 안하면 Weird 구조체는 5바이트를 사용하지만 더블 워드 경계로 8바이트가 할당된다.
#pragma pack(1)
struct Weird {
  char arr[1];
  int i;
};

int main() {
  struct Weird a;

  printf("size of a : %lu \n", sizeof(a));

  return 0;
}