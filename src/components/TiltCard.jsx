import React, { useRef } from 'react';

export default function TiltCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const ticking = useRef(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !innerRef.current) return;
    
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (!cardRef.current || !innerRef.current) {
          ticking.current = false;
          return;
        }
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const centerX = rect.left + width / 2;
        const centerY = rect.top + height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Max rotation is 10 degrees
        const rotateY = (mouseX / (width / 2)) * 10;
        const rotateX = -(mouseY / (height / 2)) * 10;

        innerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        innerRef.current.style.transition = 'transform 0.1s ease-out';
        
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (!innerRef.current) return;
    innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    innerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        ref={innerRef}
        className="tilt-card-inner"
        style={{
          width: '100%',
          height: '100%',
          transform: 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}
