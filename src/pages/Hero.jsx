import { lazy, Suspense, useState } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiFileText,
  FiCode,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import ResumeModal from "../components/ResumeModal";
import ErrorBoundary from "../components/ErrorBoundary";
import TechIcon from "../components/TechIcon";
import { useOptionalGraphics } from "../hooks/useOptionalGraphics";
const Background3D = lazy(() => import("../components/Background3D"));
const ORBIT_TOOLS = ["React", "Python", "Node.js", "TypeScript"];
const TICKER = [
  "React",
  "Python",
  "TypeScript",
  "Node.js",
  "C++",
  "Java",
  "Docker",
  "Git",
];
export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const graphicsAllowed = useOptionalGraphics();
  return (
    <section id="home" className="studio-hero section-container kinetic-hero">
      <div className="hero-topline">
        <span className="dynamic-status-capsule">
          <i className="status-dot" /> Software engineering student & freelance
          developer
        </span>
        <span>
          Lahore, Pakistan <FiArrowUpRight aria-hidden="true" />
        </span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-enter">
            <span className="code-bracket">&lt;/&gt;</span> Developer. Builder.
            Curious mind.
          </p>
          <h1 className="hero-name hero-enter">
            Aizaz
            <br />
            <span>
              Noor<span className="name-period">.</span>
            </span>
          </h1>
          <p className="hero-description hero-enter">
            From an idea to an interface.
            <br />
            From a problem to working software.
          </p>
          <div className="hero-capabilities hero-enter">
            <span>
              <FiCode aria-hidden="true" /> Web development
            </span>
            <span>
              <FiCpu aria-hidden="true" /> Developer tools
            </span>
            <span>
              <FiLayers aria-hidden="true" /> Exploring AIOps
            </span>
          </div>
          <div className="hero-actions hero-enter">
            <a className="studio-button" href="#work">
              Explore my work <FiArrowDownRight aria-hidden="true" />
            </a>
            <button
              className="text-button"
              type="button"
              onClick={() => setResumeOpen(true)}
            >
              <FiFileText aria-hidden="true" /> View résumé{" "}
              <FiArrowUpRight aria-hidden="true" />
            </button>
          </div>
          <div className="hero-social hero-enter">
            <a
              href="https://github.com/Aizaz-Noor"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub aria-hidden="true" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/aizaz-noor"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin aria-hidden="true" /> LinkedIn
            </a>
            <span className="hero-note">Always learning by building.</span>
          </div>
        </div>
        <div
          className={`hero-art kinetic-art ${ready && graphicsAllowed ? "webgl-ready" : ""}`}
        >
          <div className="scene-crosshair" aria-hidden="true">
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
          </div>
          <div className="sculpture-fallback" aria-hidden="true">
            <div className="sculpture-sphere" />
            <div className="sculpture-band band-one" />
            <div className="sculpture-band band-two" />
            <div className="sculpture-band band-three" />
          </div>
          {graphicsAllowed && (
            <div className="hero-webgl" aria-hidden="true">
              <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                  <Background3D onReady={() => setReady(true)} />
                </Suspense>
              </ErrorBoundary>
            </div>
          )}
          <div className="tech-orbit" aria-hidden="true">
            {ORBIT_TOOLS.map((name, index) => (
              <div key={name} className={`tech-satellite satellite-${index}`}>
                <div>
                  <TechIcon name={name} size={30} />
                </div>
              </div>
            ))}
          </div>
          <div className="code-floating code-floating-top" aria-hidden="true">
            <span className="code-window-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="code-comment">// turn ideas into reality</span>
            <code>
              <b>const</b> developer = {"{"}
              <br />
              <span>name:</span> <em>'Aizaz Noor'</em>,<br />
              <span>mindset:</span> <em>'keep building'</em>
              <br />
              {"}"};
            </code>
          </div>
          <div
            className="code-floating code-floating-bottom"
            aria-hidden="true"
          >
            <FiCode />
            <div>
              <strong>Build. Test. Improve.</strong>
              <span>One thoughtful iteration at a time.</span>
            </div>
            <i className="status-dot" />
          </div>
          <div className="scene-caption">
            <span>CREATIVE CODE / LIVE MOTION</span>
            <span aria-hidden="true">01 — ∞</span>
          </div>
        </div>
      </div>
      <div
        className="tech-ticker"
        role="region"
        tabIndex={0}
        aria-label="Technologies I work with"
      >
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div
              className="ticker-group"
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {TICKER.map((name) => (
                <span key={name}>
                  <TechIcon name={name} size={21} />
                  {name}
                  <i aria-hidden="true">✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <a href="#work" className="hero-scroll-cue">
        <span className="scroll-mouse" aria-hidden="true">
          <i />
        </span>
        Scroll to explore <FiArrowDownRight aria-hidden="true" />
      </a>
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
