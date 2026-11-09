import React from "react";
import { useLight } from "../App";

export interface ChangelogEntry {
  id: string;
  changes: string;
  author: string;
  date: string;
}

interface Props {
  entries: ChangelogEntry[];
  onChange: (entries: ChangelogEntry[]) => void;
}

function newEntry(): ChangelogEntry {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yy = String(today.getFullYear()).slice(2);
  return { id: crypto.randomUUID(), changes: "", author: "", date: `${dd}.${mm}.${yy}` };
}

export default function ChangelogForm({ entries, onChange }: Props) {
  const isLight = useLight();
  const t = isLight
    ? {
        bg: "#ffffff",
        border: "#e5e8ef",
        label: "#485264",
        muted: "#99a3b5",
        inputText: "#232b32",
        inputBorder: "#dde0e8",
        addBtn: "#1a6fd4",
        addBtnBorder: "rgba(26,111,212,0.3)",
        removeBtn: "#a1a1a1",
        bulletColor: "#485264",
      }
    : {
        bg: "#0f1117",
        border: "#252b3d",
        label: "#9ba3b8",
        muted: "#6b7491",
        inputText: "#e8eaf0",
        inputBorder: "#252b3d",
        addBtn: "#4a9eff",
        addBtnBorder: "rgba(74,158,255,0.3)",
        removeBtn: "#6b7491",
        bulletColor: "#9ba3b8",
      };

  const update = (id: string, field: keyof ChangelogEntry, value: string) =>
    onChange(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));

  const add = () => onChange([...entries, newEntry()]);

  return (
    <div style={{ padding: "24px 24px 20px", backgroundColor: t.bg }}>
      {/* Entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {entries.length === 0 && (
          <p style={{ fontFamily: "'Roboto Mono',monospace", fontSize: 13, color: t.muted, fontStyle: "italic", marginBottom: 16 }}>
            No entries yet — add one below.
          </p>
        )}
        {entries.map((entry) => (
          <div key={entry.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, paddingBottom: 8 }}>
              {/* Changes (bullet list textarea) */}
              <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: t.bulletColor, fontFamily: "'Roboto Mono',monospace", fontSize: 14, lineHeight: 1.6, paddingTop: 1, flexShrink: 0 }}>•</span>
                <textarea
                  value={entry.changes}
                  onChange={(e) => update(entry.id, "changes", e.target.value)}
                  placeholder={"Describe changes made…\n• Use new lines for multiple items"}
                  rows={2}
                  style={{
                    flex: 1,
                    fontFamily: "'Roboto Mono',monospace", fontSize: 14,
                    letterSpacing: "0.5px", color: t.label, lineHeight: 1.6,
                    background: "transparent", border: "none", outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>
              {/* Author + date + remove */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0, minWidth: 140 }}>
                <input
                  value={entry.author}
                  onChange={(e) => update(entry.id, "author", e.target.value)}
                  placeholder="Author name"
                  style={{
                    fontFamily: "'Roboto Mono',monospace", fontSize: 14,
                    letterSpacing: "0.5px", color: t.label,
                    background: "transparent", border: "none",
                    borderBottom: `1px solid ${t.inputBorder}`,
                    outline: "none", textAlign: "right", width: "100%",
                    paddingBottom: 2,
                  }}
                />
                <input
                  value={entry.date}
                  onChange={(e) => update(entry.id, "date", e.target.value)}
                  placeholder="DD.MM.YY"
                  style={{
                    fontFamily: "'Roboto Mono',monospace", fontSize: 12,
                    color: t.muted,
                    background: "transparent", border: "none",
                    outline: "none", textAlign: "right", width: "100%",
                  }}
                />
                <button
                  type="button"
                  onClick={() => remove(entry.id)}
                  style={{
                    background: "transparent", border: "none", cursor: "pointer",
                    fontFamily: "'DM Mono',monospace", fontSize: 9,
                    color: t.removeBtn, letterSpacing: "0.08em", marginTop: 4,
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
            {/* Divider */}
            <div style={{ height: 1, backgroundColor: t.border, marginBottom: 12 }} />
          </div>
        ))}
      </div>

      {/* Add entry */}
      <button
        type="button"
        onClick={add}
        style={{
          marginTop: 4,
          fontFamily: "'DM Mono',monospace", fontSize: 10,
          color: t.addBtn, background: "transparent",
          border: `1px solid ${t.addBtnBorder}`,
          borderRadius: 2, padding: "5px 12px", cursor: "pointer",
          letterSpacing: "0.08em", transition: "border-color 0.15s",
        }}
      >
        + ADD ENTRY
      </button>
    </div>
  );
}
