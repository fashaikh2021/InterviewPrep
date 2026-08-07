import { useEffect } from "react";
import { STATUS_META } from "../data/categories";
import { TOPIC_DETAILS, TOPIC_CODE } from "../data/topicDetails";

export default function TopicDetailModal({ topic, catColor, catLabel, onClose, onToggle }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!topic) return null;

  const m = STATUS_META[topic.status];
  const isDone = topic.status === "done";
  const detail = TOPIC_DETAILS[topic.id];
  const code = TOPIC_CODE[topic.id];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(4,7,13,0.72)",
        backdropFilter: "blur(2px)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 1000, padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#161B27", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14, maxWidth: 560, width: "100%", maxHeight: "80vh",
          overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          animation: "modalIn 0.15s ease-out",
        }}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(6px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* header */}
        <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div style={{ flex: 1 }}>
              {catLabel && (
                <div
                  style={{
                    fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: catColor || "#38BDF8",
                    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6,
                  }}
                >
                  {catLabel}
                </div>
              )}
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "#F1F5F9", lineHeight: 1.4 }}>
                {topic.text}
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 7,
                width: 28, height: 28, color: "#94A3B8", cursor: "pointer", fontSize: 15,
                flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>
          <span
            style={{
              display: "inline-block", marginTop: 10, fontSize: 10, padding: "2px 8px", borderRadius: 99,
              background: m.bg, color: m.color, fontFamily: "'JetBrains Mono',monospace", fontWeight: 500,
            }}
          >
            {m.label}
          </span>
        </div>

        {/* body */}
        <div style={{ padding: "18px 22px" }}>
          <div
            style={{
              fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#475569",
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10,
            }}
          >
            💡 What to know
          </div>
          <p style={{ fontSize: 13.5, color: "#CBD5E1", lineHeight: 1.75 }}>
            {detail || "No notes yet for this topic — add your own study notes here once you've reviewed it."}
          </p>

          {code && (
            <>
              <div
                style={{
                  fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#475569",
                  textTransform: "uppercase", letterSpacing: "0.1em", margin: "18px 0 10px",
                }}
              >
                {"</>"} C# example
              </div>
              <pre
                style={{
                  margin: 0, padding: "14px 16px", borderRadius: 8,
                  background: "#0B0F17", border: "1px solid rgba(255,255,255,0.06)",
                  overflowX: "auto",
                }}
              >
                <code
                  style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5,
                    color: "#E2E8F0", lineHeight: 1.6, whiteSpace: "pre",
                  }}
                >
                  {code}
                </code>
              </pre>
            </>
          )}
        </div>

        {/* footer */}
        <div
          style={{
            padding: "14px 22px 20px", display: "flex", gap: 10,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={() => onToggle(topic.id)}
            style={{
              flex: 1, padding: "10px 14px", borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
              border: `1px solid ${isDone ? "rgba(255,255,255,0.12)" : "#38BDF8"}`,
              background: isDone ? "transparent" : "rgba(56,189,248,0.12)",
              color: isDone ? "#94A3B8" : "#38BDF8",
            }}
          >
            {isDone ? "Mark as not done" : "✓ Mark as done"}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px", borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontFamily: "'JetBrains Mono',monospace",
              border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#94A3B8",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
