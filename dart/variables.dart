void main() {
  // var, do type inference. String, int, double, bool, List, Set etc..
  // non initialize, type inference to 'dynamic'
  var variable = "This is variable";
  // also use it like below:
  String strVar = "This is explicit variable";

  // dynamic variable like 'any' type in typescript
  dynamic dynamicVar = true;
  dynamicVar = 3;
  dynamicVar = 'something';

  // nullable variable
  String nonNullable = "laala";
  // nonNullable = null; // x
  String? nullable = "lalala";
  nullable = null; // o
  nullable?.isNotEmpty; // optional chaining

  // final variable: only once asignment (like 'const' in js, ts)
  var nonFinalVar = false;
  nonFinalVar = true; // o
  final finalVar = false;
  // finalVar = true; // x

  // late variable: used when delaying initialization
  // value assignment can be postponed without using the 'late' keyword, but its true value is revealed when using class syntax
  late double lateVar;
  lateVar = 0.4;

  // const variable: variable whose value must be known at compile time**
  const CONSTANT_VARIABLE = 123;
  const API_KEY = "whatever";
}
