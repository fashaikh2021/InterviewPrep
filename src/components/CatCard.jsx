import { useState } from "react";
import { PRIORITY_COLOR } from "../data/categories";

export default function CatCard({ cat, done, total, pct, onClick }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#1A2235" : "#161B27",
        border: `1px solid ${hov ? cat.color + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 16 }}>{cat.icon}</span>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: "#CBD5E1", flex: 1 }}>{cat.label}</span>
        <span
          style={{
            fontSize: 10, padding: "2px 6px", borderRadius: 99,
            background: PRIORITY_COLOR[cat.priority] + "20", color: PRIORITY_COLOR[cat.priority],
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          {cat.priority}
        </span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 3, overflow: "hidden", marginBottom: 5 }}>
        <div style={{ background: cat.color, width: `${pct}%`, height: "100%", borderRadius: 99, transition: "width 0.5s" }} />
      </div>
      <div style={{ fontSize: 10, color: "#475569", fontFamily: "'JetBrains Mono',monospace" }}>
        {done}/{total} done
      </div>
    </div>
  );
}
