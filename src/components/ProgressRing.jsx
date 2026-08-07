export default function ProgressRing({ pct, color, size = 48 }) {
  const r = 18;
  const c = 2 * Math.PI * r;

  return (
    <svg width={size} height={size} viewBox="0 0 44 44" style={{ flexShrink: 0 }}>
      <circle cx={22} cy={22} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={3.5} />
      <circle
        cx={22}
        cy={22}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={3.5}
        strokeDasharray={c}
        strokeDashoffset={c - (c * pct) / 100}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x={22}
        y={26}
        textAnchor="middle"
        fill="white"
        style={{ fontSize: "10px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}
      >
        {pct}%
      </text>
    </svg>
  );
}
