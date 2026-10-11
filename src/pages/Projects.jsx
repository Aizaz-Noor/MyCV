import { useLocale } from "../hooks/useLocale";
import MotionSurface from "../components/MotionSurface";
import ProjectPreview from "../components/ProjectPreview";
import Reveal from "../components/Reveal";
import { localizedProjects } from "../data/localizedProjects";
export default function Projects() {
  const { t } = useLocale();
  const { featured, more } = localizedProjects(t);
  return (
    <section id="work" className="section-container work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t("01 / Selected work")}</p>
          <h2>
            {t("Selected")} <em>{t("projects.")}</em>
          </h2>
        </div>
        <p>
          {t(
            "Web applications, desktop software, and the engineering decisions behind them.",
          )}
        </p>
      </div>
      <div className="featured-projects">
        {featured.map((project) => (
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
              <h3>
                <bdi dir="ltr" lang="en">
                  {project.name}
                </bdi>
              </h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag} dir="auto">
                    {tag}
                  </span>
                ))}
              </div>
              <dl className="case-notes">
                {project.role && (
                  <div>
                    <dt>{t("My role")}</dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
                <div>
                  <dt>{t("The problem")}</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>{t("The approach")}</dt>
                  <dd>{project.approach}</dd>
                </div>
                <div>
                  <dt>{t("The result")}</dt>
                  <dd>{project.outcome}</dd>
                </div>
              </dl>
              <div className="project-actions">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    {t("Explore demo")} <span aria-hidden="true">↗</span>
                  </a>
                )}
                <a href={project.repo} target="_blank" rel="noreferrer">
                  {t("Source code")} <span aria-hidden="true">↗</span>
                </a>
                {project.release && (
                  <a href={project.release} target="_blank" rel="noreferrer">
                    {t("Releases")} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </Reveal>
          </article>
        ))}
      </div>
      <div className="more-work-heading">
        <h3>{t("More explorations")}</h3>
        <span>{t("Coursework, experiments, and utilities.")}</span>
      </div>
      <div className="project-index">
        {more.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.04}>
            <article className="project-row">
              <span className="row-number">0{index + 3}</span>
              <div>
                <p className="eyebrow">{project.category}</p>
                <h4>
                  <bdi dir="ltr" lang="en">
                    {project.name}
                  </bdi>
                </h4>
                <p>{project.description}</p>
                <small dir="ltr" lang="en">
                  {project.tags}
                </small>
              </div>
              <div className="row-actions">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("{name} source code", { name: project.name })}
                >
                  {t("Code ↗")}
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t("{name} live demo", { name: project.name })}
                  >
                    {t("Demo ↗")}
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
        {t("See all repositories on GitHub")} <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
