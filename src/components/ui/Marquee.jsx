// Infinite horizontal text strip (pure CSS animation).
export default function Marquee({ items }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>
            {t}
            <i className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
