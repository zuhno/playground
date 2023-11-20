#include <stdio.h>
#include <string.h>

int add(int a, int b);

typedef int CAL_TYPE;
typedef int (*Padd)(int, int);
typedef int Arrays[10];
typedef struct
{
  int age;
  int height;
  int gender;
} Human;

int main(int argc, char *argv[]) {
  CAL_TYPE integer = 10;
  Padd padd = add;  // 함수를 할당하면 함수 시작주소를 반환한다.
  Arrays arr = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  Human human = {31, 171, 1};
  char gender[7];

  if (human.gender == 0) {
    strcpy(gender, "female");
  } else {
    strcpy(gender, "male");
  }

  printf("integer : %d \n", integer);
  printf("padd : %d \n", padd(4, 9));
  printf("arr[3] : %d \n", arr[3]);
  printf("human age : %d / height : %d / gender : %s \n", human.age, human.height, gender);

  return 0;
}

int add(int a, int b) {
  return a + b;
}