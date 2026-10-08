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
    return (
      <main className="fatal-error">
        <p className="eyebrow">Aizaz Noor / Portfolio</p>
        <h1>The page could not load.</h1>
        <p>Please try again. You can also get in touch directly.</p>
        <button
          className="studio-button"
          type="button"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
        <a href="mailto:aizaznoorkhuwaja@gmail.com">Email Aizaz ↗</a>
        <a href="/resume.pdf">View résumé ↗</a>
      </main>
    );
  }
}
