#include <iostream>

int id = 0;

class Marine {
    int unit_id;
    int hp;
    int coord_x, coord_y;
    int damage;
    bool is_dead;
    char *name;

  public:
    Marine();
    Marine(int x, int y);
    Marine(int x, int y, const char *marin_name);
    Marine(const Marine &marine);
    ~Marine();

    int attack();
    void be_attacked(int damage_earn);
    void move(int x, int y);
    void setName(const char *new_name);
    void show_status();
};

Marine::Marine() {
  std::cout << " Invoke Default Constructor " << std::endl;

  unit_id = ++id;
  hp = 50;
  coord_x = coord_y = 0;
  damage = 5;
  is_dead = false;
  name = NULL;
}
Marine::Marine(int x, int y) {
  std::cout << " Invoke Overloading Constructor " << std::endl;

  unit_id = ++id;
  coord_x = x;
  coord_y = y;
  hp = 50;
  damage = 5;
  is_dead = false;
  name = NULL;
}
Marine::Marine(int x, int y, const char *marin_name) {
  std::cout << " Invoke Overloading Constructor with Name " << std::endl;

  unit_id = ++id;
  coord_x = x;
  coord_y = y;
  hp = 50;
  damage = 5;
  is_dead = false;

  name = new char[strlen(marin_name) + 1];
  strcpy(name, marin_name);
}
Marine::Marine(const Marine &marine) {
  std::cout << " Invoke Copy Constructor " << std::endl;

  unit_id = marine.unit_id;
  coord_x = marine.coord_x;
  coord_y = marine.coord_y;
  hp = marine.hp;
  damage = marine.damage;
  is_dead = marine.is_dead;

  // 이렇게 하는 이유는 name = marine.name 으로 할당하면 char 포인터로 선언된 name이 같은 주소값을 물게되는데
  // 소멸자를 통해서 동적할당된 메모리를 소멸시킬때 이미 해제된 메모리에 접근한다는 경고문구가 나오기 때문이다.
  // 복사 생성자는 만들지않아도 default copy constructor 가 존재하는데 위와같은 한계가 있어 명시적으로
  // 생성해주는게 한계없이 사용할 수 있다.
  name = new char(strlen(marine.name) + 1);
  strcpy(name, marine.name);
}
Marine::~Marine() {
  std::cout << " Invoke Destructor " << std::endl;
  if (name != NULL) {
    delete[] name;
  }
}
void Marine::move(int x, int y) {
  coord_x += x;
  coord_y += y;

  return;
}
void Marine::show_status() {
  std::cout << " *** Marine : " << name << " " << &name << " *** " << std::endl;
  std::cout << " Unit Id : " << unit_id << std::endl;
  std::cout << " Location : ( " << coord_x << " , " << coord_y << " ) "
            << std::endl;
  std::cout << " HP : " << hp << std::endl;
  std::cout << " Dead : " << is_dead << std::endl
            << std::endl;
}
void Marine::be_attacked(int damage_earn) {
  hp -= damage_earn;
  if (hp <= 0) is_dead = true;
}
int Marine::attack() {
  return damage;
}
void Marine::setName(const char *new_name) {
  std::cout << " Update Name " << std::endl;
  name = new char[strlen(new_name) + 1];
  strcpy(name, new_name);
}

int main() {
  Marine *marines[100];
  marines[0] = new Marine(2, 3, "marine1");
  marines[1] = new Marine(3, 5, "marine2");
  Marine m = *marines[1];

  marines[0]->show_status();
  marines[1]->show_status();
  m.show_status();

  marines[1]->setName("marine_new");

  marines[0]->show_status();
  marines[1]->show_status();
  m.show_status();

  delete marines[0];
  delete marines[1];

  return 0;
}