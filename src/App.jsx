import { Suspense, useEffect, lazy, useState } from 'react';
import Navbar          from './components/Navbar';
import Preloader       from './components/Preloader';
import ScrollProgress  from './components/ScrollProgress';
import ErrorBoundary   from './components/ErrorBoundary';
import CustomCursor    from './components/CustomCursor';
import Footer          from './components/Footer';
import { useMousePosition } from './hooks/useMousePosition';

import Hero from './pages/Hero';
const About          = lazy(() => import('./pages/About'));
const Experience     = lazy(() => import('./pages/Experience'));
const TechStack      = lazy(() => import('./pages/TechStack'));
const Projects       = lazy(() => import('./pages/Projects'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Profiles       = lazy(() => import('./pages/Profiles'));
const Contact        = lazy(() => import('./pages/Contact'));
const Background3D   = lazy(() => import('./components/Background3D'));

export default function App() {
  useEffect(() => {
    // Signal native preloader (in index.html) to fade out
    document.dispatchEvent(new CustomEvent('app-ready'));

    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.overflowX = 'hidden';
  }, []);

  useMousePosition();

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
      <Preloader />
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      {/* LAYER 1: The 3D WebGL Background */}
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      {/* LAYER 1.5: Global Scrim */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          backgroundColor: 'rgba(5, 7, 12, 0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* LAYER 2: 2D HTML/CSS Foreground */}
      <main id="main-content" tabIndex="-1" style={{ position: 'relative', zIndex: 10, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', outline: 'none' }}>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <About />
          </Suspense>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
          <Suspense fallback={null}>
            <TechStack />
          </Suspense>
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
          <Suspense fallback={null}>
            <Certifications />
          </Suspense>
          <Suspense fallback={null}>
            <Profiles />
          </Suspense>
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </main>
    </>
  );
}
