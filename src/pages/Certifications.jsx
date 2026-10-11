import { useLocale } from "../hooks/useLocale";
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
  const { t } = useLocale();
  return (
    <section
      id="certifications"
      className="section-container credentials-section"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t("05 / Credentials & community")}</p>
          <h2>
            {t("Credentials &")} <em>{t("community.")}</em>
          </h2>
        </div>
        <p>{t("Courses, workshops, and university activities.")}</p>
      </div>
      <Reveal>
        <ul className="credential-list">
          {CERTS.map((cert) => (
            <li key={cert.title}>
              <a href={cert.link} target="_blank" rel="noreferrer">
                <span className="credential-year">{cert.year}</span>
                <span>
                  <strong dir="ltr" lang="en">
                    {cert.title}
                  </strong>
                  <small dir="ltr" lang="en">
                    {cert.issuer}
                  </small>
                </span>
                <span className="credential-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only">
                  {" "}
                  {t("(PDF opens in a new tab)")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
