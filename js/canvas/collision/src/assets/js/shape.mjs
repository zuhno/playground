class Shape {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {}
  update() {}
  resize(x, y, w, h) {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    this.w = w ?? this.w;
    this.h = h ?? this.h;
  }
}

export default Shape;
