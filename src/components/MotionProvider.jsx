import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiPause, FiPlay } from "react-icons/fi";
import { PortfolioMotionContext } from "../context/PortfolioMotionContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
export default function MotionProvider({ children }) {
  const reducedMotion = useReducedMotion();
  const [showMotionHelp, setShowMotionHelp] = useState(false);
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
        <>
        {reducedMotion && showMotionHelp && (
          <div id="motion-help" className="motion-help" role="status">
            <strong>Your device has reduced motion enabled.</strong>
            <p>To enable animations on iPhone, open Settings &gt; Accessibility &gt; Motion and turn off Reduce Motion. Then return here.</p>
            <p>On other devices, change the reduced-motion setting in accessibility preferences.</p>
          </div>
        )}
        <button
          type="button"
          className="motion-control"
          aria-pressed={paused || reducedMotion}
          aria-label={reducedMotion ? "Animations off: device reduced-motion setting" : undefined}
          title={reducedMotion ? "Your device requests reduced motion. Change this in your device accessibility settings." : undefined}
          aria-expanded={reducedMotion ? showMotionHelp : undefined}
          aria-controls={reducedMotion ? "motion-help" : undefined}
          onClick={() => reducedMotion ? setShowMotionHelp(value => !value) : setPaused(value => !value)}
        >
          {paused && !reducedMotion ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
          {reducedMotion ? "Reduced motion" : paused ? "Resume animations" : "Pause animations"}
        </button>
        </>,
        document.body,
      )}
    </PortfolioMotionContext.Provider>
  );
}
