import React, { useState } from "react";
import { useLight } from "../App";

export function H2Section({
  title,
  index,
  children,
}: {
  title: string;
  index: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const isLight = useLight();
  return (
    <div style={{ marginBottom: 1 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h2-section-btn"
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.1s" }}
      >
        <span className="h2-index mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500, width: 24 }}>{index}</span>
        <span className="h2-title" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", flex: 1 }}>{title}</span>
        <span className="chevron-icon mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▶</span>
      </button>
      {open && (
        <div className="h2-section-border" style={{ borderLeft: "2px solid", marginLeft: 24 }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function H3Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 1 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h3-section-btn"
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.1s" }}
      >
        <span className="sh-title" style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", flex: 1 }}>{title}</span>
        <span className="chevron-icon mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▶</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 1 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="sub-section-btn"
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "8px 24px", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.1s" }}
      >
        <span className="sh-accent-faint mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", flex: 1 }}>{title}</span>
        <span className="chevron-icon mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, opacity: 0.6, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▶</span>
      </button>
      {open && <div style={{ padding: "0 24px 12px" }}>{children}</div>}
    </div>
  );
}
