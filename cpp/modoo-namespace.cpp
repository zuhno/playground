#include <iostream>

// 네임스페이스는 변수 네이밍 중복을 피하기 위해 등장
// 철수, 서울 사는 철수 != 부산 사는 철수 -> 네임스페이스: 서울, 부산

// header1.h ==================
namespace header1 {
void foo();
}

void publicFunc();
// ============================

// header1.cpp ================
namespace {
// 이름없는 네임스페이스는 해당 파일 안에서만 접근이 가능하다.
int something() {
  std::cout << "something" << std::endl;
  return 0;
}
}  // namespace
namespace header1 {
void foo() {
  std::cout << "header1" << std::endl;
  something();  // 접근 가능
}
}  // namespace header1

void publicFunc() {
  std::cout << "public func" << std::endl;
  something();  // 접근 가능
}
// ============================

// main.cpp ===================
// #include "header1.h"
int main() {
  header1::foo();
  something();   // 접근 불가
  publicFunc();  // 접근 가능

  return 0;
}
// ============================