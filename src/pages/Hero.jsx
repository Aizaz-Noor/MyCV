import { lazy, Suspense, useState } from "react";
import ResumeModal from "../components/ResumeModal";
import ErrorBoundary from "../components/ErrorBoundary";
import { useOptionalGraphics } from "../hooks/useOptionalGraphics";
const Background3D = lazy(() => import("../components/Background3D"));
export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [graphics, setGraphics] = useState(false);
  const graphicsAllowed = useOptionalGraphics();
  return (
    <section id="home" className="studio-hero section-container">
      <div className="hero-topline">
        <span>
          <i className="status-dot" /> Student & freelance developer
        </span>
        <span>
          Based in Lahore, PK <span aria-hidden="true">↗</span>
        </span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-enter">
            Code with purpose. Design with care.
          </p>
          <h1 className="hero-name hero-enter">
            Aizaz
            <br />
            <span>
              Noor<span className="name-period">.</span>
            </span>
          </h1>
          <p className="hero-description hero-enter">
            I build thoughtful web experiences
            <br className="desktop-break" /> and tools that solve everyday
            problems.
          </p>
          <div className="hero-actions hero-enter">
            <a className="studio-button" href="#work">
              Explore my work <span aria-hidden="true">↘</span>
            </a>
            <button
              className="text-button"
              type="button"
              onClick={() => setResumeOpen(true)}
            >
              View résumé <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <div className="hero-art" aria-label="Decorative orbital illustration">
          {graphics && graphicsAllowed && (
            <div className="hero-webgl">
              <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                  <Background3D />
                </Suspense>
              </ErrorBoundary>
            </div>
          )}
          <div className="orbit-scene" aria-hidden="true">
            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
            <div className="orbit-ring orbit-ring-three" />
            <div className="orbit-core">
              <span>AN</span>
              <small>BUILD / EXPLORE / REPEAT</small>
            </div>
            <span className="orbit-node node-one" />
            <span className="orbit-node node-two" />
          </div>
          <div className="art-label art-label-top">
            <span className="tiny-cross" aria-hidden="true">
              +
            </span>{" "}
            Ideas → working software
          </div>
          <div className="art-label art-label-bottom">
            <span>WEB · SYSTEMS · AUTOMATION</span>
            <span aria-hidden="true">[ 01 / ∞ ]</span>
          </div>
          {graphicsAllowed && (
            <button
              type="button"
              className="graphics-toggle"
              aria-pressed={graphics}
              onClick={() => setGraphics((value) => !value)}
            >
              {graphics ? "Pause 3D" : "Enable 3D"}{" "}
              <span aria-hidden="true">{graphics ? "Ⅱ" : "▷"}</span>
            </button>
          )}
        </div>
      </div>
      <div className="hero-bottom">
        <p>
          React interfaces. Python tools.
          <br />
          Always learning by building.
        </p>
        <a href="#work">
          Selected work below <span aria-hidden="true">↓</span>
        </a>
        <div className="hero-social">
          <a
            href="https://github.com/Aizaz-Noor"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/aizaz-noor"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
