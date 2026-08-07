import { CATEGORIES } from "../data/categories";
import NavItem from "./NavItem";

export default function Sidebar({ sel, setSel, topicState, totalDone, allTopicsCount, overallPct }) {
  return (
    <div
      style={{
        width: 232, flexShrink: 0, background: "#161B27",
        borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
      }}
    >
      {/* logo */}
      <div style={{ padding: "18px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 600, color: "#38BDF8", marginBottom: 2 }}>
          .NET Lead
        </div>
        <div style={{ fontSize: 11, color: "#475569" }}>Interview Prep · HAMBS</div>
      </div>

      {/* progress */}
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 4, overflow: "hidden" }}>
            <div style={{ background: "#38BDF8", width: `${overallPct}%`, height: "100%", borderRadius: 99, transition: "width 0.5s" }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#38BDF8", flexShrink: 0 }}>
            {overallPct}%
          </span>
        </div>
        <div style={{ fontSize: 10, color: "#475569" }}>
          {totalDone}/{allTopicsCount} done
        </div>
      </div>

      {/* nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
        <NavItem icon="📊" label="Dashboard" active={!sel} color="#38BDF8" onClick={() => setSel(null)} />
        <div
          style={{
            padding: "10px 16px 3px", fontSize: 10, fontFamily: "'JetBrains Mono',monospace",
            color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em",
          }}
        >
          Categories
        </div>
        {CATEGORIES.map((cat) => {
          const ts = topicState[cat.id];
          const d = ts.filter((t) => t.status === "done").length;
          return (
            <NavItem
              key={cat.id}
              icon={cat.icon}
              label={cat.label}
              active={sel === cat.id}
              color={cat.color}
              badge={`${d}/${ts.length}`}
              onClick={() => setSel(cat.id)}
            />
          );
        })}
      </nav>

      <div style={{ padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 10, color: "#334155" }}>Click category to explore topics</div>
      </div>
    </div>
  );
}
