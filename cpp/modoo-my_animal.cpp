#include <iostream>

typedef struct {
  char name[30];
  int age;

  int health;
  int food;
  int clean;
} Animal;

void create_animal(Animal *animal);
void play_animal(Animal *animal);
void status_animal(Animal *animal);
void pass_one_day(Animal *animal);

int main(int argc, char *argv[]) {
  Animal *list[30];  // 포인터(Animal)의 배열

  int animal_num = 0;

  while (1) {
    std::cout << "1. 동물 추가하기" << std::endl;
    std::cout << "2. 놀기" << std::endl;
    std::cout << "3. 상태 보기" << std::endl;

    int input;
    std::cin >> input;

    switch (input) {
      int play_with;
      case 1:
        list[animal_num] = new Animal;
        create_animal(list[animal_num]);

        animal_num++;
        break;
      case 2:
        std::cout << "누구랑 놀껀가요? : ";
        std::cin >> play_with;

        if (play_with < animal_num) play_animal(list[play_with]);
        break;
      case 3:
        std::cout << "누구의 상태를 볼껀가요? : ";
        std::cin >> play_with;

        if (play_with < animal_num) status_animal(list[play_with]);
        break;
    }

    for (int i = 0; i < animal_num; i++) {
      pass_one_day(list[i]);
    }
    std::cout << "하루가 지났습니다." << std::endl;
  }

  for (int i = 0; i < animal_num; i++) {
    delete list[i];
  }

  return 0;
}

void create_animal(Animal *animal) {
  std::cout << "이름을 입력해주세요 : ";
  std::cin >> animal->name;
  std::cout << "나이를 입력해주세요 : ";
  std::cin >> animal->age;

  animal->health = 100;
  animal->food = 100;
  animal->clean = 100;
};

void play_animal(Animal *animal) {
  animal->health += 10;
  animal->food -= 20;
  animal->clean -= 30;
};

void status_animal(Animal *animal) {
  std::cout << animal->name << "의 상태" << std::endl;
  std::cout << "체력 : " << animal->health << std::endl;
  std::cout << "배부름 : " << animal->food << std::endl;
  std::cout << "청결 : " << animal->clean << std::endl;
};

void pass_one_day(Animal *animal) {
  animal->health -= 10;
  animal->food -= 30;
  animal->clean -= 20;
}