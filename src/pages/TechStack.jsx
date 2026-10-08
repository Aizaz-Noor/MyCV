import Reveal from "../components/Reveal";
const GROUPS = [
  {
    name: "Interfaces",
    number: "01",
    tools: ["React", "JavaScript", "TypeScript", "HTML / CSS", "JavaFX"],
    description: "Responsive web experiences and interactive applications.",
  },
  {
    name: "Logic & data",
    number: "02",
    tools: ["Python", "C++", "Java", "Node.js", "Express", "MySQL", "MongoDB"],
    description: "APIs, command-line tools, and the data behind them.",
  },
  {
    name: "Workflow",
    number: "03",
    tools: ["Git / GitHub", "Vite", "Linux", "Docker", "Bash", "Vercel"],
    description: "The tools I use and explore to build, test, and ship.",
  },
];
export default function TechStack() {
  return (
    <section id="techstack" className="section-container skills-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / Toolkit</p>
          <h2>
            The tools behind
            <br />
            <em>the thinking.</em>
          </h2>
        </div>
        <p>
          Chosen for the problem.
          <br />
          Not collected for the badge.
        </p>
      </div>
      <div className="skill-groups">
        {GROUPS.map((group, index) => (
          <Reveal key={group.name} delay={index * 0.06}>
            <article className="skill-group">
              <div className="skill-group-top">
                <span>{group.number}</span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <ul>
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
