import React, { useState } from 'react';
import Reveal from '../components/Reveal';

const CERTS = [
  {
    id: 'google_soft_skills',
    title: 'Career & Soft Skills Program',
    issuer: 'Google / PFA',
    date: '2024',
    img: '/pfala.jpg',
    link: '/pfala.pdf',
    desc: 'Completed professional training focused on communication, problem-solving, teamwork, career readiness, and workplace professionalism.',
    badge: 'Soft Skills',
  },
  {
    id: 'mlsa_cui',
    title: 'Microsoft Learn Student Ambassador',
    issuer: 'Microsoft',
    date: '2025',
    img: '/mlsa_cui.jpg',
    link: '/Mlsa Cui lahore.pdf',
    desc: 'Recognized as a Microsoft Learn Student Ambassador, contributing to community learning through technical workshops, events, and knowledge sharing.',
    badge: 'Microsoft',
  },
  {
    id: 'web_nexus',
    title: 'Frontend Web Development',
    issuer: 'MLSA FAST Peshawar',
    date: '2024',
    img: '/web_nuxes.jpg',
    link: '/web_nuxes.pdf',
    desc: 'Completed hands-on training in modern frontend development using HTML, CSS, JavaScript, and React to build responsive web applications.',
    badge: 'Frontend',
  },
  {
    id: '404_squad',
    title: '404 Squad',
    issuer: 'ACM CUI Lahore',
    date: '2024',
    img: '/404_squad.jpg',
    link: '/404_squad.pdf',
    desc: 'Recognized for active participation and contributions as a member of the 404 Squad, demonstrating teamwork, problem-solving, and commitment to ACM initiatives.',
    badge: 'Teamwork',
  },
  {
    id: 'event_emperors',
    title: 'Event Emperors',
    issuer: 'ACM CUI Lahore',
    date: '2024',
    img: '/event_emperors.jpg',
    link: '/event_emperors.pdf',
    desc: 'Recognized for contributing to the planning and successful execution of ACM events, strengthening teamwork, leadership, and event management skills.',
    badge: 'Leadership',
  }
];

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="section-container" id="certifications">
      <div className="section-content">
        <div className="section-header-centered" style={{ marginBottom: '4rem' }}>
          <h2 className="heading-lg accent-underline" style={{ marginBottom: '1.5rem' }}>
            Credentials & Recognition: <span className="g-text">Milestones</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '600px' }}>
            Certifications, awards, and community contributions that shaped my craft.
          </p>
        </div>

        <div className="cert-grid">
          {CERTS.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.1}>
              <div
                className={`cert-item ${hoveredId === cert.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="cert-img-wrapper">
                  {cert.img ? (
                    <img
                      src={cert.img}
                      alt={cert.title}
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="cert-img-placeholder">
                      <div className="cert-placeholder-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <span className="cert-placeholder-text">MLSA</span>
                      <span className="cert-placeholder-sub">CUI Lahore</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  {cert.link !== '#' && (
                    <div className="cert-overlay">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="cert-overlay-link"
                      >
                        <span>View Credential</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </a>
                    </div>
                  )}
                  <span className="cert-badge">{cert.badge}</span>
                </div>

                <div className="cert-info">
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-desc">{cert.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
