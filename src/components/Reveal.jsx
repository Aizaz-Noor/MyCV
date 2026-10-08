import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
export default function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (reduce || !element.animate || !("IntersectionObserver" in window))
      return;
    let animation;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = element.animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 500,
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
  }, [reduce, delay]);
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
