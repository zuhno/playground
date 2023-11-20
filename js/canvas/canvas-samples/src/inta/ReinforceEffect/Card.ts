export default class Card {
  private _width: number = 0;
  private _height: number = 0;
  private _posX: number = 0;
  private _posY: number = 0;
  private _img: CanvasImageSource | null = null;
  private _bright: number = 0;
  private _brightIntensity: number = 0.3;
  private _difficulty: number = 0;
  private _isStop: boolean = true;
  private _brightToggle: boolean = false;
  private _shining: number = 5;
  private _shiningIntensity: number = 0.1;
  private _result: boolean = false;
  private _ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    this.draw = this.draw.bind(this);
    this.init = this.init.bind(this);
    this.setStart = this.setStart.bind(this);
    this.setFinish = this.setFinish.bind(this);

    this._update = this._update.bind(this);
    this._setBright = this._setBright.bind(this);
    this._setResult = this._setResult.bind(this);
  }

  private _setResult() {
    if (!this._ctx) return;
    this._ctx.shadowBlur = 20;
    this._ctx.shadowColor = "yellow";
  }

  private _setBright() {
    if (this._difficulty > 15) {
      this._bright = 30;
      return;
    }

    if (this._difficulty === 2) {
      this._brightIntensity = 0.5;
    } else if (this._difficulty === 4) {
      this._brightIntensity = 0.6;
    } else if (this._difficulty === 5) {
      this._brightIntensity = 0.8;
      this._shiningIntensity = 0.4;
    } else if (this._difficulty === 6) {
      this._brightIntensity = 1;
    } else if (this._difficulty === 7) {
      this._brightIntensity = 2;
      this._shiningIntensity = 0.6;
    }

    if (this._shining < 50) {
      this._shining += this._shiningIntensity;
    }

    if (!this._brightToggle) {
      this._bright += this._brightIntensity;
      if (this._bright > 30) {
        this._brightToggle = true;
        this._difficulty += 1;
      }
    } else {
      this._bright -= this._brightIntensity;
      if (this._bright < 1) {
        this._brightToggle = false;
      }
    }
  }

  setFinish(_result: boolean) {
    this._isStop = true;
    this._result = _result; // reinforce gacha result
  }

  setStart() {
    this._isStop = false;
  }

  private _update() {
    if (!this._ctx || !this._img) return;
    if (this._isStop) {
      this._brightIntensity = 0.3;
      this._bright = 1.5;
    } else {
      this._setBright();
    }

    this._ctx.shadowColor = "white";
    this._ctx.shadowBlur = this._shining;

    if (this._result) {
      this._setResult();
    }

    this._ctx.save();
    this._ctx.filter = `brightness(${this._bright})`;
    this._ctx.setTransform(1, 0, 0, 1, -this._width / 2, -this._height / 2);
    this._ctx.drawImage(
      this._img,
      0,
      0,
      Number(this._img.width),
      Number(this._img.height),
      this._ctx.canvas.width / 2,
      this._ctx.canvas.height / 2,
      this._width,
      this._height
    );
    this._ctx.restore();
  }

  draw() {
    if (!this._posX || !this._posY || !this._img || !this._ctx) return;
    this._update();
  }

  init(
    _imgSrc: string,
    _x: number,
    _y: number,
    _width: number,
    _height: number,
    _ctx: CanvasRenderingContext2D
  ) {
    const _img = new Image();
    _img.src = _imgSrc;
    this._width = _width;
    this._height = _height;
    this._posX = _x;
    this._posY = _y;
    this._img = _img;
    this._ctx = _ctx;
  }
}
