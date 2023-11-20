const $canvas = document.querySelector("canvas");

const ctx = $canvas.getContext("2d");

class Ball {
  constructor() {
    // this.ctx = ctx;
    this.position = { x: 1, y: 1 };
    this.size = { w: 10, h: 10 };
    this.v0 = 5;
    this.radian = 30;
    this.g = 10;
  }

  draw() {
    this.update();

    if (ctx) {
      ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "#0000";
      ctx.fill();
    }
  }

  update() {
    this.position.x =
      this.position.x * Math.tan(this.radian) -
      (2 * this.v0 ** 2 * Math.cos(this.radian) ** 2) /
        (this.g * this.position.x ** 2);
    this.position.y =
      this.position.y * Math.tan(this.radian) -
      (2 * this.v0 ** 2 * Math.cos(this.radian) ** 2) /
        (this.g * this.position.y ** 2);
    console.log(this.position);
  }
}

const ball = new Ball();

function animate() {
  ctx.clearRect(0, 0, 300, 300);

  ball.draw();

  requestAnimationFrame(animate);
}

function main() {
  animate();
}

main();
