import React, { useState, useEffect } from 'react';

const TAGLINE_WORDS = ['Ideate.', 'Design.', 'Develop.', 'Innovate.'];

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1000; // 1 second

    const animateProgress = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = 1 - Math.pow(1 - t, 3);
      setProgress(easedT * 100);

      if (t < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        setLoaded(true);
        setTimeout(() => setRemoved(true), 900);
      }
    };

    requestAnimationFrame(animateProgress);
  }, []);

  if (removed) return null;

  return (
    <div className={`preloader-screen ${loaded ? 'preloader-exit' : ''}`}>
      {/* Particle dots background */}
      <div className="preloader-particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="preloader-particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Brand */}
      <div className="preloader-brand">
        <div className="preloader-brand-main">
          <span className="preloader-name">Aizaz</span>
          <span className="preloader-accent">Noor</span>
        </div>
        <div className="preloader-brand-subtitle">
          <span className="subtitle-line" />
          <span>Personal Portfolio</span>
          <span className="subtitle-line" />
        </div>
      </div>

      {/* Sleek Progress Bar */}
      <div className="preloader-track">
        <div
          className="preloader-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Cycling Tagline */}
      <div className="preloader-tagline" aria-hidden="true">
        {TAGLINE_WORDS.map((word, i) => (
          <span
            key={word}
            className="preloader-tagline-word"
            style={{ '--w': i }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
