import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Reveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible || reducedMotion ? 1 : 0,
        transform: isVisible || reducedMotion
          ? 'translateY(0) scale(1)'
          : 'translateY(28px) scale(0.97)',
        transition: `opacity 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     transform 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        height: '100%',
        ...style
      }}
    >
      {children}
    </div>
  );
}
