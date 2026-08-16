import { useState, useEffect } from 'react';

const PROFILE_CARDS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    action: 'Connect',
    href: 'https://www.linkedin.com/in/aizaz-noor',
    color: '#0077b5',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    action: 'Explore',
    href: 'https://github.com/Aizaz-Noor',
    color: '#ffffff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    id: 'email',
    name: 'Email',
    action: 'Write',
    href: 'mailto:aizaznoorkhuwaja@gmail.com',
    color: '#ea4335',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
];

// GitHub Contribution heatmap using GitHub's SVG endpoint
function GitHubHeatmap({ username = 'Aizaz-Noor' }) {
  const [loaded, setLoaded] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="github-heatmap-wrapper animated-border">
      <div className="github-heatmap-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--accent)' }}>
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-2)', fontWeight: 500 }}>
          GitHub Contributions: {currentYear}
        </span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 500 }} className="g-text"
        >
          @{username} ↗
        </a>
      </div>
      <div className="github-heatmap-embed" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt={`GitHub contribution chart for ${username}`}
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', height: 'auto', filter: 'invert(1) hue-rotate(180deg) brightness(1.5) contrast(1.1) opacity(0.85) url(#box-inner-shadow)' }}
          loading="lazy"
        />
      </div>
      {!loaded && (
        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="loading-spinner" style={{ width: '24px', height: '24px' }} />
        </div>
      )}
    </div>
  );
}

export default function Profiles() {
  return (
    <section className="section-container" id="profiles">
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="box-inner-shadow">
            {/* Compute black inner shadow on ALL boxes */}
            <feOffset dx="0" dy="2" in="SourceGraphic" />
            <feGaussianBlur stdDeviation="1.5" result="all-offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="all-offset-blur" result="all-inverse" />
            <feFlood floodColor="black" floodOpacity="0.8" result="all-color" />
            <feComposite operator="in" in="all-color" in2="all-inverse" result="all-inner-shadow" />

            {/* Isolate empty boxes based on low Green and high Alpha */}
            <feColorMatrix type="matrix" in="SourceGraphic" result="empty-mask"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 -5 0 1.5 0" />
            
            {/* Compute white OUTER shadow on empty mask (edge highlight) */}
            <feOffset dx="0" dy="1" in="empty-mask" />
            <feGaussianBlur stdDeviation="0.5" result="empty-outer-blur" />
            <feFlood floodColor="white" floodOpacity="0.15" result="white-outer-color" />
            <feComposite operator="in" in="white-outer-color" in2="empty-outer-blur" result="empty-outer-shadow" />
            
            {/* Combine them: Outer shadow behind, original image, inner shadow on top */}
            <feMerge>
              <feMergeNode in="empty-outer-shadow" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="all-inner-shadow" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div className="section-content">
        <div className="section-header-centered" style={{ marginBottom: '4rem' }}>
          <h2 className="heading-lg accent-underline" style={{ marginBottom: '1.5rem' }}>
            Web Presence: <span className="g-text">Dev Network</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '600px' }}>
            Find me across the web. Open source commits, professional connections, and direct contact.
          </p>
        </div>

        {/* Profile Photo */}
        <div className="profiles-photo-wrapper">
          <div className="profiles-photo-ring">
            <img
              src="/about-photo-color-portrait.jpeg"
              alt="Aizaz Noor"
              className="profiles-photo"
              loading="lazy"
            />
          </div>
          <p className="profiles-handle">@Aizaz-Noor</p>
        </div>

        {/* Profile Cards */}
        <div className="profiles-grid">
          {PROFILE_CARDS.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target={card.id !== 'email' ? '_blank' : undefined}
              rel={card.id !== 'email' ? 'noreferrer' : undefined}
              className="profile-card animated-border"
              style={{ '--profile-color': card.color }}
            >
              <div className="profile-card-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              <div className="profile-card-info">
                <h3>{card.name}</h3>
                <p>{card.action}</p>
              </div>
              <div className="profile-card-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub Contribution Heatmap */}
        <GitHubHeatmap username="Aizaz-Noor" />

        <p className="profiles-note">
          Click any card to explore further. Always open to collaborations and new connections.
        </p>
      </div>
    </section>
  );
}
