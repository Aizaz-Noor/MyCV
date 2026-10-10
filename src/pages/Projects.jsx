import MotionSurface from "../components/MotionSurface";
import ProjectPreview from "../components/ProjectPreview";
import Reveal from "../components/Reveal";
import { featuredProjects, moreProjects } from "../data/projects";
export default function Projects() {
  return (
    <section id="work" className="section-container work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2>
            Selected <em>projects.</em>
          </h2>
        </div>
        <p>
          Web applications, desktop software, and the engineering decisions behind them.
        </p>
      </div>
      <div className="featured-projects">
        {featuredProjects.map((project) => (
          <article
            className={`featured-project project-${project.id}`}
            key={project.id}
          >
            <MotionSurface className="project-visual ios-surface">
              <ProjectPreview project={project} />
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
                {project.role && (
                  <div>
                    <dt>My role</dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
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
        <span>Coursework, experiments, and utilities.</span>
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
