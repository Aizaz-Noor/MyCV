import { useEffect, useRef } from "react";
import { usePortfolioMotion } from "../hooks/usePortfolioMotion";

// Only the decorative layer follows the pointer; the accessible photo stays still.
export default function PortraitReveal() {
  const photo = useRef(null);
  const color = useRef(null);
  const { enabled } = usePortfolioMotion();
  useEffect(() => {
    const element = photo.current;
    const layer = color.current;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    let frame;
    const reset = () => {
      cancelAnimationFrame(frame);
      delete element.dataset.revealing;
    };
    const sync = () => {
      reset();
      element.dataset.interactive = String(enabled && pointer.matches);
    };
    const move = (event) => {
      if (!enabled || !pointer.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        layer.style.setProperty("--reveal-x", `${event.clientX - rect.left}px`);
        layer.style.setProperty("--reveal-y", `${event.clientY - rect.top}px`);
        element.dataset.revealing = "true";
      });
    };
    sync();
    pointer.addEventListener("change", sync);
    element.addEventListener("pointerenter", move);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    window.addEventListener("blur", reset);
    return () => {
      reset();
      delete element.dataset.interactive;
      pointer.removeEventListener("change", sync);
      element.removeEventListener("pointerenter", move);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", reset);
    };
  }, [enabled]);
  return (
    <div ref={photo} className="portrait-photo">
      <img
        className="portrait-base"
        src="/about-photo-color-portrait.jpeg"
        alt="Portrait of Aizaz Noor"
        width="800"
        height="1326"
        loading="lazy"
      />
      <img
        ref={color}
        className="portrait-color"
        src="/about-photo-color-portrait.jpeg"
        alt=""
        aria-hidden="true"
        width="800"
        height="1326"
        loading="lazy"
        draggable="false"
      />
    </div>
  );
}
