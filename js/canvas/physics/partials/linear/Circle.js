class Circle {
  constructor(ctx, x, y, r, track) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.track = track;
    this.distance = 0;
    this.direction = 1;
    this.speed = 2;
    this.rotate = 0;

    this.draw.apply(this);
  }

  resize() {
    this.angleVal = this.speed * this.direction;
    this.x = this.track.x1;
    this.y = this.track.y1;

    const dx = this.track.x2 - this.track.x1;
    const dy = this.track.y2 - this.track.y1;
    const angle = Math.atan2(dy, dx);
    this.x += Math.cos(angle) * this.angleVal;
    this.y += Math.sin(angle) * this.angleVal;
  }

  /**
   * canvas 기준 좌표계로 계산되는 거라 y축값이 현실과 반대지만, 모든 계산이 canvas 기준 좌표계로 계산되어 정상 처리됨
   * e.g.
   * 선분이 위쪽 방향일 때 (y 감소)
   * - 수학 기준: 각도 +90°
   * - canvas 기준: 각도 -90°
   * 둘은 반대이지만 canvas는 y가 아래로 증가하므로 -90°가 위쪽임 (canvas 입장에선 정상 값)
   * sin(-90°) = -1 (y축 감소 → 위로 이동)
   */
  draw() {
    const dx = this.track.x2 - this.track.x1;
    const dy = this.track.y2 - this.track.y1;
    let nx = dy;
    let ny = -dx;

    const len = Math.hypot(nx, ny);
    nx = nx / len;
    ny = ny / len;

    const cx = this.x + nx * this.r;
    const cy = this.y + ny * this.r;

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate((this.rotate * Math.PI) / 180);

    const region = new Path2D();
    region.arc(0, 0, this.r, 0, Math.PI * 2);
    region.closePath();

    const region2 = new Path2D();
    region2.arc(this.r / 2, this.r / 2, 5, 0, Math.PI * 2);
    region2.closePath();

    this.ctx.stroke(region);
    this.ctx.stroke(region2);
    this.ctx.restore();
  }

  update() {
    this.distance = this.speed * this.direction;

    const dx = this.track.x2 - this.track.x1;
    const dy = this.track.y2 - this.track.y1;
    const angle = Math.atan2(dy, dx);
    this.x += Math.cos(angle) * this.distance;
    this.y += Math.sin(angle) * this.distance;

    const deltaRad = this.distance / this.r;
    this.rotate += (deltaRad * 180) / Math.PI;

    if (this.rotate >= 360) {
      this.rotate = 0;
    }

    if (this.x >= this.track.x2) {
      this.track.newLine();
      this.x = this.track.x1;
      this.y = this.track.y1;
    }

    this.draw();
  }
}

export default Circle;
