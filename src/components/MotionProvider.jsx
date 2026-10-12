import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiPause, FiPlay } from "react-icons/fi";
import { PortfolioMotionContext } from "../context/PortfolioMotionContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
export default function MotionProvider({ children }) {
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
    const updateVisibility = () => {
      setHidden(document.hidden);
      // Safari can restore a page at a different scroll position from BFCache.
      shell.current?.querySelectorAll(".kinetic-art, .tech-ticker").forEach((element) => {
        const rect = element.getBoundingClientRect();
        element.classList.toggle("motion-offscreen", rect.bottom <= 0 || rect.top >= innerHeight);
      });
    };
    let restorationFrame;
    const restorePage = () => {
      updateVisibility();
      cancelAnimationFrame(restorationFrame);
      restorationFrame = requestAnimationFrame(() => {
        updateVisibility();
      });
    };
    const hidePage = () => setHidden(true);
    window.addEventListener("pagehide", hidePage);
    window.addEventListener("pageshow", restorePage);
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
      window.removeEventListener("pagehide", hidePage);
      window.removeEventListener("pageshow", restorePage);
      cancelAnimationFrame(restorationFrame);
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
      </div>
      {createPortal(
        <button
          type="button"
          className="motion-control"
          aria-pressed={paused || reducedMotion}
          aria-label={reducedMotion ? "Animations off: device reduced-motion setting" : undefined}
          title={reducedMotion ? "Your device requests reduced motion. Change this in your device accessibility settings." : undefined}
          disabled={reducedMotion}
          onClick={() => setPaused((value) => !value)}
        >
          {paused && !reducedMotion ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
          {reducedMotion ? "Reduced motion" : paused ? "Resume animations" : "Pause animations"}
        </button>,
        document.body,
      )}
    </PortfolioMotionContext.Provider>
  );
}
