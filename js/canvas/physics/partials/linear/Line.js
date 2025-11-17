class Line {
  constructor(ctx, x1, y1, x2, y2, lineWidth) {
    this.ctx = ctx;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineWidth = lineWidth;

    this.draw();
  }

  resize() {
    this.x2 = this.x1 + this.ctx.canvas.clientWidth;
  }

  draw() {
    let region = new Path2D();
    region.moveTo(this.x1, this.y1);
    region.lineTo(this.x2, this.y2);
    region.lineTo(this.x2, this.ctx.canvas.clientHeight);
    region.lineTo(this.x1, this.ctx.canvas.clientHeight);
    region.closePath();
    this.ctx.fillStyle = "#8888";
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.stroke(region);
    this.ctx.fill(region);
  }

  update() {
    this.draw();
  }

  getRandPos(min, max) {
    return Math.random() * (max - min) + min;
  }

  newLine() {
    this.x1 = this.x1;
    this.y1 = this.y2;
    this.x2 = this.x1 + this.ctx.canvas.clientWidth;
    this.y2 = this.y1 + this.getRandPos(-200, 200);
  }
}

export default Line;
