import { useState } from "react";
import { STATUS_META } from "../data/categories";

export default function TopicRow({ topic, onToggle, onOpenDetail }) {
  const m = STATUS_META[topic.status];
  const [hov, setHov] = useState(false);
  const isDone = topic.status === "done";

  return (
    <div
      className="topic-row"
      onClick={() => onOpenDetail(topic)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : isDone ? "rgba(56,189,248,0.03)" : "transparent",
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle(topic.id);
        }}
        title={isDone ? "Mark as not done" : "Mark as done"}
        style={{
          width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${m.dot}`, flexShrink: 0, marginTop: 2,
          background: isDone ? m.dot : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
        }}
      >
        {isDone && <span style={{ color: "#0E1117", fontSize: 11, fontWeight: 700 }}>✓</span>}
      </div>
      <span
        style={{
          flex: 1, fontSize: 13.5, lineHeight: 1.5,
          color: isDone ? "#475569" : "#CBD5E1",
          textDecoration: isDone ? "line-through" : "none",
        }}
      >
        {topic.text}
      </span>
      <span
        className="topic-badge"
        style={{
          fontSize: 10, padding: "2px 8px", borderRadius: 99,
          background: m.bg, color: m.color, whiteSpace: "nowrap", flexShrink: 0,
          fontFamily: "'JetBrains Mono',monospace", fontWeight: 500,
        }}
      >
        {m.label}
      </span>
    </div>
  );
}
