import { useLocale } from "../hooks/useLocale";
export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="studio-footer">
      <div className="footer-wordmark">
        {t("LET'S BUILD")}
        <span>↗</span>
      </div>
      <div className="footer-bottom">
        <a
          href="#home"
          className="brand-symbol"
          dir="ltr"
          lang="en"
          aria-label={t("Aizaz Noor home")}
        >
          an.
        </a>
        <p dir="ltr" lang="en">
          © {new Date().getFullYear()} Aizaz Noor
        </p>
        <p>{t("Aizaz Noor / Lahore, Pakistan.")}</p>
        <a href="#home">{t("Back to top ↑")}</a>
      </div>
    </footer>
  );
}
