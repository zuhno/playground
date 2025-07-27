// 프로토타입 패턴 (생성)

// 추상클래스
abstract class Shape {
  public x: number;
  public y: number;
  public color: string;

  constructor(source?: Shape) {
    this.x = source?.x || 0;
    this.y = source?.y || 0;
    this.color = source?.color || "";
  }

  abstract clone(): Shape;
}

// 구상클래스
class Rectengle extends Shape {
  public width: number;
  public height: number;

  constructor(source?: Rectengle) {
    super(source);

    this.width = source?.width || 0;
    this.height = source?.height || 0;
  }

  public clone() {
    return new Rectengle(this);
  }
}

class Circle extends Shape {
  public radius: number;

  constructor(source?: Circle) {
    super(source);
    this.radius = source?.radius || 0;
  }

  public clone(): Circle {
    return new Circle(this);
  }
}

// usage
class Application {
  public shapes: Shape[] = [];

  constructor() {
    const circle = new Circle();
    circle.x = 10;
    circle.y = 10;
    circle.radius = 20;
    this.shapes.push(circle);

    const anotherCircle = circle.clone();
    this.shapes.push(anotherCircle);

    const rectangle = new Rectengle();
    rectangle.width = 30;
    rectangle.height = 40;

    this.shapes.push(rectangle);
  }

  businessLogin() {
    for (const shape of this.shapes) {
      console.log(shape);
    }
    // do something
  }
}

const application = new Application();
application.businessLogin();
