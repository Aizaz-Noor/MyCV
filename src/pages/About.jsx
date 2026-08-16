import { useEffect, useRef, useState } from 'react';
import TiltCard from '../components/TiltCard';

export default function About() {
  const checklistRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const items = checklistRef.current?.querySelectorAll('.checklist-item');
    if (!items) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((_, i) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, i]);
            }, i * 160);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (checklistRef.current) observer.observe(checklistRef.current);
    return () => observer.disconnect();
  }, []);

  const traits = [
    {
      label: 'Continuous Learning',
      desc: 'Always exploring new technologies and improving my programming skills through hands-on projects.',
    },
    {
      label: 'Problem Solving',
      desc: 'I enjoy breaking complex problems into simple, efficient software solutions.',
    },
    {
      label: 'Project-Based Learning',
      desc: 'I believe practical experience is the fastest way to become a better software engineer.',
    },
  ];

  return (
    <section className="section-container" id="about">
      <div className="section-content">

        <div className="section-header-centered" style={{ marginBottom: '4rem' }}>
          <h2 className="heading-lg accent-underline" style={{ marginBottom: '1.5rem' }}>
            Engineering With Intent: <span className="g-text">Behind The Code</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '600px' }}>
            Beyond the code: reliability, clarity, and shipping what I say I'll ship.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4rem',
          alignItems: 'flex-start'
        }}>
          {/* Left Column - Image */}
          <div style={{
            flex: '1 1 280px',
            maxWidth: '360px',
            margin: '0 auto',
          }}>
            <TiltCard>
              <div className="about-photo-wrapper animated-border">
                <img
                  src="/about-photo-color-portrait.jpeg"
                  alt="Aizaz Noor"
                  className="about-photo"
                  loading="lazy"
                />
                <div className="about-photo-vignette" />
              </div>
            </TiltCard>
          </div>

          {/* Right Column - Text */}
          <div style={{
            flex: '2 1 380px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            <p style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--text-1)',
              lineHeight: 1.5,
            }}>
              I'm Aizaz, a Software Engineering student at COMSATS University Islamabad, Lahore Campus,
              passionate about building practical software and continuously expanding my technical skills.
            </p>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-2)',
              lineHeight: 1.8,
            }}>
              I enjoy combining creativity with technology to build solutions that address real-world problems.
              My interests include software development, automation, and intelligent systems, and I'm always eager
              to learn modern tools and technologies that improve the way software is designed and delivered.
            </p>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-2)',
              lineHeight: 1.8,
            }}>
              I believe in learning by building. Whether it's developing applications, experimenting with new
              technologies, or contributing to hands-on projects, I'm focused on writing clean, maintainable
              code while continuously growing as a software engineer.
            </p>

            {/* Animated checklist */}
            <div
              ref={checklistRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}
            >
              {traits.map((trait, i) => (
                <div
                  key={trait.label}
                  className="checklist-item"
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    opacity: visibleItems.includes(i) ? 1 : 0,
                    transform: visibleItems.includes(i) ? 'translateX(0)' : 'translateX(-20px)',
                    transition: 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <div className="checklist-icon-wrap">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>{trait.label}</span>
                    <span style={{ color: 'var(--text-2)' }}>: {trait.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
