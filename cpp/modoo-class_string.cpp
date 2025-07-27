#include <iostream>

class String {
  private:
    char *str;
    int len;

  public:
    String(char c, int n);  // 문자 c 가 n 개 있는 문자열로 정의
    String(const char *c);
    String(const String &s);
    ~String();

    void add_string(const String &s);   // str 뒤에 s 를 붙인다.
    void copy_string(const String &s);  // str 에 s 를 복사한다.
    int strlen();                       // 문자열 길이 리턴
};

String::String(char c, int n) {
  len = n;
  str = new char[n + 1];

  for (int i = 0; i < len; i++) {
    str[i] = c;
  }

  std::cout << str << std::endl;
};
String::String(const char *c){};
String::String(const String &s){};
String::~String() {
  if (str != NULL) delete[] str;
}

void String::add_string(const String &s){};
void String::copy_string(const String &s){};
int String::strlen() {
  return 0;
};

int main(int argc, char *argv[]) {
  std::cout << "Hello World!" << std::endl;
  String str2('c', 3);

  return 0;
}
