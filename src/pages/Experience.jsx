import { useLocale } from "../hooks/useLocale";
import Reveal from "../components/Reveal";
const EXPERIENCE = [
  {
    period: "Dec 2025 — Present",
    title: "Freelance software development",
    context: "Remote",
    description:
      "Building responsive web applications with the MERN stack, developing REST APIs, and integrating frontend and backend systems.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    period: "2025 — Present",
    title: "BSE · Software Engineering",
    context: "COMSATS University Islamabad / Lahore Campus",
    description:
      "Building a foundation in programming, object-oriented design, data structures, and database systems through coursework and practical projects.",
    tags: ["C++", "Java", "DSA", "DBMS"],
  },
];
export default function Experience() {
  const { t } = useLocale();
  return (
    <section id="experience" className="section-container experience-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t("02 / Experience & education")}</p>
          <h2>
            {t("Experience &")}
            <br />
            <em>{t("education.")}</em>
          </h2>
        </div>
        <p>
          {t(
            "Freelance development alongside my software engineering degree at COMSATS Lahore.",
          )}
        </p>
      </div>
      <div className="experience-list">
        {EXPERIENCE.map((item) => (
          <Reveal key={item.title}>
            <article className="experience-row ios-surface">
              <div className="experience-period">
                <i className="status-dot" />
                {t(item.period)}
              </div>
              <div>
                <p className="eyebrow">{t(item.context)}</p>
                <h3>{t(item.title)}</h3>
                <p>{t(item.description)}</p>
                <div className="tag-list">
                  {item.tags.map((tag) => (
                    <span key={tag} dir="ltr" lang="en">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
