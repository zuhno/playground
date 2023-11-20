#include <stdio.h>
#define sum(x, y) ((x) + (y))

// inline 은 말 그대로 컴파일러에게 주는 힌트 입니다. 이 함수를 *인라인 해도 됨* 이라고 알려주는 것이지요.
// 실제로 인라인 할지 말지는 컴파일러가 결정합니다. 함수를 인라인 하게 되면 강좌에서도 말하였듯이 함수의
// 호출 과정을 거칠 필요가 없어지므로 속도가 향상될 수 있는 대신 코드의 크기가 커지죠.
// 컴파일러가 이러한 사항들을 고려해서 결정하기 때문에 같은 코드를 생성할 수 도 있고 아닐 수 도 있습니다.
static inline int mul(int x, int y) { return x * y; }

int main() {
  printf("sum : %d \n", sum(4, 5));
  printf("mul : %d \n", mul(4, 5));
  return 0;
}
