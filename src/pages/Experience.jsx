import { FiBriefcase, FiBookOpen } from "react-icons/fi";
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
  return (
    <section id="experience" className="section-container experience-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{"02 / Experience & education"}</p>
          <h2>
            {"Experience &"}
            <br />
            <em>{"education."}</em>
          </h2>
        </div>
        <p>
          {
            "Freelance development alongside my software engineering degree at COMSATS Lahore."
          }
        </p>
      </div>
      <ol className="experience-list journey-timeline">
        {EXPERIENCE.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.07} className="journey-entry">
              <span className="journey-marker" aria-hidden="true">
                0{index + 1}
              </span>
              <article className="experience-row journey-card">
                <div className="journey-card-top">
                  <span className="journey-icon" aria-hidden="true">
                    {index === 0 ? <FiBriefcase /> : <FiBookOpen />}
                  </span>
                  <span className="journey-kind">
                    {index === 0
                      ? "Building in practice"
                      : "Learning the foundations"}
                  </span>
                </div>
                <div className="experience-period">{item.period}</div>
                <div>
                  <p className="eyebrow">{item.context}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
          </li>
        ))}
      </ol>
    </section>
  );
}
