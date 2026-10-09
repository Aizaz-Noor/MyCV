import MotionSurface from "../components/MotionSurface";
import { useState } from "react";
import Reveal from "../components/Reveal";
import { featuredProjects, moreProjects } from "../data/projects";
function TandemDiagram() {
  return (
    <div
      className="network-diagram"
      aria-label="Tandem architecture: network adapters connect to the desktop interface and Python sidecar, with local dispatcher or optional cloud tunnel"
    >
      <div className="diagram-heading">
        <span className="diagram-dot" /> TANDEM <span>System overview</span>
      </div>
      <div className="adapter-row">
        <span>Wi-Fi</span>
        <span>Ethernet</span>
        <span>USB tether</span>
      </div>
      <div className="network-path" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="network-hub">
        <span className="hub-mark">⇌</span>
        <div>
          <strong>One control surface</strong>
          <small>Tauri / React → Python sidecar</small>
        </div>
      </div>
      <div className="network-path single-path" aria-hidden="true">
        <i />
      </div>
      <div className="mode-row">
        <div>
          <span>01</span>
          <strong>Local dispatcher</strong>
          <small>Separate app connections</small>
        </div>
        <div>
          <span>02</span>
          <strong>Cloud tunnel</strong>
          <small>Compatible server required</small>
        </div>
      </div>
      <p className="diagram-caption">
        Architecture illustration · not an app screenshot
      </p>
    </div>
  );
}
function ScreenshotPreview({ project }) {
  const [view, setView] = useState("dashboard");
  return (
    <>
      <div
        className="preview-switch"
        role="group"
        aria-label="LifeFlow interface preview"
      >
        <button
          type="button"
          aria-pressed={view === "dashboard"}
          onClick={() => setView("dashboard")}
        >
          Staff portal
        </button>
        <button
          type="button"
          aria-pressed={view === "home"}
          onClick={() => setView("home")}
        >
          Public landing
        </button>
      </div>
      <figure className="project-browser">
        <div className="browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <small>
            LifeFlow /{" "}
            {view === "dashboard" ? "staff dashboard" : "public homepage"}
          </small>
          <b>↗</b>
        </div>
        <img
          key={view}
          className="preview-image"
          src={
            view === "dashboard"
              ? project.image
              : "/projects/lifeflow-home.webp"
          }
          alt={
            view === "dashboard"
              ? project.imageAlt
              : "LifeFlow public homepage with donor registration and blood donation information"
          }
          width="1440"
          height="698"
          loading="lazy"
        />
        <figcaption>Actual interface · repository screenshot</figcaption>
      </figure>
    </>
  );
}
export default function Projects() {
  return (
    <section id="work" className="section-container work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2>
            Built to be <em>useful.</em>
          </h2>
        </div>
        <p>
          A few things I've brought from
          <br />
          an idea into working software.
        </p>
      </div>
      <div className="featured-projects">
        {featuredProjects.map((project) => (
          <article
            className={`featured-project project-${project.id}`}
            key={project.id}
          >
            <MotionSurface className="project-visual">
              {project.image ? (
                <ScreenshotPreview project={project} />
              ) : (
                <TandemDiagram />
              )}
            </MotionSurface>
            <Reveal className="project-story">
              <div className="project-meta">
                <span>{project.number}</span>
                <span>{project.category}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <dl className="case-notes">
                <div>
                  <dt>The problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>The approach</dt>
                  <dd>{project.approach}</dd>
                </div>
                <div>
                  <dt>The result</dt>
                  <dd>{project.outcome}</dd>
                </div>
              </dl>
              <div className="project-actions">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    Explore demo <span aria-hidden="true">↗</span>
                  </a>
                )}
                <a href={project.repo} target="_blank" rel="noreferrer">
                  Source code <span aria-hidden="true">↗</span>
                </a>
                {project.release && (
                  <a href={project.release} target="_blank" rel="noreferrer">
                    Releases <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </Reveal>
          </article>
        ))}
      </div>
      <div className="more-work-heading">
        <h3>More explorations</h3>
        <span>Smaller projects. Same curiosity.</span>
      </div>
      <div className="project-index">
        {moreProjects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.04}>
            <article className="project-row">
              <span className="row-number">0{index + 3}</span>
              <div>
                <p className="eyebrow">{project.category}</p>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <small>{project.tags}</small>
              </div>
              <div className="row-actions">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} source code`}
                >
                  Code ↗
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} live demo`}
                  >
                    Demo ↗
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <a
        className="all-projects"
        href="https://github.com/Aizaz-Noor?tab=repositories"
        target="_blank"
        rel="noreferrer"
      >
        See all repositories on GitHub <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
