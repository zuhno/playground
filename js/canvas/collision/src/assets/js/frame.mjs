import Shape from "./shape.mjs";

class Frame extends Shape {
  constructor(ctx, x, y, radius) {
    super(x, y, radius * 2, radius * 2);
    this.ctx = ctx;
    this.radius = radius;
    this.fluctuation = 1;
    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  update() {
    this.draw();
  }
}

export default Frame;
