import { CATEGORIES, DAY_PLAN } from "../data/categories";
import ProgressRing from "./ProgressRing";
import CatCard from "./CatCard";

export default function Dashboard({ topics, onSelect }) {
  const all = Object.values(topics).flat();
  const done = all.filter((t) => t.status === "done").length;
  const pct = Math.round((done / all.length) * 100);

  return (
    <div className="dash-wrap">
      {/* hero */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#38BDF8",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8,
          }}
        >
          Lead .NET Developer · Interview Prep
        </div>
        <h1 className="dash-title" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 26, fontWeight: 600, color: "#F1F5F9", marginBottom: 6, lineHeight: 1.2 }}>
          Your study dashboard
        </h1>
        <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
          {all.length} topics across {CATEGORIES.length} categories. Tap any topic to track progress.
        </p>
      </div>

      {/* progress bar */}
      <div
        style={{
          background: "#161B27", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
          padding: "18px 22px", marginBottom: 20, display: "flex", alignItems: "center", gap: 18,
        }}
      >
        <ProgressRing pct={pct} color="#38BDF8" size={56} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 6 }}>Overall progress</div>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 5, overflow: "hidden" }}>
            <div style={{ background: "#38BDF8", width: `${pct}%`, height: "100%", borderRadius: 99, transition: "width 0.5s" }} />
          </div>
          <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
            {done} of {all.length} topics marked done
          </div>
        </div>
      </div>

      {/* category grid */}
      <div className="cat-grid">
        {CATEGORIES.map((cat) => {
          const ts = topics[cat.id];
          const d = ts.filter((t) => t.status === "done").length;
          const p = Math.round((d / ts.length) * 100);
          return (
            <CatCard key={cat.id} cat={cat} done={d} total={ts.length} pct={p} onClick={() => onSelect(cat.id)} />
          );
        })}
      </div>

      {/* day plan */}
      <div
        style={{
          fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#475569",
          textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10,
        }}
      >
        📅 Study Plan Before Wednesday
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {DAY_PLAN.map((d) => (
          <div
            key={d.day}
            style={{
              background: "#161B27", borderLeft: `3px solid ${d.color}`,
              border: `1px solid ${d.color}20`, borderRadius: 10, padding: "12px 16px",
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 600, color: d.color, marginBottom: 7 }}>
              {d.day}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 3 }}>
              {d.items.map((item, i) => (
                <li key={i} style={{ fontSize: 12.5, color: "#94A3B8", paddingLeft: 14, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: d.color }}>›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
