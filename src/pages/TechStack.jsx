import React, { useState, useCallback, useMemo } from 'react';
import Reveal from '../components/Reveal';
import { SiPython, SiNodedotjs, SiReact, SiCplusplus, SiHtml5, SiExpress, SiMysql, SiMongodb, SiDocker, SiGit } from 'react-icons/si';
import { TbBrandJavascript, TbBrandTypescript } from 'react-icons/tb';
import { FaJava } from 'react-icons/fa';
import { VscTerminalBash } from 'react-icons/vsc';

const FILTERS = ['All', 'Languages', 'Frontend', 'Backend', 'Tools'];

const tools = [
  { name: 'Python',      icon: SiPython,          color: '#3776AB', glow: 'rgba(55, 118, 171, 0.35)',  category: 'Languages', desc: 'Scalable backend services, async workers, and AI scripting.' },
  { name: 'C++',        icon: SiCplusplus,        color: '#00599C', glow: 'rgba(0, 89, 156, 0.35)',    category: 'Languages', desc: 'Memory-efficient terminal utilities and custom data structures.' },
  { name: 'Java',       icon: FaJava,             color: '#ED8B00', glow: 'rgba(237, 139, 0, 0.35)',   category: 'Languages', desc: 'Robust OOP patterns, enterprise system architecture, JavaFX.' },
  { name: 'JavaScript', icon: TbBrandJavascript,  color: '#F7DF1E', glow: 'rgba(247, 223, 30, 0.3)',   category: 'Languages', desc: 'Dynamic DOM manipulation, complex logic, versatile web integrations.' },
  { name: 'TypeScript', icon: TbBrandTypescript,  color: '#3178C6', glow: 'rgba(49, 120, 198, 0.35)',  category: 'Languages', desc: 'Strict type safety for resilient, production-ready full-stack codebases.' },
  { name: 'React',      icon: SiReact,            color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.3)',   category: 'Frontend',  desc: 'Highly interactive, component-driven UIs with fluid animations.' },
  { name: 'HTML/CSS',   icon: SiHtml5,            color: '#E34F26', glow: 'rgba(227, 79, 38, 0.35)',   category: 'Frontend',  desc: 'Accessible layouts and modern, responsive interface styling.' },
  { name: 'Node.js',    icon: SiNodedotjs,        color: '#339933', glow: 'rgba(51, 153, 51, 0.35)',   category: 'Backend',   desc: 'AI agent pipelines and fast SaaS backends.' },
  { name: 'Express.js', icon: SiExpress,          color: '#ffffff', glow: 'rgba(255, 255, 255, 0.2)',  category: 'Backend',   desc: 'Fast, unopinionated routing layers for robust Node backends.' },
  { name: 'MySQL',      icon: SiMysql,            color: '#4479A1', glow: 'rgba(68, 121, 161, 0.35)',  category: 'Backend',   desc: 'Structured relational databases with normalized schemas.' },
  { name: 'MongoDB',    icon: SiMongodb,          color: '#47A248', glow: 'rgba(71, 162, 72, 0.35)',   category: 'Backend',   desc: 'Flexible NoSQL document storage for rapid-iteration SaaS products.' },
  { name: 'Git',        icon: SiGit,              color: '#F05032', glow: 'rgba(240, 80, 50, 0.35)',   category: 'Tools',     desc: 'Version control, branching strategies, and CI/CD workflows.' },
  { name: 'Docker',     icon: SiDocker,           color: '#2496ED', glow: 'rgba(36, 150, 237, 0.35)',  category: 'Tools',     desc: 'Containerizing services for consistent, portable deployments.' },
  { name: 'Bash',       icon: VscTerminalBash,    color: '#4EAA25', glow: 'rgba(78, 170, 37, 0.35)',   category: 'Tools',     desc: 'Shell scripting, automation, and DevOps workflows.' },
];

const TechCard = React.memo(function TechCard({ item }) {
  const [active, setActive] = useState(false);
  const cardRef = React.useRef(null);
  const rectCacheRef = React.useRef(null);

  // Cache rect on mouseenter (once per hover), not on every mousemove
  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
      rectCacheRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = rectCacheRef.current;
    if (!rect || !cardRef.current) return;
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const Icon = item.icon;

  return (
    <div
      ref={cardRef}
      className={`tech-card-container animated-border ${active ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onClick={(e) => { e.stopPropagation(); setActive(!active); }}
      style={{ '--card-glow': item.glow }}
      aria-label={`${item.name} — ${item.desc}`}
    >
      <div className="tech-card-inner">
        <div className="tech-card-front">
          <Icon className="tech-card-icon" size={36} style={{ color: item.color }} aria-hidden="true" />
          <h4 className="tech-card-name">{item.name}</h4>
        </div>
        <div className="tech-card-back">
          <Icon size={24} style={{ color: item.color, marginBottom: '0.5rem', flexShrink: 0 }} aria-hidden="true" />
          <p className="tech-card-desc">{item.desc}</p>
        </div>
      </div>
    </div>
  );
});

export default function TechStack() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTools = useMemo(() => {
    if (activeFilter === 'All') return tools;
    return tools.filter((t) => t.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="section-container" id="techstack">
      <div className="section-content">
        <div className="section-header-centered">
          <h2 className="heading-lg accent-underline" style={{ marginBottom: '1.5rem' }}>
            Technical Skills: <span className="g-text">Core Expertise</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '600px', marginBottom: '4rem' }}>
            Tools and technologies. Organized by their role in the systems I build.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="skill-filters" role="group" aria-label="Filter skills by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        <Reveal>
          <div className="tech-unified-grid" style={{ marginTop: '2rem' }}>
            {filteredTools.map((item) => (
              <TechCard key={item.name} item={item} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
