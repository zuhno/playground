#include <iostream>

int main(int argc, char *argv[]) {
  int size;

  std::cout << "array size : ";
  std::cin >> size;

  int *pa = new int[size];  // = (int *)malloc(sizeof(int) * size)

  for (int i = 0; i < size; i++) {
    std::cout << "insert data : ";
    std::cin >> pa[i];
  }

  for (int i = 0; i < size; i++) {
    std::cout << i << "th element of list : " << pa[i] << std::endl;
  }

  delete[] pa;  // = free()

  /////

  int *pb = new int;  // = (int *)malloc(sizeof(int))

  *pb = 3;

  std::cout << "*pb : " << *pb << std::endl;

  delete pb;  // = free()

  return 0;
}
