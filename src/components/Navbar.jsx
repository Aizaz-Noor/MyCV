import { useEffect, useRef, useState } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";
const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
const IDS = ["home", ...LINKS.map((link) => link.id)];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const active = useScrollSpy(IDS);
  useEffect(() => {
    if (!open) return;
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <nav className="studio-nav" aria-label="Main navigation">
        <a
          className="studio-brand"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="Aizaz Noor home"
        >
          <span className="brand-symbol">
            a<span>n</span>.
          </span>
          <span className="brand-caption">
            Aizaz Noor
            <br />
            <small>Developer / Lahore</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          ref={trigger}
          type="button"
          aria-expanded={open}
          aria-controls="navigation-links"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <div
          className={`studio-nav-links ${open ? "is-open" : ""}`}
          id="navigation-links"
        >
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-resume"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
