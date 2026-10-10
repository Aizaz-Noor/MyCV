import { useEffect, useRef, useState } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiMenu,
  FiX,
  FiFileText,
  FiArrowUpRight,
} from "react-icons/fi";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { usePortfolioMotion } from "../hooks/usePortfolioMotion";
const LINKS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "techstack", label: "Toolkit" },
  { id: "certifications", label: "Credentials" },
  { id: "profiles", label: "Profiles" },
  { id: "contact", label: "Contact" },
];
const IDS = LINKS.map((link) => link.id);
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 20);
  const [hovered, setHovered] = useState(null);
  const trigger = useRef(null);
  const nav = useRef(null);
  const desktop = useRef(null);
  const mobile = useRef(null);
  const desktopPill = useRef(null);
  const mobilePill = useRef(null);
  const active = useScrollSpy(IDS);
  const { enabled } = usePortfolioMotion();

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20);
    const resize = () => {
      if (innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() =>
      mobile.current?.querySelector("a")?.focus(),
    );
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  // Adapted from the original navbar: one glass pill follows the hovered/active link.
  useEffect(() => {
    const update = () => {
      for (const [container, pill, id] of [
        [desktop.current, desktopPill.current, hovered || active],
        [mobile.current, mobilePill.current, active],
      ]) {
        const link = container?.querySelector(`[href="#${id}"]`);
        if (!link || !pill) continue;
        pill.style.width = `${link.offsetWidth}px`;
        pill.style.height = `${link.offsetHeight}px`;
        pill.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`;
        pill.style.opacity = "1";
      }
    };
    update();
    const observer = new ResizeObserver(update);
    [desktop.current, mobile.current].forEach((element) => {
      if (element) observer.observe(element);
    });
    let disposed = false;
    document.fonts?.ready.then(() => {
      if (!disposed) update();
    });
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [active, hovered, open]);

  const navigate = (id) => {
    setOpen(false);
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      section?.setAttribute("tabindex", "-1");
      section?.focus({ preventScroll: true });
    });
  };
  const links = () =>
    LINKS.map((link) => (
      <a
        key={link.id}
        href={`#${link.id}`}
        aria-current={active === link.id ? "location" : undefined}
        onClick={() => navigate(link.id)}
        onMouseEnter={() => setHovered(link.id)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(link.id)}
        onBlur={() => setHovered(null)}
      >
        {link.label}
      </a>
    ));
  return (
    <>
      <div
        className={`ios-nav-backdrop ${open ? "is-open" : ""}`}
        aria-hidden="true"
        onClick={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
      />
      <header className={`ios-header ${scrolled ? "is-scrolled" : ""}`}>
        <nav
          ref={nav}
          className="ios-nav"
          aria-label="Main navigation"
          data-ui-motion={enabled ? "running" : "paused"}
          onBlur={(event) => {
            if (
              event.relatedTarget &&
              !event.currentTarget.contains(event.relatedTarget)
            )
              setOpen(false);
          }}
        >
          <a
            className="ios-nav-brand"
            href="#home"
            aria-label="Aizaz Noor home"
            onClick={() => navigate("home")}
          >
            <img src="/logo.png" width="140" height="25" alt="" />
          </a>
          <div className="ios-desktop-links" ref={desktop}>
            <span
              className="ios-selection-pill"
              ref={desktopPill}
              aria-hidden="true"
            />
            {links()}
          </div>
          <div className="ios-nav-actions">
            <a
              href="https://github.com/Aizaz-Noor"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <FiGithub aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/aizaz-noor"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <FiLinkedin aria-hidden="true" />
            </a>
            <a
              className="ios-nav-resume"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Open résumé PDF"
            >
              <FiFileText aria-hidden="true" />
            </a>
            <button
              ref={trigger}
              className="ios-menu-toggle"
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="navigation-links"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <FiX aria-hidden="true" />
              ) : (
                <FiMenu aria-hidden="true" />
              )}
            </button>
          </div>
          <div
            className={`ios-mobile-menu ${open ? "is-open" : ""}`}
            id="navigation-links"
            inert={!open}
          >
            <p className="ios-menu-caption">Explore my portfolio</p>
            <div className="ios-mobile-links" ref={mobile}>
              <span
                className="ios-selection-pill"
                ref={mobilePill}
                aria-hidden="true"
              />
              {links()}
            </div>
            <a
              className="ios-menu-resume"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              View résumé <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
