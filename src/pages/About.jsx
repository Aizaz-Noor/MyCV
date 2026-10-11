import { useLocale } from "../hooks/useLocale";
import Reveal from "../components/Reveal";
export default function About() {
  const { t } = useLocale();
  return (
    <section id="about" className="section-container about-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t("03 / The person behind the code")}</p>
          <h2>
            {t("A little")}
            <br />
            <em>{t("about me.")}</em>
          </h2>
        </div>
      </div>
      <div className="about-layout">
        <Reveal className="portrait-frame">
          <img
            src="/about-photo-color-portrait.jpeg"
            alt={t("Portrait of Aizaz Noor")}
            width="400"
            height="500"
            loading="lazy"
          />
          <div className="portrait-caption">
            <bdi dir="ltr" lang="en">
              Aizaz Noor
            </bdi>
            <span>{t("Lahore, Pakistan ↗")}</span>
          </div>
        </Reveal>
        <Reveal className="about-story">
          <p className="about-lead">
            {t("Software engineering student.")}
            <br />
            {t("Freelance developer.")}
          </p>
          <p>
            {t(
              "I'm studying Software Engineering at COMSATS University Islamabad, Lahore Campus. I build web applications and developer tools, and enjoy understanding how a system works beyond its interface.",
            )}
          </p>
          <p>
            {t(
              "My projects take me from React and JavaFX to Python and C++. I'm also exploring DevOps and AI automation, one practical experiment at a time.",
            )}
          </p>
          <div className="about-principles">
            <div>
              <span>01</span>
              <h3>{t("Make it understandable.")}</h3>
              <p>
                {t("Clear interfaces and code that someone else can follow.")}
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>{t("Learn through the details.")}</h3>
              <p>
                {t("Build, test, listen, and improve the parts that matter.")}
              </p>
            </div>
          </div>
          <div id="profiles" className="profile-links">
            <a
              href="https://github.com/Aizaz-Noor"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/aizaz-noor"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              {t("Résumé ↗")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
