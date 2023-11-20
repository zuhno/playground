import { useEffect, useRef, useState } from "react";

const Box = ({ scale = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [img, setImg] = useState<HTMLImageElement>();
  const [actualSize, setActualSize] = useState({ w: 0, h: 0 });

  const Dot = function (x: number, y: number, r: number, g: number, b: number) {
    if (!ctx) return;
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;

    this.draw = function (c: CanvasRenderingContext2D) {
      c.beginPath();
      c.fillRect(this.x, this.y, 2, 2);
      c.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
      c.fill();
      ctx.globalAlpha = 0.5;
    };
  } as any as {
    new (x: number, y: number, r: number, g: number, b: number): never;
  };

  const animate = () => {
    if (!ctx) return;
    requestAnimationFrame(animate);
    ctx.clearRect(ctx.canvas.width, ctx.canvas.height, 0, 0);
  };
  // animate();

  const init = () => {
    if (!ctx || actualSize.w === 0 || actualSize.h === 0 || !img) return;
    const pixels: { [key: string]: number }[] = [];
    const dots = [];
    const imageData = ctx.getImageData(0, 0, actualSize.w, actualSize.h).data;
    for (let i = 0; i < imageData.length; i += 4) {
      if (imageData[i] === 0) continue;
      const x = (i / 4) % actualSize.w;
      const y = Math.floor(Math.floor(i / actualSize.w / 4));
      if (x % 2 === 0 && y % 2 === 0) {
        pixels.push({
          x,
          y,
          r: imageData[i],
          g: imageData[i + 1],
          b: imageData[i + 2],
        });
      }
    }
    if (pixels.length > 0) {
      pixels.forEach((pixel, idx) => {
        dots.push(new Dot(pixel.x, pixel.y, pixel.r, pixel.g, pixel.b));
      });
    }
  };

  useEffect(() => {
    if (!ctx || !img) return;
    init();
  }, [ctx, img]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = new Image();
    img.src = "/cube.png";
    const customCanvasSize = {
      w: img.naturalWidth / (1 / scale),
      h: img.naturalHeight / (1 / scale),
    };
    img.onload = function () {
      ctx?.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        0,
        0,
        customCanvasSize.w,
        customCanvasSize.h
      );
      setImg(img);
    };
    canvas.width = customCanvasSize.w;
    canvas.height = customCanvasSize.h;
    setCtx(ctx!);
    setActualSize(customCanvasSize);
  }, [canvasRef, scale]);

  return <canvas ref={canvasRef} />;
};

export default Box;
