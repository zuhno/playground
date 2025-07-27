import { useEffect, useRef } from "react";

const Box = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>();
  const lotsImg = useRef<HTMLImageElement>();

  let tick = 0;
  let x = 0;
  let stop = false;

  const animate = () => {
    requestAnimationFrame(animate);
    ctxRef.current!.clearRect(0, 0, 500, 500);
    ctxRef.current!.drawImage(lotsImg.current!, x, 0, 500, 500, 0, 0, 300, 300);
    if (!stop) {
      tick++;
      if (tick % 9 === 0) {
        x += 500;
        if (x >= 4000) {
          x = 0;
        }
      }
    } else {
      x = 0;
    }
  };

  const init = (ctx: CanvasRenderingContext2D) => {
    if (!ctx) return;
    const img = new Image();
    img.src = "/lots.png";
    img.onload = function () {
      lotsImg.current = img;
      animate();
    };
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctxRef.current = ctx;
      init(ctxRef.current!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};

export default Box;
