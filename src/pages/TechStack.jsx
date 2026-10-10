import Reveal from "../components/Reveal";
import TechIcon from "../components/TechIcon";
import MotionSurface from "../components/MotionSurface";
const GROUPS = [
  {
    name: "Interfaces",
    number: "01",
    tools: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "JavaFX"],
    description: "Responsive experiences and interactive applications.",
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
    tools: ["Git", "GitHub", "Vite", "Linux", "Docker", "Bash", "Vercel"],
    description: "The tools I use and explore to build, test, and ship.",
  },
];
export default function TechStack() {
  return (
    <section id="techstack" className="section-container skills-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / My development toolkit</p>
          <h2>
            My development
            <br />
            <em>toolkit.</em>
          </h2>
        </div>
        <p>
          Languages, frameworks, and tools I use across coursework, freelance work, and personal projects.
        </p>
      </div>
      <div className="skill-groups">
        {GROUPS.map((group, index) => (
          <Reveal key={group.name} delay={index * 0.06}>
            <MotionSurface className="skill-group ios-surface">
              <div className="skill-group-top">
                <span>{group.number}</span>
                <span aria-hidden="true">&lt;/&gt;</span>
              </div>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <ul>
                {group.tools.map((tool) => (
                  <li key={tool}>
                    <TechIcon name={tool} size={26} />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </MotionSurface>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
