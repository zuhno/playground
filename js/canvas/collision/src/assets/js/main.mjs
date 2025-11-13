import Circle from "./circle.mjs";
import Frame from "./frame.mjs";

let $canvas;
let ctx;
let frame;
const circles = [];

function clearUnit(val) {
  return +val.split("px")[0];
}

function randomPointInCircle(cx, cy, radius, targetRadius) {
  const t = 2 * Math.PI * Math.random();
  const r = (radius - targetRadius) * Math.sqrt(Math.random());
  const x = cx + r * Math.cos(t);
  const y = cy + r * Math.sin(t);
  return [x, y];
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  frame.update();
  circles.forEach((circle) => {
    circle.update();
  });
}

function resizeCanvas() {
  const { width, height } = window.getComputedStyle(document.body);

  $canvas.style.width = width;
  $canvas.style.height = height;
  $canvas.width = clearUnit(width);
  $canvas.height = clearUnit(height);

  frame?.resize($canvas.width / 2, $canvas.height / 2);
  circles?.forEach((circle) => {
    const radius = 10;
    const [x, y] = randomPointInCircle(frame.x, frame.y, frame.radius, radius);
    circle.resize(x, y);
  });
}

function main() {
  $canvas = document.createElement("canvas");
  document.body.prepend($canvas);

  resizeCanvas();

  ctx = $canvas.getContext("2d");

  frame = new Frame(
    ctx,
    ctx.canvas.clientWidth / 2,
    ctx.canvas.clientHeight / 2,
    150,
  );

  for (let i = 0; i < 50; i++) {
    const radius = 10;
    const [x, y] = randomPointInCircle(frame.x, frame.y, frame.radius, radius);
    circles[i] = new Circle(ctx, frame, x, y, radius);
  }

  window.addEventListener("resize", resizeCanvas);

  animate();
}

main();
