import { useEffect, useRef } from "react";
export default function AmbientBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const update = () =>
      ref.current?.classList.toggle("document-hidden", document.hidden);
    document.addEventListener("visibilitychange", update);
    update();
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <div className="ambient-scene" ref={ref} aria-hidden="true">
      <div className="ambient-light ambient-light-one" />
      <div className="ambient-light ambient-light-two" />
      <div className="ambient-grid" />
      <div className="ambient-dots">
        {Array.from({ length: 16 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              animationDelay: `${i * -0.7}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
