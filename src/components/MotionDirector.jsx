import { useEffect } from "react";
import { usePortfolioMotion } from "../hooks/usePortfolioMotion";
export default function MotionDirector() {
  const { enabled } = usePortfolioMotion();
  useEffect(() => {
    if (!enabled) return;
    const elements = [...document.querySelectorAll(".section-heading h2")];
    let frame;
    const update = () => {
      frame = null;
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.top > innerHeight + 100 || rect.bottom < -100) continue;
        const progress = Math.max(
          -1,
          Math.min(1, (rect.top - innerHeight * 0.4) / innerHeight),
        );
        element.style.transform = `translateY(${progress * 24}px)`;
      }
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    scroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      elements.forEach((element) => {
        element.style.transform = "";
      });
    };
  }, [enabled]);
  return null;
}
