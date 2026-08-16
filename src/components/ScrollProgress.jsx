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
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (barRef.current) {
            const prog = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
            barRef.current.style.width = `${prog}%`;
            barRef.current.setAttribute('aria-valuenow', Math.round(prog));
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
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: '0%' }}
    />
  );
}
