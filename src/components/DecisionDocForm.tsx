import React, { useState } from "react";
import { useLight } from "../App";

export interface DecisionTopic {
  id: string;
  title: string;
  description: string;
}

interface Props {
  topics: DecisionTopic[];
  onChange: (topics: DecisionTopic[]) => void;
}

function newTopic(): DecisionTopic {
  return { id: crypto.randomUUID(), title: "", description: "" };
}

export default function DecisionDocForm({ topics, onChange }: Props) {
  const isLight = useLight();
  const t = isLight
    ? {
        bg: "#ffffff",
        border: "#e5e8ef",
        heading: "#232b32",
        label: "#485264",
        muted: "#a1a1a1",
        input: "#ffffff",
        inputBorder: "#dde0e8",
        inputText: "#232b32",
        addBtn: "#1a6fd4",
        addBtnBorder: "rgba(26,111,212,0.3)",
        removeBtn: "#a1a1a1",
      }
    : {
        bg: "#0f1117",
        border: "#252b3d",
        heading: "#e8eaf0",
        label: "#9ba3b8",
        muted: "#6b7491",
        input: "#181c27",
        inputBorder: "#252b3d",
        inputText: "#e8eaf0",
        addBtn: "#4a9eff",
        addBtnBorder: "rgba(74,158,255,0.3)",
        removeBtn: "#6b7491",
      };

  const update = (id: string, field: keyof DecisionTopic, value: string) =>
    onChange(topics.map((t) => (t.id === id ? { ...t, [field]: value } : t)));

  const remove = (id: string) => onChange(topics.filter((t) => t.id !== id));

  const add = () => onChange([...topics, newTopic()]);

  return (
    <div style={{ padding: "24px 24px 20px", backgroundColor: t.bg }}>
      {/* Topics header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingBottom: 10, marginBottom: 4,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <span style={{
          fontFamily: "'Roboto Mono', monospace", fontWeight: 700,
          fontSize: 14, letterSpacing: "0.5px", color: t.label,
        }}>
          Topics
        </span>
      </div>

      {/* Topic rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
        {topics.length === 0 && (
          <p style={{ fontFamily: "'Roboto Mono',monospace", fontSize: 13, color: t.muted, fontStyle: "italic" }}>
            No topics yet — add one below.
          </p>
        )}
        {topics.map((topic) => (
          <div key={topic.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                value={topic.title}
                onChange={(e) => update(topic.id, "title", e.target.value)}
                placeholder="Topic title…"
                style={{
                  flex: 1,
                  fontFamily: "'Roboto Mono',monospace", fontSize: 14,
                  letterSpacing: "0.5px", color: t.inputText,
                  background: "transparent", border: "none", outline: "none",
                  borderBottom: `1px solid ${t.inputBorder}`,
                  paddingBottom: 4,
                }}
              />
              <button
                type="button"
                onClick={() => remove(topic.id)}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  fontFamily: "'DM Mono',monospace", fontSize: 9,
                  color: t.removeBtn, letterSpacing: "0.08em", padding: "0 2px",
                  flexShrink: 0,
                }}
              >
                REMOVE
              </button>
            </div>
            {/* Divider */}
            <div style={{ height: 1, backgroundColor: t.border, width: "100%" }} />
            {/* Description */}
            <textarea
              value={topic.description}
              onChange={(e) => update(topic.id, "description", e.target.value)}
              placeholder="Describe the decision…"
              rows={3}
              style={{
                fontFamily: "'Roboto Mono',monospace", fontSize: 13,
                letterSpacing: "0.5px", color: t.muted, lineHeight: 1.6,
                background: "transparent", border: "none", outline: "none",
                resize: "vertical", width: "100%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Add topic */}
      <button
        type="button"
        onClick={add}
        style={{
          marginTop: 16,
          fontFamily: "'DM Mono',monospace", fontSize: 10,
          color: t.addBtn, background: "transparent",
          border: `1px solid ${t.addBtnBorder}`,
          borderRadius: 2, padding: "5px 12px", cursor: "pointer",
          letterSpacing: "0.08em", transition: "border-color 0.15s",
        }}
      >
        + ADD TOPIC
      </button>
    </div>
  );
}
