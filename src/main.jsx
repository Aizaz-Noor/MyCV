import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./ios-theme.css";
import "./locale.css";
import LocaleProvider from "./components/LocaleProvider";
import { applyLanguage, readInitialLanguage } from "./services/locale";
import App from "./App.jsx";
import MotionProvider from "./components/MotionProvider.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

applyLanguage(readInitialLanguage());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocaleProvider>
      <ErrorBoundary>
        <MotionProvider>
          <App />
        </MotionProvider>
      </ErrorBoundary>
    </LocaleProvider>
  </StrictMode>,
);
