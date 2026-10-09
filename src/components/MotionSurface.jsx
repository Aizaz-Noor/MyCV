import { useEffect, useRef } from "react";
import { usePortfolioMotion } from "../hooks/usePortfolioMotion";
export default function MotionSurface({ children, className = "" }) {
  const ref = useRef(null);
  const { enabled } = usePortfolioMotion();
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    let frame;
    let rect;
    const enter = () => {
      rect = element.getBoundingClientRect();
    };
    const move = (event) => {
      if (!rect) enter();
      cancelAnimationFrame(frame);
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      frame = requestAnimationFrame(() => {
        element.style.transform = `perspective(1000px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-3px)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      element.style.transform = "";
      rect = null;
    };
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => {
      leave();
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);
  return (
    <div ref={ref} className={`motion-surface ${className}`}>
      {children}
    </div>
  );
}
