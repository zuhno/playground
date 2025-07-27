#include <stdio.h>

// interfaces
void AddBook(char (*)[30], char (*)[30], char (*)[30], int *, int *);
void SearchBook(char (*)[30], char (*)[30], char (*)[30], int *, int *);
void BorrowBook(char (*)[30], int *);
void ReturnBook(char (*)[30], int *);

// utilities
int compare(char *, char *);
int include(char *, char *);

// main
int main() {
  int user_choice;
  int num_total_book = 0;

  char book_author[100][30], book_publisher[100][30], book_subject[100][30];
  int borrowed[100];

  while (1) {
    printf("도서 관리 프로그램\n");
    printf("메뉴를 선택하세요.\n");
    printf("1. 책을 새로 추가하기\n");
    printf("2. 책을 검색하기\n");
    printf("3. 책을 빌리기\n");
    printf("4. 책을 반납하기\n");
    printf("5. 프로그램 종료\n");

    printf("선택할 번호 : ");
    scanf("%d", &user_choice);

    if (user_choice == 1) {
      AddBook(book_author, book_publisher, book_subject, borrowed, &num_total_book);
    } else if (user_choice == 2) {
      SearchBook(book_author, book_publisher, book_subject, borrowed, &num_total_book);
    } else if (user_choice == 3) {
      BorrowBook(book_subject, borrowed);
    } else if (user_choice == 4) {
      ReturnBook(book_subject, borrowed);
    } else if (user_choice == 5) {
      break;
    }
  }

  return 0;
}

// implementaions
void AddBook(char (*book_author)[30], char (*book_publisher)[30], char (*book_subject)[30], int *borrowed, int *num_total_book) {
  getchar();

  printf("추가할 책의 제목 : ");
  scanf("%[^\n]%*c", book_subject[*num_total_book]);

  printf("추가할 책의 저자 : ");
  scanf("%[^\n]%*c", book_author[*num_total_book]);

  printf("추가할 책의 출판사 : ");
  scanf("%[^\n]%*c", book_publisher[*num_total_book]);

  borrowed[*num_total_book] = 0;
  printf("추가 완료!\n");

  (*num_total_book)++;
}

void SearchBook(char (*book_author)[30], char (*book_publisher)[30], char (*book_subject)[30], int *borrowed, int *num_total_book) {
  int user_input;
  int i;
  char user_search[30];
  char(*compared_target)[30];

  printf("어느 것으로 검색 할 것인가요?\n");
  printf("1. 책의 제목으로 검색\n");
  printf("2. 책의 저자로 검색\n");
  printf("3. 책의 출판사로 검색\n");
  printf("선택 할 번호 : ");
  scanf("%d", &user_input);

  if (user_input == 1) {
    compared_target = book_subject;
  } else if (user_input == 2) {
    compared_target = book_author;
  } else if (user_input == 3) {
    compared_target = book_publisher;
  } else {
    return;
  }

  getchar();

  printf("검색 할 단어를 입력해주세요 : ");
  scanf("%[^\n]%*c", user_search);

  for (i = 0; i < *num_total_book; i++) {
    if (include(compared_target[i], user_search)) {
      printf("번호 : %d // 책 이름 : %s // 지은이 : %s // 출판사 : %s ", i, book_subject[i], book_author[i], book_publisher[i]);
      if (borrowed[i]) {
        printf("// 대출여부 : 대출됨\n");
      } else {
        printf("// 대출여부 : 대출안됨\n");
      }
    }
  }
}

void BorrowBook(char (*book_subject)[30], int *borrowed) {
  int user_input;

  printf("빌릴 책 번호를 입력해주세요 : ");
  scanf("%d", &user_input);
  getchar();

  if (borrowed[user_input]) {
    printf("이미 대여가 완료된 책입니다.\n");
  } else {
    borrowed[user_input] = 1;
    printf("책 '%s' 을 대여하였습니다.\n", book_subject[user_input]);
  }
}

void ReturnBook(char (*book_subject)[30], int *borrowed) {
  int user_input;

  printf("반납 할 책 번호를 입력해주세요 : ");
  scanf("%d", &user_input);
  getchar();

  if (borrowed[user_input]) {
    borrowed[user_input] = 0;
    printf("책 '%s' 을 반납하였습니다.\n", book_subject[user_input]);
  } else {
    printf("이미 반납이 완료된 책입니다.\n");
  }
}

// implemention - utilities
int compare(char *str1, char *str2) {
  while (*str1) {
    if (*str1 != *str2) {
      return 0;
    }

    str1++;
    str2++;
  }

  if (*str2 != '\0')
    return 0;

  return 1;
}

int include(char *str1, char *str2) {
  int i = 0;
  int j = 0;

  while (*(str1 + i)) {
    if (*(str1 + i + j) == *(str2 + j)) {
      while (1) {
        if (*(str2 + j) == '\0')
          return 1;
        if (*(str1 + i + j) == *(str2 + j)) {
          j++;
        } else
          break;
      }
    }

    j = 0;
    i++;
  }

  return 0;
}