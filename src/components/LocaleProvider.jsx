import { useCallback, useEffect, useMemo, useState } from "react";
import { LocaleContext } from "../context/LocaleContext";
import {
  applyLanguage,
  isLanguage,
  LANGUAGE_KEY,
  readInitialLanguage,
  translate,
} from "../services/locale";
export default function LocaleProvider({ children }) {
  const [language, setCurrent] = useState(readInitialLanguage);
  const setLanguage = useCallback((next) => {
    if (!isLanguage(next)) return;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url);
    applyLanguage(next);
    setCurrent(next);
    try {
      localStorage.setItem(LANGUAGE_KEY, next);
    } catch {
      /* Storage is optional. */
    }
  }, []);
  useEffect(() => {
    applyLanguage(language);
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      /* Storage is optional. */
    }
  }, [language]);
  useEffect(() => {
    const update = () => {
      const next = readInitialLanguage();
      applyLanguage(next);
      setCurrent(next);
    };
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key, values) => translate(language, key, values),
    }),
    [language, setLanguage],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
