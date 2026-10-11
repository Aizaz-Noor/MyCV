import { useLocale } from "../hooks/useLocale";
import { useEffect, useRef, useState } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import { PortfolioMotionContext } from "../context/PortfolioMotionContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
export default function MotionProvider({ children }) {
  const { t } = useLocale();
  const reducedMotion = useReducedMotion();
  const shell = useRef(null);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem("portfolio-motion-paused") === "true";
    } catch {
      return false;
    }
  });
  const enabled = !paused && !reducedMotion && !hidden;
  useEffect(() => {
    try {
      localStorage.setItem("portfolio-motion-paused", String(paused));
    } catch {
      /* Storage is optional. */
    }
  }, [paused]);
  useEffect(() => {
    const updateVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries)
        entry.target.classList.toggle(
          "motion-offscreen",
          !entry.isIntersecting,
        );
    });
    shell.current
      .querySelectorAll(".kinetic-art, .tech-ticker")
      .forEach((element) => observer.observe(element));
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);
  return (
    <PortfolioMotionContext.Provider value={{ enabled, reducedMotion }}>
      <div
        ref={shell}
        className="portfolio-shell"
        data-motion={enabled ? "running" : "paused"}
      >
        {children}
        {!reducedMotion && (
          <button
            type="button"
            className="motion-control"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? (
              <FiPlay aria-hidden="true" />
            ) : (
              <FiPause aria-hidden="true" />
            )}
            {t(paused ? "Resume animations" : "Pause animations")}
          </button>
        )}
      </div>
    </PortfolioMotionContext.Provider>
  );
}
