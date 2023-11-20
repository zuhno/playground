#include <stdio.h>

typedef struct
{
  int sensor_flag;
  int data;
} Sensor;

int main(int argc, char *argv[]) {
  Sensor *sensor;
  while (!(sensor->sensor_flag)) {
    // something
  }

  // 보통의 상황에서 sensor->sensor_flag 의 값이 바뀌는 경우는
  // 없기 때문에 굳이 while 문을 매번 돌릴 때 마다 값을 비교할 필요가
  // 없게 된다. 그냥 컴파일러는 값을 딱 한 번만 읽고 0 이 아니라면
  // 그냥 가고, 0 이라면 while 문을 무한히 돌리는 것으로 생각한다.
  // 결과적으로 위 코드를 컴파일러는 다음과 같은 코드로 바꿔버린다.

  if (!(sensor->sensor_flag)) {
    while (1) {
      // something
    }
  }

  // 최적화 안한다는 의미의 volatile 키워드 사용하면
  // 변덕스럽게 변할 수 있는 값이라고 최적화작업을 수행하지 않는다.
  volatile Sensor *sensor;  // *
  while (!(sensor->sensor_flag)) {
    // something
  }

  printf("Hello World! \n");
  return 0;
}
