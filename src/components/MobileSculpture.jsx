export default function MobileSculpture() {
  return (
    <div className="sculpture-fallback" aria-hidden="true">
      <svg className="mobile-sculpture" viewBox="0 0 320 320" focusable="false">
        <defs>
          <radialGradient id="mobile-orb" cx="30%" cy="24%" r="76%">
            <stop offset="0" stopColor="#f1f5f9" />
            <stop offset=".38" stopColor="#a3a8ff" />
            <stop offset=".72" stopColor="#5554c4" />
            <stop offset="1" stopColor="#171a3c" />
          </radialGradient>
          <linearGradient id="mobile-ring" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#e2e8ff" />
            <stop offset=".5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#5554c4" />
          </linearGradient>
        </defs>
        <circle cx="160" cy="160" r="70" fill="url(#mobile-orb)" />
        <g className="sculpture-rings">
          <g transform="rotate(-35 160 160)"><ellipse className="sculpture-band" cx="160" cy="160" rx="136" ry="55" /></g>
          <g transform="rotate(35 160 160)"><ellipse className="sculpture-band" cx="160" cy="160" rx="136" ry="55" /></g>
          <ellipse className="sculpture-band" cx="160" cy="160" rx="55" ry="136" />
          <circle cx="160" cy="24" r="6" fill="#f1f5f9" />
          <circle cx="274" cy="198" r="4" fill="#a3a8ff" />
        </g>
      </svg>
    </div>
  );
}
