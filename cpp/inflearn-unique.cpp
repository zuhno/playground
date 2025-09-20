#define _GLIBCXX_HOSTED 1

#include <bits/stdc++.h>

std::map<int, int> map;

void unique(int *arr, int len) {
  int i;
  for (i = 0; i < len; i++) {
    map.insert({arr[i], arr[i]});
  }

  for (auto item : map) {
    std::cout << item.first << std::endl;
  }
}

int main() {
  int arr[] = {3, 3, 3, 2, 2, 1, 4, 5};
  unique(arr, 8);
  return 0;
}
