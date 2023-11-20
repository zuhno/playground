import { useEffect, useRef } from "react";

const GachaEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef) return;
    const context = canvasRef.current?.getContext("2d");
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};

export default GachaEffect;
