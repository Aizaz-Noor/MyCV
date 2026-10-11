import { useLocale } from "../hooks/useLocale";
import LanguageToggle from "./LanguageToggle";
import React from "react";
export default class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error("Portfolio section failed:", error);
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    if ("fallback" in this.props) return this.props.fallback;
    return <FatalError />;
  }
}

function FatalError() {
  const { t } = useLocale();
  return (
    <main className="fatal-error">
      <LanguageToggle />
      <p className="eyebrow">{t("Aizaz Noor / Portfolio")}</p>
      <h1>{t("The page could not load.")}</h1>
      <p>{t("Please try again. You can also get in touch directly.")}</p>
      <button
        className="studio-button"
        type="button"
        onClick={() => window.location.reload()}
      >
        {t("Reload page")}
      </button>
      <a href="mailto:aizaznoorkhuwaja@gmail.com">{t("Email Aizaz ↗")}</a>
      <a href="/resume.pdf">{t("View résumé ↗")}</a>
    </main>
  );
}
