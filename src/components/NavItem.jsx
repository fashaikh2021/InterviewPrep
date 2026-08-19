import { useState } from "react";

export default function NavItem({ icon, label, active, color, badge, onClick, href }) {
  const [hov, setHov] = useState(false);
  const Tag = href ? "a" : "div";

  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 9, padding: "7px 16px", cursor: "pointer",
        borderLeft: `2px solid ${active ? color : "transparent"}`,
        background: active ? `${color}08` : hov ? "rgba(255,255,255,0.03)" : "transparent",
        transition: "all 0.15s",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span>
      <span
        style={{
          fontSize: 12, color: active ? "#F1F5F9" : "#64748B", flex: 1,
          fontWeight: active ? 500 : 400, lineHeight: 1.3,
        }}
      >
        {label}
      </span>
      {badge && (
        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: active ? color : "#334155" }}>
          {badge}
        </span>
      )}
    </Tag>
  );
}
