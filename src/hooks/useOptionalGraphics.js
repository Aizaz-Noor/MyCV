import { useEffect, useState } from 'react';

// Keep a warmed canvas mounted across tab visibility changes. Its own frame loop
// pauses while hidden/offscreen; only eligibility changes dispose the renderer.
export function useOptionalGraphics() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const desktop = matchMedia('(min-width: 1024px)');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    let idleId;
    let timeoutId;
    let inView = false;
    let loaded = false;
    const cancelPending = () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      clearTimeout(timeoutId);
      idleId = undefined;
      timeoutId = undefined;
    };
    const update = () => {
      cancelPending();
      const rect = hero?.getBoundingClientRect();
      if (rect) inView = rect.bottom > 0 && rect.top < innerHeight;
      const constrained = connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType);
      if (!desktop.matches || reducedMotion.matches || constrained || (navigator.deviceMemory && navigator.deviceMemory <= 2)) {
        loaded = false;
        setEnabled(false);
        return;
      }
      if (loaded || !inView || document.hidden || document.documentElement.classList.contains('is-booting') || document.documentElement.classList.contains('is-boot-leaving')) return;
      const load = () => {
        loaded = true;
        setEnabled(true);
      };
      if ('requestIdleCallback' in window) idleId = requestIdleCallback(load, { timeout: 2000 });
      else timeoutId = setTimeout(load, 200);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    const hero = document.querySelector('#home .hero-art');
    const onReady = () => { timeoutId = setTimeout(update, 0); };
    if (hero) observer.observe(hero);
    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    connection?.addEventListener?.('change', update);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('portfolio:ready', onReady);
    update();
    return () => {
      cancelPending();
      observer.disconnect();
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
      connection?.removeEventListener?.('change', update);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('portfolio:ready', onReady);
    };
  }, []);
  return enabled;
}
