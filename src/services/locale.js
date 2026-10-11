import en from "../locales/en.js";
import ur from "../locales/ur.js";
export const LANGUAGE_KEY = "portfolio-language";
export const isLanguage = (value) => value === "en" || value === "ur";
export function resolveLanguage(url, saved) {
  const requested = new URL(url, "https://portfolio.local").searchParams.get(
    "lang",
  );
  return isLanguage(requested) ? requested : isLanguage(saved) ? saved : "en";
}
export function readInitialLanguage() {
  let saved;
  try {
    saved = localStorage.getItem(LANGUAGE_KEY);
  } catch {
    /* Storage is optional. */
  }
  return resolveLanguage(window.location.href, saved);
}
export function translate(language, key, values = {}) {
  const catalogue = language === "ur" ? ur : en;
  const message = catalogue[key] ?? en[key] ?? key;
  return message.replace(/\{(\w+)\}/g, (match, name) => {
    if (!(name in values)) return match;
    // Isolate interpolated names from surrounding Urdu punctuation.
    return language === "ur"
      ? `\u2068${values[name]}\u2069`
      : String(values[name]);
  });
}
export function applyLanguage(language) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
  document.title = translate(language, "meta.title");
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", translate(language, "meta.description"));
}
