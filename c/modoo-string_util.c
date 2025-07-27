#include <stdio.h>
#include <stdlib.h>

void strcpy2(char *str1, char *str2);
int strlen2(char *str);
char *strcat2(char *str1, char *str2, int len);
int strcmp2(char *str1, char *str2);

int main(int argc, char *argv[]) {
  int len1, len2, comp;
  char *merge;
  char a[] = "hello";
  char b[] = "world2";

  comp = strcmp2(a, b);
  printf("str1 is same to str2 : %d\n", comp);
  len1 = strlen2(a);
  // strcpy2(a, b);
  len2 = strlen2(a);
  comp = strcmp2(a, b);

  printf("%s\n", a);
  printf("len1 : %d\n", len1);
  printf("len2 : %d\n", len2);
  printf("str1 is same to str2 : %d\n", comp);

  merge = strcat2(a, b, sizeof(a) + sizeof(b) - 1);
  printf("merged string : %s\n", merge);
  free(merge);
  return 0;
}

void strcpy2(char *str1, char *str2) {
  while (*str2) {
    *str1 = *str2;
    str1++;
    str2++;
  }
  *str1 = '\0';
}

int strlen2(char *str) {
  int len = 0;
  while (*str) {
    str++;
    len++;
  }
  len++;
  return len;
}

int strcmp2(char *str1, char *str2) {
  while (*str1 || *str2) {
    if (*str1 != *str2)
      return 0;
    str1++;
    str2++;
  }
  return 1;
}

char *strcat2(char *str1, char *str2, int len) {
  char *newStr = (char *)malloc(len);

  while (*str1) {
    *newStr = *str1;
    newStr++;
    str1++;
  }

  while (*str2) {
    *newStr = *str2;
    newStr++;
    str2++;
  }

  *newStr = '\0';

  // newStr 마지막에 주소값을 증가시키지 않기 때문에 len - 1을 함
  while (len - 1) {
    newStr--;
    len--;
  }

  return newStr;
}
