import { useRef } from 'react';

/**
 * MagneticButton — cursor-tracking pull effect.
 * Uses ref + direct DOM style writes (no useState) to avoid React re-renders on every mousemove.
 */
export default function MagneticButton({ children, className, href, onClick, ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { width, height, left, top } = el.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.25;
    const y = (e.clientY - (top + height / 2)) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.1, 0.7, 0.1, 1)';
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={ref}
      href={href}
      type={!href ? props.type || 'button' : undefined}
      onClick={onClick}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-flex', transform: 'translate(0px,0px)' }}
      {...props}
    >
      {children}
    </Tag>
  );
}
