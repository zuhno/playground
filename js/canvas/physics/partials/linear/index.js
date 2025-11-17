import Line from "./Line.js";
import Circle from "./Circle.js";

let canvas, ctx, circle, line;

const resize = () => {
  const { width, height } = getComputedStyle(document.body);

  canvas.width = parseInt(width);
  canvas.height = parseInt(height);
  canvas.style.width = width;
  canvas.style.height = height;

  line.resize();
  circle.resize();
};

const animate = () => {
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  line.update();
  circle.update();

  requestAnimationFrame(animate);
};

const main = () => {
  const { width, height } = getComputedStyle(document.body);

  canvas = document.querySelector("canvas");
  canvas.width = parseInt(width);
  canvas.height = parseInt(height);
  canvas.style.width = width;
  canvas.style.height = height;

  ctx = canvas.getContext("2d");

  const center = { x: canvas.width / 2, y: canvas.height / 2 };

  const point = { x: 0, y: center.y };

  line = new Line(ctx, point.x, point.y, canvas.width, center.y + 100, 2);
  circle = new Circle(ctx, point.x, point.y, 50, line);

  resize();
  window.addEventListener("resize", resize);

  animate();
};

main();
