#include <math.h>

#include <iostream>

class Point {
  public:
    int x, y;

    Point(int pos_x, int pos_y) {
      x = pos_x;
      y = pos_y;
    };
};

class Geometry {
  private:
    Point *point_array[100];
    int num_points;

    // Counter Clock Wise algorithm (CCW)
    // https://gaussian37.github.io/math-algorithm-line_intersection/
    int ccw(const Point &base_point1, const Point &base_point2, const Point &target_point1, const Point &target_point2) {
      int cross_product1 = (base_point2.x - base_point1.x) * (target_point1.y - base_point1.y) - (target_point1.x - base_point1.x) * (base_point2.y - base_point1.y);
      int cross_product2 = (base_point2.x - base_point1.x) * (target_point2.y - base_point1.y) - (target_point2.x - base_point1.x) * (base_point2.y - base_point1.y);

      int cross_product3 = (target_point2.x - target_point1.x) * (base_point1.y - target_point1.y) - (base_point1.x - target_point1.x) * (target_point2.y - target_point1.y);
      int cross_product4 = (target_point2.x - target_point1.x) * (base_point2.y - target_point1.y) - (base_point2.x - target_point1.x) * (target_point2.y - target_point1.y);

      if (((cross_product1 > 0 && cross_product2 < 0) || (cross_product1 < 0 && cross_product2 > 0)) &&
          ((cross_product3 > 0 && cross_product4 < 0) || (cross_product3 < 0 && cross_product4 > 0))) {
        return 1;
      }
      return 0;
    }

  public:
    Geometry() {
      num_points = 0;
    }

    ~Geometry() {
      CleanPoints();
    }

    void AddPoint(const Point &point);

    void PrintDistance();

    void PrintNumMeets();

    void CleanPoints();
};

void Geometry::AddPoint(const Point &point) {
  point_array[num_points++] = new Point(point.x, point.y);
};

void Geometry::PrintDistance() {
  if (num_points < 1) return;

  double distance = 0;

  for (int i = 0; i < num_points - 1; i++) {
    for (int j = i + 1; j < num_points; j++) {
      distance += sqrt(pow((point_array[j]->x - point_array[i]->x), 2) + pow((point_array[j]->y - point_array[i]->y), 2));
    }
  }

  std::cout << "distance : " << distance << std::endl;
};

void Geometry::PrintNumMeets() {
  if (num_points < 4) {
    std::cout << "You need at least four coordinates to find the intersection." << std::endl;

    return;
  }

  int meetCount = 0;
  for (int i = 0; i < num_points - 3; ++i) {
    for (int j = i + 1; j < num_points; ++j) {
      for (int k = j + 1; k < num_points; ++k) {
        for (int l = k + 1; l < num_points; ++l) {
          if (ccw(*point_array[i], *point_array[j], *point_array[k], *point_array[l]) ||
              ccw(*point_array[i], *point_array[k], *point_array[j], *point_array[l]) ||
              ccw(*point_array[i], *point_array[l], *point_array[k], *point_array[j]) ||
              ccw(*point_array[j], *point_array[i], *point_array[k], *point_array[l]) ||
              ccw(*point_array[j], *point_array[k], *point_array[i], *point_array[l]) ||
              ccw(*point_array[j], *point_array[l], *point_array[k], *point_array[i])) {
            meetCount++;
          };
        }
      }
    }
  }

  std::cout << "meetCount : " << meetCount << std::endl;
};

void Geometry::CleanPoints() {
  for (int i = 0; i < num_points; i++) {
    delete point_array[i];
  }
}

int main() {
  Geometry geometry;

  geometry.AddPoint(Point(1, 3));
  geometry.AddPoint(Point(4, 5));
  geometry.AddPoint(Point(6, 2));
  geometry.AddPoint(Point(2, 1));
  geometry.AddPoint(Point(7, 1));
  geometry.AddPoint(Point(1, 1));
  geometry.PrintDistance();
  geometry.PrintNumMeets();

  return 0;
}