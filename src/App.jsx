import { useLocale } from "./hooks/useLocale";
import AmbientBackground from "./components/AmbientBackground";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import About from "./pages/About";
import TechStack from "./pages/TechStack";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
const SECTIONS = [
  { id: "home", name: "Home", Component: Hero },
  { id: "work", name: "Work", Component: Projects },
  { id: "experience", name: "Experience", Component: Experience },
  { id: "about", name: "About", Component: About },
  { id: "techstack", name: "Skills", Component: TechStack },
  { id: "certifications", name: "Credentials", Component: Certifications },
  { id: "contact", name: "Contact", Component: Contact },
];
export default function App() {
  const { t } = useLocale();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!SECTIONS.some((section) => section.id === id) && id !== "profiles")
      return;
    const frame = requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView(),
    );
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("Skip to content")}
      </a>
      <ScrollProgress />
      <Navbar />
      <AmbientBackground />
      <main id="main-content" tabIndex={-1}>
        {SECTIONS.map((section) => (
          <ErrorBoundary
            key={section.id}
            fallback={
              <section id={section.id} className="section-container">
                <p>
                  {t("{name} is temporarily unavailable.", {
                    name: t(section.name),
                  })}
                </p>
                <a href="mailto:aizaznoorkhuwaja@gmail.com">
                  {t("Email Aizaz")}
                </a>
              </section>
            }
          >
            <section.Component />
          </ErrorBoundary>
        ))}
      </main>
      <Footer />
    </>
  );
}
