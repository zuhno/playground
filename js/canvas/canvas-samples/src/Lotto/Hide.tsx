import { useEffect, useRef } from "react";

interface IPointer {
  x: number;
  y: number;
  c: CanvasRenderingContext2D;
  clear: boolean;
  init: () => void;
  draw: () => void;
  update: () => void;
}

let pointer: IPointer;

// Component
const Hide = ({ onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>();
  const mouse = {
    x: -10,
    y: -10,
  };

  const checkPoint: { [xy: string]: boolean } = {};

  let isPress = false;
  let isClear = false;
  let checkAreaCount: number;
  let clearAreaCount = 0;

  function Pointer(
    this: IPointer,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
    this.x = x;
    this.y = y;
    this.c = ctx;

    this.draw = function (this: IPointer) {
      this.update();
      if (isPress) {
        if (!isClear) {
          let colorR = 0;
          const clearColor = this.c.getImageData(
            this.x - 5,
            this.y - 5,
            10,
            10
          ).data;
          for (let i = 0; i < clearColor.length; i += 4) {
            if (i % 4 === 0) {
              colorR += clearColor[i];
            }
          }
          this.c.clearRect(this.x - 5, this.y - 5, 10, 10);
          if (
            this.x >= 0 + ctx.canvas.width / 7 &&
            this.x <= ctx.canvas.width - ctx.canvas.width / 7 &&
            this.y >= 0 + ctx.canvas.height / 7 &&
            this.y <= ctx.canvas.height - ctx.canvas.height / 7
          ) {
            if (checkPoint[`${this.x}${this.y}`] === false && colorR !== 0) {
              checkPoint[`${this.x}${this.y}`] = true;
              clearAreaCount += 20;
            }
          }
        }
      }
    };

    this.update = function (this: IPointer) {
      this.x = mouse.x;
      this.y = mouse.y;
    };
  }

  const animate = () => {
    requestAnimationFrame(animate);
    if (!ctxRef.current) return;
    pointer.draw();
  };

  const init = (ctx: CanvasRenderingContext2D) => {
    if (!ctx) return;
    pointer = new Pointer(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2);
    var grd = ctx.createLinearGradient(150, 150, 140, 10);
    grd.addColorStop(0, "#9e9e9e");
    grd.addColorStop(1, "#e2e2e2");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "25px monospace";
    ctx.strokeStyle = "#353535";
    ctx.strokeText("HIDDEN", ctx.canvas.width / 4, ctx.canvas.height / 2);
    ctx.strokeText(
      "COSTUME",
      ctx.canvas.width / 4,
      ctx.canvas.height / 2 + ctx.canvas.height / 9.5
    );
    ctx.strokeText(
      "1%",
      ctx.canvas.width / 4 + ctx.canvas.width / 4,
      ctx.canvas.height / 2 + ctx.canvas.height / 5
    );
    // check area calculate
    const checkArea = ctx.getImageData(
      0 + ctx.canvas.width / 7,
      0 + ctx.canvas.height / 7,
      ctx.canvas.width - ctx.canvas.width / 7,
      ctx.canvas.height - ctx.canvas.height / 7
    ).data;
    checkAreaCount = checkArea.length / 10;
    for (let i = 0; i < checkArea.length; i += 4) {
      if (checkArea[i] === 0) continue;
      const x = (i / 4) % ctx.canvas.width;
      const y = Math.floor(Math.floor(i / ctx.canvas.width / 4));
      checkPoint[`${x}${y}`] = false;
    }
    animate();
  };

  const handleCoinMove = (e: MouseEvent | TouchEvent) => {
    if (e instanceof MouseEvent) {
      mouse.x = Math.floor(e.offsetX);
      mouse.y = Math.floor(e.offsetY);
    } else if (e instanceof TouchEvent) {
      const touch = (e as any).touches[0];
      const canvasRoot = touch.target.offsetParent.offsetParent;
      mouse.x =
        Math.floor(touch.clientX) - Math.floor(canvasRoot.offsetLeft) - 5;
      mouse.y =
        Math.floor(touch.clientY) - Math.floor(canvasRoot.offsetTop) - 5;
      if (
        mouse.x > touch.target.clientX ||
        mouse.x < 0 ||
        mouse.y > touch.target.clientY ||
        mouse.y < 0
      ) {
        isPress = false;
      } else {
        isPress = true;
      }
    }
    console.log(clearAreaCount);
    if (isPress && !isClear && clearAreaCount / checkAreaCount > 0.5) {
      onClear(true);
      isClear = true;
    }
  };

  const handleCoinPress = () => {
    isPress = true;
  };

  const handleCoinDismiss = () => {
    isPress = false;
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth as number;
      canvas.height = canvas.parentElement?.clientHeight as number;
      ctxRef.current = ctx;
      init(ctxRef.current!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleCoinMove);
    canvas.addEventListener("mousedown", handleCoinPress);
    canvas.addEventListener("mouseup", handleCoinDismiss);
    canvas.addEventListener("touchstart", handleCoinPress);
    canvas.addEventListener("touchmove", handleCoinMove);
    canvas.addEventListener("touchend", handleCoinDismiss);
    return () => {
      canvas.removeEventListener("mousemove", handleCoinMove);
      canvas.addEventListener("mousedown", handleCoinPress);
      canvas.addEventListener("mouseup", handleCoinDismiss);
      canvas.removeEventListener("touchstart", handleCoinPress);
      canvas.removeEventListener("touchmove", handleCoinMove);
      canvas.removeEventListener("touchend", handleCoinDismiss);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  return <canvas className="hide" ref={canvasRef} />;
};

export default Hide;
