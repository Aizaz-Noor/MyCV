export default function AmbientBackground() {
  return (
    <div className="ambient-scene" aria-hidden="true">
      <div className="ambient-light ambient-light-one" />
      <div className="ambient-light ambient-light-two" />
      <div className="ambient-grid" />
      <div className="ambient-dots">
        {Array.from({ length: 16 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              animationDelay: `${i * -0.7}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
