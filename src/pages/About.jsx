import Reveal from "../components/Reveal";
export default function About() {
  return (
    <section id="about" className="section-container about-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / The person behind the code</p>
          <h2>
            Curiosity is
            <br />
            my <em>starting point.</em>
          </h2>
        </div>
      </div>
      <div className="about-layout">
        <Reveal className="portrait-frame">
          <img
            src="/about-photo-color-portrait.jpeg"
            alt="Portrait of Aizaz Noor"
            width="400"
            height="500"
            loading="lazy"
          />
          <div className="portrait-caption">
            <span>Aizaz Noor</span>
            <span>Lahore, Pakistan ↗</span>
          </div>
        </Reveal>
        <Reveal className="about-story">
          <p className="about-lead">
            Software engineering student.
            <br />
            Freelance developer.
            <br />
            <span>Learning by making things.</span>
          </p>
          <p>
            I'm studying Software Engineering at COMSATS University Islamabad,
            Lahore Campus. I build web applications and developer tools, and
            enjoy understanding how a system works beyond its interface.
          </p>
          <p>
            My projects take me from React and JavaFX to Python and C++. I'm
            also exploring DevOps and AI automation, one practical experiment at
            a time.
          </p>
          <div className="about-principles">
            <div>
              <span>01</span>
              <h3>Make it understandable.</h3>
              <p>Clear interfaces and code that someone else can follow.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Learn through the details.</h3>
              <p>Build, test, listen, and improve the parts that matter.</p>
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
              Résumé ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
