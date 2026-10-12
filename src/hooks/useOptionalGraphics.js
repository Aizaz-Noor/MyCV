import { useEffect, useState } from "react";

function eligible() {
  const connection = navigator.connection;
  return matchMedia("(min-width: 1024px)").matches &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !connection?.saveData &&
    !["slow-2g", "2g"].includes(connection?.effectiveType) &&
    !(navigator.deviceMemory && navigator.deviceMemory <= 2);
}

// Start home artwork during the logo introduction. Deep links remain deferred;
// a warmed canvas survives tab/BFCache restoration instead of restarting.
export function useOptionalGraphics() {
  const [enabled, setEnabled] = useState(() => eligible() && !document.hidden &&
    (!location.hash || location.hash === "#home"));
  useEffect(() => {
    const desktop = matchMedia("(min-width: 1024px)");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const hero = document.querySelector("#home .hero-art");
    let loaded = eligible() && !document.hidden && (!location.hash || location.hash === "#home");
    const update = () => {
      if (!eligible()) {
        loaded = false;
        setEnabled(false);
        return;
      }
      if (loaded || document.hidden) return;
      const booting = document.documentElement.classList.contains("is-booting") ||
        document.documentElement.classList.contains("is-boot-leaving");
      if (booting && location.hash && location.hash !== "#home") return;
      const rect = hero?.getBoundingClientRect();
      if (rect && rect.bottom > 0 && rect.top < innerHeight) {
        loaded = true;
        setEnabled(true);
      }
    };
    // Let App restore a deep-link scroll position before checking visibility.
    const onReady = () => queueMicrotask(update);
    const observer = new IntersectionObserver(update);
    if (hero) observer.observe(hero);
    desktop.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("pageshow", update);
    window.addEventListener("portfolio:ready", onReady);
    if (!location.hash || location.hash === "#home") update();
    else queueMicrotask(update);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("pageshow", update);
      window.removeEventListener("portfolio:ready", onReady);
    };
  }, []);
  return enabled;
}
