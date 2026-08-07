import { PRIORITY_COLOR } from "../data/categories";
import ProgressRing from "./ProgressRing";
import TopicRow from "./TopicRow";

export default function CategoryContent({ cat, topics, onToggle, onOpenDetail }) {
  const done = topics.filter((t) => t.status === "done").length;
  const covered = topics.filter((t) => t.status === "covered").length;
  const pct = Math.round((done / topics.length) * 100);

  return (
    <div className="dash-wrap">
      {/* header */}
      <div className="cat-header">
        <div
          style={{
            width: 52, height: 52, borderRadius: 12, background: `${cat.color}18`,
            border: `1px solid ${cat.color}30`, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 24, flexShrink: 0,
          }}
        >
          {cat.icon}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <h2 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 600, color: "#F1F5F9" }}>
              {cat.label}
            </h2>
            {cat.badge && (
              <span
                style={{
                  fontSize: 10, padding: "2px 9px", borderRadius: 99,
                  background: `${cat.color}20`, color: cat.color, fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                {cat.badge}
              </span>
            )}
            <span
              style={{
                fontSize: 10, padding: "2px 9px", borderRadius: 99,
                background: PRIORITY_COLOR[cat.priority] + "20", color: PRIORITY_COLOR[cat.priority],
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {cat.priority} priority
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#64748B" }}>
            {covered} covered · {topics.length - covered - done} to study · {done} marked done
          </div>
        </div>
        <ProgressRing pct={pct} color={cat.color} size={52} />
      </div>

      {/* topics card */}
      <div
        style={{
          background: "#161B27", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12, padding: "8px 4px", marginBottom: 18,
        }}
      >
        <div style={{ padding: "6px 12px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 6 }}>
          <span
            style={{
              fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#475569",
              textTransform: "uppercase", letterSpacing: "0.1em",
            }}
          >
            Topics — click a topic for details, click the box to mark done
          </span>
        </div>
        {topics.map((t) => (
          <TopicRow key={t.id} topic={t} onToggle={onToggle} onOpenDetail={onOpenDetail} />
        ))}
      </div>

      {/* interview question */}
      {cat.interviewQ && (
        <div
          style={{
            background: "linear-gradient(135deg,rgba(56,189,248,0.06),rgba(167,139,250,0.06))",
            border: "1px solid rgba(56,189,248,0.15)", borderRadius: 10, padding: "14px 18px", marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#38BDF8",
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8,
            }}
          >
            🎯 Common Interview Question
          </div>
          <div style={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.6, fontStyle: "italic" }}>
            "{cat.interviewQ}"
          </div>
        </div>
      )}

      {/* scenario */}
      {cat.scenario && (
        <div style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.15)", borderRadius: 10, padding: "14px 18px" }}>
          <div
            style={{
              fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#FB923C",
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8,
            }}
          >
            📋 Answer Flow
          </div>
          <div style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7 }}>{cat.scenario}</div>
        </div>
      )}
    </div>
  );
}
