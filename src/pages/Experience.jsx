import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';

const EXPERIENCES = [
  {
    num: '01',
    company: 'Freelance Software Development',
    role: 'Freelance Software Engineer',
    period: 'DEC 2025 - PRESENT',
    type: 'Remote',
    desc: [
      'Building responsive full-stack web applications using the MERN stack.',
      'Developing RESTful APIs and integrating modern web technologies into client and personal projects.',
      'Continuously expanding my skills in AI integration, backend development, and software engineering best practices.',
    ],
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    current: true,
  },
  {
    num: '02',
    company: 'COMSATS University Islamabad',
    role: 'BSE Student - Software Engineering',
    period: '2025 - PRESENT',
    type: 'Lahore Campus · Full-time',
    desc: [
      'Developed a strong foundation in C++ through Programming Fundamentals.',
      'Advanced with Java to deepen understanding of OOP, Data Structures & Algorithms, and core SE principles.',
      'Currently learning Database Management Systems (DBMS) in coursework.',
    ],
    tags: ['C++', 'Java', 'OOP', 'DSA', 'DBMS'],
    current: true,
  },
];

export default function Experience() {
  const [activeItems, setActiveItems] = useState([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveItems((prev) => {
              if (prev.includes(i)) return prev;
              return [...prev, i];
            });
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="section-container" id="experience">
      <div className="section-content">
        <div className="section-header-centered" style={{ marginBottom: '4rem' }}>
          <h2 className="heading-lg accent-underline" style={{ marginBottom: '1.5rem' }}>
            Experience & Education: <span className="g-text">Where I've Grown</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '600px' }}>
            Work experience and education. Where real engineering learning happens.
          </p>
        </div>

        {/* Timeline */}
        <div className="exp-timeline">
          <div className="exp-timeline-line">
            <div className="exp-timeline-progress" />
          </div>

          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.num}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`exp-timeline-item ${i % 2 === 0 ? 'left' : 'right'} ${activeItems.includes(i) ? 'visible' : ''}`}
            >
              <div className="exp-timeline-dot">
                {exp.current && <span className="exp-dot-pulse" />}
              </div>
              <div className="exp-timeline-num">{exp.num}</div>

              <div className="glass-panel exp-card">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <div className="exp-company">{exp.company}</div>
                    <h3 className="exp-role">{exp.role}</h3>
                  </div>
                </div>

                <div className="exp-meta">
                  <span>{exp.period}</span>
                  <span className="exp-meta-dot">·</span>
                  <span>{exp.type}</span>
                </div>

                {/* Bullet points */}
                <ul className="exp-desc-list">
                  {exp.desc.map((d, j) => (
                    <li key={j}>
                      <span className="exp-bullet">▹</span>
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
                  {exp.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
