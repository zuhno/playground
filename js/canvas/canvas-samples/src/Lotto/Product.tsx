import { useEffect, useRef } from "react";

const Product = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>();

  const init = (ctx: CanvasRenderingContext2D) => {
    if (!ctx) return;
    ctx.font = "100px serif";
    ctx.fillStyle = "#753333";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const img = new Image();
    img.src = "/cube.png";
    img.onload = function () {
      ctx?.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        ctx.canvas.width / 7,
        ctx.canvas.height / 7,
        ctx.canvas.width - ctx.canvas.width / 3.5,
        ctx.canvas.height - ctx.canvas.height / 3.5
      );
    };
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth as number;
      canvas.height = canvas.parentElement?.clientHeight as number;
      ctxRef.current = ctx;
      init(ctxRef.current!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  return <canvas className="product" ref={canvasRef} />;
};

export default Product;
