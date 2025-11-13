import Shape from "./shape.mjs";

class Circle extends Shape {
  constructor(ctx, frame, x, y, radius) {
    super(x, y, radius * 2, radius * 2);
    this.ctx = ctx;
    this.radius = radius;
    this.frame = frame;

    this.gravity = 0.1;
    this.vy = 0;

    this.state = "fall";
    this.angle = 0; // 현재 원 위에서의 각도
    this.angularVel = 0; // 각속도
    this.slideRadius = this.frame.radius - this.radius - 1;

    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  update() {
    if (this.state === "fall") {
      // 자유 낙하
      this.vy += this.gravity;
      this.y += this.vy;

      // 큰 원과 충돌하면 slide 상태로 전환
      if (this.isCollision() && this.y >= this.frame.y) {
        this.state = "slide";

        // 현재 위치를 각도로 변환
        const dx = this.x - this.frame.x;
        const dy = this.y - this.frame.y;
        this.angle = Math.atan2(dy, dx); // 중심 기준 각도

        // 위치를 정확히 큰 원 안쪽 둘레에 붙이기
        this.x = this.frame.x + this.slideRadius * Math.cos(this.angle);
        this.y = this.frame.y + this.slideRadius * Math.sin(this.angle);

        // 낙하 속도를 각속도로 변환(대충 비례하도록)
        this.angularVel = this.vy / this.slideRadius;

        // 더 이상 y로 떨어지지 않으니 vy는 0으로
        this.vy = 0;
      }
    } else if (this.state === "slide") {
      // 각가속도: 중력의 접선 방향 성분 / 반지름
      const g = this.gravity;
      const acc = (g * Math.cos(this.angle)) / this.slideRadius;

      // 각속도 업데이트 (조금씩 감속 효과도 넣기)
      this.angularVel += acc;
      this.angularVel *= 0.99; // 마찰처럼 서서히 느려지게

      // 각도 업데이트
      this.angle += this.angularVel;

      // 각도에 맞게 원 안쪽 둘레 위에 위치시키기
      this.x = this.frame.x + this.slideRadius * Math.cos(this.angle);
      this.y = this.frame.y + this.slideRadius * Math.sin(this.angle);

      // 아래쪽(θ ≈ π/2)에 도착하고 속도가 거의 0이면 멈춤
      const bottomAngle = Math.PI / 2;
      if (
        Math.abs(this.angle - bottomAngle) < 0.01 &&
        Math.abs(this.angularVel) < 0.001
      ) {
        this.angle = bottomAngle;
        this.x = this.frame.x + this.slideRadius * Math.cos(bottomAngle);
        this.y = this.frame.y + this.slideRadius * Math.sin(bottomAngle);
        this.state = "rest";
      }
    }

    this.draw();
  }

  isCollision() {
    return (
      Math.pow(this.slideRadius, 2) <=
      Math.pow(Math.abs(this.x - this.frame.x), 2) +
        Math.pow(Math.abs(this.y - this.frame.y), 2)
    );
  }
}

export default Circle;
