#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h>
#define ESC 0x1b
#define TAB 0x9
#define LONG 16      // 전광판 길이
#define FOOT 24 + 16 // 기본위치
#define DUMMY 3.141592

void gotoxy(int x, int y);
void ptf(int x, int y);
void speed(int x);
void title_ptf();

char *len_p; // 전역 포인터 변수
static int _speed =
    1; // 정적 전역 변수, 배속 값을 유지시키기위해 정적 static 사용
// static int el_length; //전광판 길이

int main() {
  FILE *fp = fopen("line.txt", "r+");

  char len[100];
  int i, stop;
  // i,키보드 누를때

  do {
    fgets(len, sizeof(len), fp);
    // printf("%d", sizeof(len));

    if (strlen(len) < 2 || stop == TAB) // 문자입력 및 동적 할당
    {

      gotoxy(35, 2);
      printf("전광판에 쓰일 내용을 입력하세요.");
      gotoxy(35, 3);
      printf(">> ");
      gets(len);
      gotoxy(36, 3);
      // printf("전광판 길이는 ? ")
      // el_length = 16;

      for (i = 0; i < LONG; i++) {
        strcat(len, " ");
      }
      len_p = (char *)malloc(sizeof(char) * (strlen(len) + 1));
      strcpy(len_p, len);
      fclose(fp);
      fopen("line.txt", "w+");
      // fseek(fp, 0, SEEK_SET);
      fprintf(fp, "%s", len_p);
    } else {
      // fgets(len, sizeof(len), fp);
      len_p = (char *)malloc(sizeof(char) * (strlen(len) + 1));
      strcpy(len_p, len);
      // fprintf("%s", len_p);
    }
    system("cls"); // 화면 지우는 함수

    do {
      title_ptf(); // 목차 프린트

      for (i = 0; i < strlen(len_p); i++) {
        if (i < LONG)
          ptf(i, 0);
        else
          ptf(i, i - (LONG - 1));

        // 키보드를 눌렀을 경우
        if (kbhit()) {
          stop = getch();

          if (isdigit(stop) > 0)
            // stop에 할당된 문자가 숫자형인지 알파벳인지 판별, 문자관련함수.
            // 정수인지 문자인지 판별하는 함수가 아님
            _speed = stop - 48; // 아스키코드만큼 빼서 알맞은 값이 들어가게
                                // 한다. 안빼주면 아스키코드값이 들어가버려
          else if (stop == TAB)
            break;
          else if (stop == ESC)
            break;
        }
      }
      // 변수에 문자할당 비교를 할때 논리연산자를 함께 사용하면 식이 씹힌다.
      // 따로따로 하나씩 나눠줘야 되는데 이유불문.
      if (stop == TAB)
        break;
      if (stop == ESC)
        break;

    } while (1);

    free(len_p); // 동적할당 푼다.
    // if(stop == TAB)

  } while (stop != ESC);
  gotoxy(28, 14);

  fclose(fp);
  system("pause");
  return 0;
}
void gotoxy(int x, int y) {
  COORD Cur;
  Cur.X = x;
  Cur.Y = y;
  SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), Cur);
}
void ptf(int x, int y) {
  int i;
  int goto_x = FOOT + LONG + 1;

  for (i = x; i >= y; i--) {
    gotoxy(goto_x, 5);
    printf("%c\r", len_p[i]);
    goto_x--;
    if (goto_x == FOOT)
      goto_x = FOOT + LONG;
  }
  speed(_speed);
}
void speed(int x) {
  switch (x) {
  case 1:
    Sleep(700);
    break;
  case 2:
    Sleep(450);
    break;
  case 3:
    Sleep(200);
    break;
  default:
    break;
  }
}
void title_ptf() {
  int i;

  gotoxy(FOOT, 4); // 24+16
  puts("┏");
  for (i = 2; i < LONG + 2; i += 2) {
    gotoxy(FOOT + i, 4);
    puts("━"); // 16
  }
  gotoxy(FOOT + i, 4);
  puts("┓"); // 16

  gotoxy(FOOT, 5);
  puts("┃");
  gotoxy(FOOT + LONG + 2, 5);
  puts("┃");

  gotoxy(FOOT, 6);
  puts("┗"); // 16
  for (i = 2; i < LONG + 2; i += 2) {
    gotoxy(FOOT + i, 6);
    puts("━"); // 16
  }
  gotoxy(FOOT + i, 6);
  puts("┛"); // 16

  gotoxy(35, 8);
  puts("1 -> 1배속  2 -> 2배속  3 -> 3배속");
  gotoxy(40, 9);
  puts("Tab -> 수정  Esc -> 종료");
  gotoxy(35, 10);
  puts("==================================");
  gotoxy(28, 11);
  puts("글자속도를 변화시키고 싶으시다면 숫자키를 누르세요.");
}
