export default function Footer() {
  return (
    <footer className="studio-footer">
      <div className="footer-wordmark">
        LET'S BUILD<span>↗</span>
      </div>
      <div className="footer-bottom">
        <a href="#home" className="brand-symbol" aria-label="Aizaz Noor home">
          an.
        </a>
        <p>© {new Date().getFullYear()} Aizaz Noor</p>
        <p>Made with curiosity, in Lahore.</p>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
