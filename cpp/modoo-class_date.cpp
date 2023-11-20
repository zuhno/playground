#include <iostream>

class Date {
  private:
    int _year;
    int _month;
    int _day;

    int days_in_month(int month, int year) const {
      const int days_in_month[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
      if (month == 2 && (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))) {
        return 29;  // 윤년인 경우 2월은 29일까지 있음
      }
      return days_in_month[month];
    }

  public:
    void set_date(int year, int month, int day) {
      _year = year;
      _month = month;
      _day = day;
    }

    void add_day(int inc) {
      int days_in_current_month = days_in_month(_month, _year);

      _day += inc;

      while (_day > days_in_current_month) {
        _day -= days_in_current_month;
        ++_month;

        if (_month > 12) {
          ++_year;
          _month = 1;
        }

        days_in_current_month = days_in_month(_month, _year);
      }
    }

    void add_month(int inc) {
      _month += inc;

      int year = _month / 12;
      _year += year;
      _month -= 12 * year;
    }

    void add_year(int inc) {
      _year += inc;
    }

    void show_date() const {
      std::cout << _year << " 년 " << _month << " 월 " << _day << " 일 " << std::endl;
    }
};

int main() {
  Date date;

  date.set_date(2011, 3, 1);
  date.show_date();

  date.add_day(30);
  date.show_date();

  date.add_day(2000);
  date.show_date();

  date.set_date(2012, 1, 31);  // 윤년
  date.add_day(29);
  date.show_date();

  date.set_date(2012, 8, 4);
  date.add_day(2500);
  date.show_date();

  return 0;
}
