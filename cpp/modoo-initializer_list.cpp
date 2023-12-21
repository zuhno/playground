#include <iostream>

class Animal {
    const char *sound;
    const int bio;
    int age;
    int food;

  public:
    Animal(int b);
    Animal(int b, const char *s);
};

Animal::Animal(int b) : bio(b) {
  sound = NULL;
  age = 1;
  food = 100;
}
Animal::Animal(int b, const char *s) : sound(s), bio(b) {
  age = 1;
  food = 100;

  // sound = (char *)malloc(sizeof(char) * (strlen(s) + 1));
  // sound = new char[strlen(s) + 1];
  // strcpy(sound, s);
}

int main() {
  Animal animal(1);
  Animal animal2(0, "walwal");

  return 0;
}