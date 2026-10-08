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
          <p className="eyebrow">02 / Experience & education</p>
          <h2>
            Learning. Building.
            <br />
            <em>Moving forward.</em>
          </h2>
        </div>
        <p>
          A foundation in software engineering.
          <br />A practice of making it real.
        </p>
      </div>
      <div className="experience-list">
        {EXPERIENCE.map((item) => (
          <Reveal key={item.title}>
            <article className="experience-row">
              <div className="experience-period">
                <i className="status-dot" />
                {item.period}
              </div>
              <div>
                <p className="eyebrow">{item.context}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tag-list">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
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
