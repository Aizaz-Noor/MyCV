import { Suspense, lazy, useEffect } from 'react';
import Navbar          from './components/Navbar';
import ScrollProgress  from './components/ScrollProgress';
import ErrorBoundary   from './components/ErrorBoundary';
import CustomCursor    from './components/CustomCursor';
import Footer          from './components/Footer';
import { useOptionalGraphics } from './hooks/useOptionalGraphics';

import Hero from './pages/Hero';
import About from './pages/About';
import Experience from './pages/Experience';
import TechStack from './pages/TechStack';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Profiles from './pages/Profiles';
import Contact from './pages/Contact';
const Background3D   = lazy(() => import('./components/Background3D'));

const SECTIONS = [
  { id: 'home', name: 'Home', Component: Hero },
  { id: 'about', name: 'About', Component: About },
  { id: 'experience', name: 'Experience', Component: Experience },
  { id: 'techstack', name: 'Skills', Component: TechStack },
  { id: 'work', name: 'Projects', Component: Projects },
  { id: 'certifications', name: 'Credentials', Component: Certifications },
  { id: 'profiles', name: 'Profiles', Component: Profiles },
  { id: 'contact', name: 'Contact', Component: Contact },
];

export default function App() {
  const showGraphics = useOptionalGraphics();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!SECTIONS.some((section) => section.id === id)) return;
    const frame = window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only" style={{
        position: 'absolute',
        top: '-999px',
        left: '1rem',
        zIndex: 99999,
        padding: '0.5rem 1rem',
        background: 'var(--accent)',
        color: '#000',
        fontWeight: 700,
        borderRadius: '4px',
      }} onFocus={(e) => { e.target.style.top = '1rem'; }} onBlur={(e) => { e.target.style.top = '-999px'; }}>
        Skip to content
      </a>
      <CustomCursor />
      <ScrollProgress />
      <ErrorBoundary fallback={null}>
        <Navbar />
      </ErrorBoundary>

      {/* LAYER 1: The 3D WebGL Background */}
      {showGraphics && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Background3D />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* LAYER 1.5: Global Scrim */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          backgroundColor: 'rgba(5, 7, 12, 0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* LAYER 2: 2D HTML/CSS Foreground */}
      <main id="main-content" tabIndex="-1" style={{ position: 'relative', zIndex: 10, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', outline: 'none' }}>
        {SECTIONS.map((section) => {
          const Section = section.Component;
          const fallback = (
            <section id={section.id} className="section-container">
              <p>{section.name} is temporarily unavailable.</p>
              {section.id === 'contact' && <a href="mailto:aizaznoorkhuwaja@gmail.com">Email Aizaz directly</a>}
            </section>
          );
          return (
            <ErrorBoundary key={section.id} fallback={fallback}>
              <Section />
            </ErrorBoundary>
          );
        })}
        <Footer />
      </main>
    </>
  );
}
