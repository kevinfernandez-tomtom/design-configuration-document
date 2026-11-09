import React from "react";

// ── Dimension input (W × H) ──────────────────────────────────────────────────
export function DimInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { w: string; h: string };
  onChange: (v: { w: string; h: string }) => void;
}) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <input className="field-input" style={{ width: 72 }} type="text" placeholder="W" value={value.w} onChange={(e) => onChange({ ...value, w: e.target.value })} />
        <span className="accent-x mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 500, padding: "0 2px" }}>×</span>
        <input className="field-input" style={{ width: 72 }} type="text" placeholder="H" value={value.h} onChange={(e) => onChange({ ...value, h: e.target.value })} />
        <span className="unit-label mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, marginLeft: 4 }}>px</span>
      </div>
    </div>
  );
}

// ── XY coordinate input ──────────────────────────────────────────────────────
export function XYInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { x: string; y: string };
  onChange: (v: { x: string; y: string }) => void;
}) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span className="unit-label mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 10 }}>X</span>
        <input className="field-input" style={{ width: 72 }} type="text" placeholder="0" value={value.x} onChange={(e) => onChange({ ...value, x: e.target.value })} />
        <span className="unit-label mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, marginLeft: 4 }}>Y</span>
        <input className="field-input" style={{ width: 72 }} type="text" placeholder="0" value={value.y} onChange={(e) => onChange({ ...value, y: e.target.value })} />
      </div>
    </div>
  );
}

// ── Single number input ──────────────────────────────────────────────────────
export function NumInput({
  label,
  value,
  onChange,
  unit,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
}) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <input className="field-input" style={{ width: 100 }} type="text" placeholder="—" value={value} onChange={(e) => onChange(e.target.value)} />
        {unit && <span className="unit-label mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );
}

// ── Text input ──────────────────────────────────────────────────────────────
export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <input className="field-input" style={{ width: 180 }} type="text" placeholder={placeholder ?? "—"} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

// ── Toggle (true / false) ────────────────────────────────────────────────────
export function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        style={{
          position: "relative", display: "inline-flex", height: 20, width: 36,
          alignItems: "center", borderRadius: 9999, border: "none", cursor: "pointer",
          backgroundColor: value ? "var(--toggle-on, #4a9eff)" : undefined,
          transition: "background-color 0.15s",
          outline: "none",
          flexShrink: 0,
        }}
        className={value ? "" : "toggle-off"}
      >
        <span style={{
          display: "inline-block", height: 14, width: 14, borderRadius: 9999,
          backgroundColor: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          transform: value ? "translateX(19px)" : "translateX(3px)",
          transition: "transform 0.15s",
        }} />
      </button>
      <span className={value ? "toggle-true-label" : "toggle-false-label"} style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, marginLeft: 8 }}>
        {value ? "TRUE" : "FALSE"}
      </span>
    </div>
  );
}

// ── Binary select ────────────────────────────────────────────────────────────
export function BinarySelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string];
  onChange: (v: string) => void;
}) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <div style={{ display: "flex" }}>
        {options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={value === opt ? "bin-selected" : "bin-unselected"}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10,
              padding: "4px 10px", border: "1px solid",
              borderRadius: i === 0 ? "2px 0 0 2px" : "0 2px 2px 0",
              cursor: "pointer", transition: "all 0.1s",
              letterSpacing: "0.06em",
            }}
          >
            {opt.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Dropdown select ──────────────────────────────────────────────────────────
export function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <select className="field-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

// ── Multi-checkbox pill group ────────────────────────────────────────────────
export function MultiCheckbox<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T[];
  onChange: (v: T[]) => void;
}) {
  const toggle = (opt: T) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  return (
    <div className="field-row" style={{ alignItems: "flex-start" }}>
      <label className="field-label" style={{ paddingTop: 2 }}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={value.includes(opt) ? "multi-on" : "multi-off"}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10,
              padding: "3px 10px", border: "1px solid",
              borderRadius: 2, cursor: "pointer", transition: "all 0.1s",
              letterSpacing: "0.06em",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Enabled/Disabled ─────────────────────────────────────────────────────────
export function EnabledDisabled({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <BinarySelect
      label={label}
      value={value ? "Enabled" : "Disabled"}
      options={["Enabled", "Disabled"]}
      onChange={(v) => onChange(v === "Enabled")}
    />
  );
}
