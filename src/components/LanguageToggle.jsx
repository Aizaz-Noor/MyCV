import { useLocale } from "../hooks/useLocale";
export default function LanguageToggle() {
  const { language, setLanguage, t } = useLocale();
  return (
    <button
      className="language-toggle"
      type="button"
      dir="auto"
      aria-label={t(language === "en" ? "Switch to Urdu" : "Switch to English")}
      onClick={() => setLanguage(language === "en" ? "ur" : "en")}
    >
      <span lang={language === "en" ? "ur" : "en"}>
        {language === "en" ? "اردو" : "English"}
      </span>
    </button>
  );
}
