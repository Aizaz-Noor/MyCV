import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

// Allowlist of valid section IDs — prevents hash-injection / open-redirect
const NAV_LINKS = [
  { label: 'Home',       idx: 0, id: 'home' },
  { label: 'About',      idx: 1, id: 'about' },
  { label: 'Experience', idx: 2, id: 'experience' },
  { label: 'Stack',      idx: 3, id: 'techstack' },
  { label: 'Work',       idx: 4, id: 'work' },
  { label: 'Certs',      idx: 5, id: 'certifications' },
  { label: 'Profiles',   idx: 6, id: 'profiles' },
  { label: 'Contact',    idx: 7, id: 'contact' },
];

const ALLOWED_IDS = new Set(NAV_LINKS.map(l => l.id));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const [hoveredSection, setHoveredSection] = useState(null);

  const sectionIds = useMemo(() => NAV_LINKS.map(link => link.id), []);
  const activeSection = useScrollSpy(sectionIds);

  const desktopLinkRefs = useRef({});
  const mobileLinkRefs = useRef({});
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(prev => prev !== isScrolled ? isScrolled : prev);
    };
    const handleResize = () => {
      if (window.innerWidth > 1023) setIsMobileMenuOpen(false);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu on outside click OR Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.navbar')) setIsMobileMenuOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Validated scroll-to — only accepts allowlisted section IDs
  const scrollTo = useCallback((id) => {
    if (!ALLOWED_IDS.has(id)) return; // reject unknown / injected IDs
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // Desktop sliding indicator
  useEffect(() => {
    const targetSection = hoveredSection || activeSection;
    const node = desktopLinkRefs.current[targetSection];
    if (node) {
      setIndicatorStyle({ left: node.offsetLeft, width: node.offsetWidth, opacity: 1 });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, hoveredSection, windowWidth]);

  // Mobile sliding indicator — only when menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const node = mobileLinkRefs.current[activeSection];
    if (node) {
      setMobileIndicatorStyle({
        top:    node.offsetTop,
        left:   node.offsetLeft,
        width:  node.offsetWidth,
        height: node.offsetHeight,
        opacity: 1,
      });
    } else {
      setMobileIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────── */}
        <div
          className="navbar-brand"
          onClick={() => scrollTo('home')}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          aria-label="Go to top"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollTo('home'); }}
        >
          <img src="/logo.png" alt="Aizaz Noor Khuwaja" className="navbar-custom-logo" />
        </div>

        {/* ── Desktop Nav Links ─────────────────────── */}
        <div className="navbar-links" role="list">
          {/* Sliding pill — dark tint for light glass */}
          <div
            className="nav-indicator"
            aria-hidden="true"
            style={{
              position:     'absolute',
              top:          '50%',
              transform:    'translateY(-50%)',
              left:         indicatorStyle.left,
              width:        indicatorStyle.width,
              height:       '32px',
              background:   'rgba(255, 255, 255, 0.16)',
              border:       '1px solid rgba(255, 255, 255, 0.26)',
              borderRadius: '20px',
              transition:   'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity:      indicatorStyle.opacity,
              pointerEvents:'none',
              zIndex:       0,
            }}
          />
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={label}
              href={`#${id}`}
              ref={(el) => (desktopLinkRefs.current[id] = el)}
              className={activeSection === id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              onMouseEnter={() => setHoveredSection(id)}
              onMouseLeave={() => setHoveredSection(null)}
              aria-current={activeSection === id ? 'page' : undefined}
              style={{ zIndex: 1, position: 'relative' }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* ── Right Icons ───────────────────────────── */}
        <div className="nav-right-section">
          {/* GitHub — noopener prevents tab-napping */}
          <a
            href="https://github.com/Aizaz-Noor"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon"
            aria-label="GitHub profile (opens in new tab)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
            </svg>
          </a>

          {/* LinkedIn — noopener prevents tab-napping */}
          <a
            href="https://www.linkedin.com/in/aizaz-noor"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-haspopup="true"
          >
            {isMobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile Context Menu Bubble ────────────── */}
        <div
          id="mobile-nav-menu"
          className={`context-menu-bubble${isMobileMenuOpen ? ' open' : ''}`}
          role="menu"
          aria-label="Navigation menu"
        >
          <div className="context-menu-links" style={{ position: 'relative' }}>
            {/* Sliding pill indicator — dark tint for light glass */}
            <div
              aria-hidden="true"
              style={{
                position:     'absolute',
                top:          mobileIndicatorStyle.top,
                left:         mobileIndicatorStyle.left || 0,
                width:        mobileIndicatorStyle.width || '100%',
                height:       mobileIndicatorStyle.height,
                background:   'rgba(255, 255, 255, 0.12)',
                border:       '1px solid rgba(255, 255, 255, 0.20)',
                borderRadius: '9999px',
                transition:   'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity:      isMobileMenuOpen ? mobileIndicatorStyle.opacity : 0,
                pointerEvents:'none',
                zIndex:       0,
              }}
            />
            {NAV_LINKS.map(({ label, id }) => (
              <a
                key={label}
                href={`#${id}`}
                ref={(el) => (mobileLinkRefs.current[id] = el)}
                className={`context-menu-link${activeSection === id ? ' active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
                role="menuitem"
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
