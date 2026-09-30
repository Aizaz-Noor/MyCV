import { useEffect, useState } from 'react';

// Decorative WebGL is loaded only when a visible desktop browser has idle time.
export function useOptionalGraphics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let idleId;
    let timeoutId;

    const cancelPending = () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      idleId = undefined;
      timeoutId = undefined;
    };

    const update = () => {
      cancelPending();
      if (!desktop.matches || reducedMotion.matches || document.hidden) {
        setEnabled(false);
        return;
      }
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setEnabled(true), { timeout: 2000 });
      } else {
        timeoutId = window.setTimeout(() => setEnabled(true), 200);
      }
    };

    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      cancelPending();
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return enabled;
}
