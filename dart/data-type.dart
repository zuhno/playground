void main() {
  // Numbers
  int a = 10;
  double b = 10.2;

  // Strings
  String c = "string";

  // Booleans
  bool d = true;

  // Records
  (int, int, String) e = (1, 2, "");
  ({int a, int b, bool c}) f = (a: 3, b: 4, c: false); // named records

  // Lists
  var g = [1, 2, 3, 4];
  var h = const [1, 2, 3, 4]; // compile time constant, not modify

  // Sets
  var i = {'hong', 'gu', 'zuh', 'no'};
  var ii = <String>{};
  Set<String> iii = {};

  // Maps
  var j = {
    "first": "whatever",
    [1, 2, 3, 4]: "you want"
  };
  var jj = const {
    "first": "whatever",
    [1, 2, 3, 4]: "you want"
  };

  // operators, collection if, collection for etc..
}
