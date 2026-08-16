import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef     = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor on fine pointer (desktop mouse/trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot     = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    // Target mouse position
    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;

    // Trailing ring position
    let ringX = mouseX;
    let ringY = mouseY;

    // Velocity tracking for organic stretch
    let prevRingX = ringX;
    let prevRingY = ringY;
    let currentScaleX = 1;
    let currentScaleY = 1;

    let raf;

    // Direct mouse tracking for inner dot (instant zero delay)
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX.toFixed(1)}px, ${mouseY.toFixed(1)}px, 0)`;
    };

    // Buttery-smooth hardware-accelerated animation loop
    const animate = () => {
      // 1. Fluid position lerp (0.22 factor for ultra-responsive follow)
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      // 2. Velocity calculation
      const vx = ringX - prevRingX;
      const vy = ringY - prevRingY;
      const speed = Math.hypot(vx, vy);

      prevRingX = ringX;
      prevRingY = ringY;

      // 3. Organic speed stretch (max 1.2x)
      const targetScaleX = 1 + Math.min(speed * 0.008, 0.2);
      const targetScaleY = 1 / targetScaleX;

      currentScaleX += (targetScaleX - currentScaleX) * 0.2;
      currentScaleY += (targetScaleY - currentScaleY) * 0.2;

      // 4. Apply clean transform (position + velocity stretch)
      outline.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) scale(${currentScaleX.toFixed(3)}, ${currentScaleY.toFixed(3)})`;

      raf = requestAnimationFrame(animate);
    };

    // Event delegation for hover targets
    const interactiveSelector =
      'a, button, [role="button"], .tech-card-container, .cert-item, .project-card, input, textarea, select, label';

    const onMouseOver = (e) => {
      if (e.target.closest(interactiveSelector)) {
        dot.classList.add('cursor-hover');
        outline.classList.add('cursor-hover');
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        dot.classList.remove('cursor-hover');
        outline.classList.remove('cursor-hover');
      }
    };

    // Smooth opacity fade when mouse leaves or enters window
    const onMouseLeave = () => {
      dot.style.opacity     = '0';
      outline.style.opacity = '0';
    };

    const onMouseEnter = () => {
      dot.style.opacity     = '1';
      outline.style.opacity = '1';
    };

    document.addEventListener('mousemove',  onMouseMove, { passive: true });
    document.addEventListener('mouseover',  onMouseOver, { passive: true });
    document.addEventListener('mouseout',   onMouseOut,  { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mouseover',  onMouseOver);
      document.removeEventListener('mouseout',   onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}     className="cursor-dot"     aria-hidden="true" />
      <div ref={outlineRef} className="cursor-outline" aria-hidden="true" />
    </>
  );
}
