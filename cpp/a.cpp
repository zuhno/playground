#define _GLIBCXX_HOSTED 1

#include <bits/stdc++.h>

int n, a[1004], cnt;
int go(int l, int r) {
  cnt++;

  if (l == r) {
    return a[l];
  }

  int mid = (l + r) / 2;
  int sum = go(l, mid) + go(mid + 1, r);

  return sum;
}

int main() {
  std::cout << "input : ";
  std::cin >> n;

  for (int i = 1; i <= n; i++) {
    a[i - 1] = i;
  }

  int sum = go(0, n - 1);
  std::cout << sum << std::endl;
  std::cout << "cnt : " << cnt << std::endl;
}
