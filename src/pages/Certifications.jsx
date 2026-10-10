import Reveal from "../components/Reveal";
const CERTS = [
  {
    title: "Microsoft Learn Student Ambassador",
    issuer: "Microsoft",
    year: "2025",
    link: "/Mlsa Cui lahore.pdf",
  },
  {
    title: "Career & Soft Skills Program",
    issuer: "Google / PFA",
    year: "2024",
    link: "/pfala.pdf",
  },
  {
    title: "Frontend Web Development",
    issuer: "MLSA FAST Peshawar",
    year: "2024",
    link: "/web_nuxes.pdf",
  },
  {
    title: "404 Squad",
    issuer: "ACM CUI Lahore",
    year: "2024",
    link: "/404_squad.pdf",
  },
  {
    title: "Event Emperors",
    issuer: "ACM CUI Lahore",
    year: "2024",
    link: "/event_emperors.pdf",
  },
];
export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section-container credentials-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">05 / Credentials & community</p>
          <h2>
            Credentials &amp; <em>community.</em>
          </h2>
        </div>
        <p>
          Courses, workshops, and university activities.
        </p>
      </div>
      <Reveal>
        <ul className="credential-list">
          {CERTS.map((cert) => (
            <li key={cert.title}>
              <a href={cert.link} target="_blank" rel="noreferrer">
                <span className="credential-year">{cert.year}</span>
                <span>
                  <strong>{cert.title}</strong>
                  <small>{cert.issuer}</small>
                </span>
                <span className="credential-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only"> (PDF opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
