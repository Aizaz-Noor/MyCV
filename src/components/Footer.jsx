export default function Footer() {
  return (
    <footer className="studio-footer">
      <div className="footer-wordmark">
        {"LET'S BUILD"}
      </div>
      <div className="footer-bottom">
        <a
          href="#home"
          className="brand-symbol"
          dir="ltr"
          lang="en"
          aria-label={"Aizaz Noor home"}
        >
          an.
        </a>
        <p dir="ltr" lang="en">
          © {new Date().getFullYear()} Aizaz Noor
        </p>
        <p>{"Aizaz Noor / Lahore, Pakistan."}</p>
        <a href="#home">{"Back to top ↑"}</a>
      </div>
    </footer>
  );
}
