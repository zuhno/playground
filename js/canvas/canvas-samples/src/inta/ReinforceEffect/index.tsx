/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useRef } from "react";
import Card from "./Card";

interface IReinforceEffectProps {
  width: number;
  height: number;
}

const ReinforceEffect = ({ width, height }: IReinforceEffectProps) => {
  const $canvas = useRef<HTMLCanvasElement | null>(null);
  const $ctx = useRef<CanvasRenderingContext2D | null>(null);

  const card = useMemo(() => new Card(), []);

  const animate = () => {
    requestAnimationFrame(animate);

    $ctx.current!.clearRect(0, 0, width, height);
    $ctx.current!.fillStyle = "black";
    $ctx.current!.fillRect(0, 0, width, height);
    card.draw();
  };

  useEffect(() => {
    if (!$canvas.current) return;

    $canvas.current.width = width;
    $canvas.current.height = height;

    $ctx.current = $canvas.current.getContext("2d");

    card.init(
      "https://nypost.com/wp-content/uploads/sites/2/2020/12/yael-most-beautiful-video.jpg?quality=90&strip=all",
      10,
      10,
      100,
      100,
      $ctx.current!
    );

    animate();

    card.setStart();

    setTimeout(() => {
      card.setFinish(true);
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [$canvas, card, width, height]);

  return <canvas ref={$canvas} />;
};

export default ReinforceEffect;
