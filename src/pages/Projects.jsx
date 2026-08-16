import React, { useState, useEffect } from 'react';
import GithubStats from '../components/GithubStats';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';

const PROJECTS = [
  {
    num: '01',
    name: "Newton's Glitch",
    desc: "Physics-based JavaFX game featuring custom 60 FPS 2D physics engine handling 100+ rigid body collisions without external libraries. Built with gravity-flip mechanics and scale-dependent collision.",
    tags: ['Java', 'JavaFX', 'Physics Engine', 'Game Dev'],
    url: 'https://github.com/Aizaz-Noor/Newtons-Glitch',
    diagram: (
      <div className="arch-diagram">
        <div className="arch-box">Input</div>
        <div className="arch-arrow" />
        <div className="arch-box arch-accent">Gravity Engine</div>
        <div className="arch-arrow" />
        <div className="arch-box">Collision</div>
        <div className="arch-arrow" />
        <div className="arch-box">Render</div>
      </div>
    )
  },
  {
    num: '02',
    name: 'ANK-CINEMA',
    desc: 'Cross-platform terminal CLI media downloader featuring parallel multi-source search engine achieving sub-second torrent resolution and magnet enrichment via aria2c.',
    tags: ['Python', 'CLI', 'aria2c', 'Parallel Search'],
    url: 'https://github.com/Aizaz-Noor/ANK-CINEMA',
    diagram: (
      <div className="arch-diagram">
        <div className="arch-box">Parallel Search</div>
        <div className="arch-arrow" />
        <div className="arch-box">Dedup</div>
        <div className="arch-arrow" />
        <div className="arch-box arch-accent">Magnet Enrich</div>
        <div className="arch-arrow" />
        <div className="arch-box">Download</div>
      </div>
    )
  },
  {
    num: '03',
    name: 'Weekly Habit Tracker',
    desc: 'Interactive single-page habit tracker featuring multi-week streak calculation engine, zero-latency local storage state management, and responsive weekly grid visualization.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'State Mgmt'],
    url: 'https://github.com/Aizaz-Noor/habit-tracker',
    demoUrl: 'https://habit-tracker-beryl-chi.vercel.app',
    diagram: (
      <div className="arch-diagram">
        <div className="arch-box">Habit Input</div>
        <div className="arch-arrow" />
        <div className="arch-box arch-accent">Streak Engine</div>
        <div className="arch-arrow" />
        <div className="arch-box">Weekly Grid</div>
      </div>
    )
  },
  {
    num: '04',
    name: 'Hostel Kharcha Manager',
    desc: 'Terminal-based collaborative expense tracker built in C++ with custom hash map data structures, automated budget report generation, and a full TUI.',
    tags: ['C++', 'Terminal UI', 'Data Structures'],
    url: 'https://github.com/Aizaz-Noor/Hostel-Kharcha-Manager',
    diagram: (
      <div className="arch-diagram">
        <div className="arch-box">Terminal UI</div>
        <div className="arch-arrow" />
        <div className="arch-box arch-accent">Hash Map</div>
        <div className="arch-arrow" />
        <div className="arch-box">Reports</div>
      </div>
    )
  },
];

const ProjectCard = React.memo(function ProjectCard({ project }) {
  const cardRef = React.useRef(null);

  const handleMouseMove = React.useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <TiltCard style={{ height: '100%' }}>
      <div
        ref={cardRef}
        className="glass-panel project-card"
        onMouseMove={handleMouseMove}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Number */}
        <div
          className="g-text"
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            marginBottom: '1rem',
            fontFamily: 'monospace',
          }}
        >
          {project.num}
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'inherit',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text-1)',
          letterSpacing: '-0.01em',
          marginBottom: '0.75rem',
        }}>
          {project.name}
        </h3>

        {/* Desc */}
        <p style={{ fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1rem', color: 'var(--text-2)' }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem', flexGrow: 1, alignContent: 'flex-start' }}>
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Architecture Diagram */}
        {project.diagram && (
          <div style={{ marginBottom: '1.5rem' }}>
            {project.diagram}
          </div>
        )}

        {/* Links */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href={project.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="project-link-text" style={{
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-1)',
            textDecoration: 'none',
          }}>
            View on GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          {project.demoUrl && project.demoUrl !== '#' && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="project-link-text g-text" style={{
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              Live Demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
});

export default function Work() {
  return (
    <section className="section-container" id="work">
      <div className="section-content">
        <div className="section-header-centered">
          <h2 className="heading-lg accent-underline" style={{ marginBottom: '3rem' }}>
            Project Showcase: <span className="g-text">What I've Built</span>
          </h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, idx) => (
            <Reveal key={p.num} delay={idx * 0.08} className={`project-tile project-tile-${idx}`}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <div>
          <div className="section-header-centered" style={{ marginTop: '4rem', maxWidth: '100%' }}>
            <h3 style={{
              fontSize: '1rem',
              color: 'var(--text-1)',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '0.5rem',
              display: 'inline-block'
            }}>
              Engineering, Measured
            </h3>
            <GithubStats />
          </div>
        </div>
      </div>
    </section>
  );
}
