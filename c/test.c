#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *str_concat(char *str1, char *str2, char *with);

// friends_len은 배열 friends의 길이입니다.
// gifts_len은 배열 gifts의 길이입니다.
// 파라미터로 주어지는 문자열은 const로 주어집니다. 변경하려면 문자열을 복사해서
// 사용하세요.
int main() {
  int answer = 0;

  char str1[5] = "muzi";
  char str2[6] = "frodo";
  char with[2] = " ";
  char *concated = str_concat(str1, str2, with);
  printf("%s\n", concated);
  free(concated);

  return answer;
}

char *str_concat(char *str1, char *str2, char *with) {
  int i = 0, j = 0, k = 0, l = 0;
  for (; str1[i] != '\0'; i++)
    ;
  for (; str2[j] != '\0'; j++)
    ;
  for (; with[k] != '\0'; k++)
    ;

  char *newStr = (char *)malloc(sizeof(char) * (i + j + k + 1));

  i = 0;
  j = 0;
  k = 0;
  while (str1[i] != '\0') {
    newStr[l++] = str1[i++];
  }
  while (with[k] != '\0') {
    newStr[l++] = with[k++];
  }
  while (str2[j] != '\0') {
    newStr[l++] = str2[j++];
  }

  newStr[l] = '\0';

  return newStr;
}
