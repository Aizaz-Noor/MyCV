import { useEffect, useRef } from "react";
import { usePortfolioMotion } from "../hooks/usePortfolioMotion";
export default function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const { enabled } = usePortfolioMotion();
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element.animate || !("IntersectionObserver" in window))
      return;
    let animation;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = element.animate(
          [
            { opacity: 0, transform: "translateY(36px) scale(.97)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          {
            duration: 750,
            delay: delay * 1000,
            easing: "cubic-bezier(0.23,1,0.32,1)",
          },
        );
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [enabled, delay]);
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
