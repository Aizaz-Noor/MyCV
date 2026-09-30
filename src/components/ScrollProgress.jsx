import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const observer = new ResizeObserver(() => {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    });
    observer.observe(document.body);

    let ticking = false;
    let frameId;
    const onScroll = () => {
      if (!ticking) {
        frameId = window.requestAnimationFrame(() => {
          if (barRef.current) {
            const prog = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
            barRef.current.style.width = `${prog}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial call
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      aria-hidden="true"
      style={{ width: '0%' }}
    />
  );
}
