#include <algorithm>
#include <iostream>

using namespace std;

int N = 9, M = 7;
int subArr[7];
int subArr_index = -1;
bool found = false;

void combi(int i, int *arr);

int main() {
  int i;
  int arr[N];

  cout << "입력:" << endl;
  for (i = 0; i < N; i++) {
    cin >> arr[i];
  }

  combi(-1, arr);
}

void combi(int i, int *arr) {
  if (found)
    return;

  int j, k, sum;
  if (subArr_index + 1 == M) {
    sum = 0;
    for (k = 0; k < M; k++) {
      sum += subArr[k];
    }

    if (sum == 100) {
      sort(subArr, subArr + M);
      cout << endl << "출력:" << endl;
      for (k = 0; k < M; k++) {
        cout << subArr[k] << endl;
      }
      found = true;
    }
    return;
  }

  for (j = i + 1; j < N; j++) {
    subArr[++subArr_index] = arr[j];
    combi(j, arr);
    subArr_index--;
  }
}
