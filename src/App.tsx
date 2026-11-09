import React, { useState, useEffect, createContext, useContext } from "react";
import type { DesignSpec } from "./types";
import { createDefaultSpec } from "./defaultSpec";
import HeadUnitForm from "./components/HeadUnitForm";
import ClusterForm from "./components/ClusterForm";
import HudForm from "./components/HudForm";
import NavWidgetForm from "./components/NavWidgetForm";
import DecisionDocForm, { type DecisionTopic } from "./components/DecisionDocForm";
import ChangelogForm, { type ChangelogEntry } from "./components/ChangelogForm";
import MarkdownPreview from "./components/MarkdownPreview";
import { exportMarkdown } from "./exportMarkdown";

// ── Theme context ─────────────────────────────────────────────────────────────
export const ThemeContext = createContext(false);
export const useLight = () => useContext(ThemeContext);

// ── Palette ───────────────────────────────────────────────────────────────────
export const darkPalette = {
  bg: "#0f1117",
  bgHeader: "#0f1117",
  bgSidebar: "#0c0e16",
  card: "#181c27",
  card2: "#141827",
  border: "#252b3d",
  border2: "#1a1f2e",
  border3: "#353d54",
  accent: "#4a9eff",
  accentBg: "rgba(74,158,255,0.1)",
  accentBorder: "rgba(74,158,255,0.3)",
  accentBorder2: "rgba(74,158,255,0.6)",
  text: "#e8eaf0",
  textMid: "#9ba3b8",
  textMuted: "#6b7491",
  inputBg: "#181c27",
  hoverBg: "#1e2333",
  hoverBg2: "#13161f",
  accentText: "#0f1117",
  sectionAccentBorder: "rgba(74,158,255,0.2)",
  sidebarActive: "#181c27",
  sidebarHover: "#131621",
};

export const lightPalette = {
  bg: "#f4f5f7",
  bgHeader: "#ffffff",
  bgSidebar: "#f0f1f5",
  card: "#ffffff",
  card2: "#f9fafb",
  border: "#dde0e8",
  border2: "#edf0f4",
  border3: "#c8cdd8",
  accent: "#1a6fd4",
  accentBg: "rgba(26,111,212,0.08)",
  accentBorder: "rgba(26,111,212,0.3)",
  accentBorder2: "rgba(26,111,212,0.6)",
  text: "#111318",
  textMid: "#3d4460",
  textMuted: "#7480a0",
  inputBg: "#ffffff",
  hoverBg: "#f0f2f6",
  hoverBg2: "#f6f7fa",
  accentText: "#ffffff",
  sectionAccentBorder: "rgba(26,111,212,0.18)",
  sidebarActive: "#ffffff",
  sidebarHover: "#e8eaf2",
};

// ── Pages ─────────────────────────────────────────────────────────────────────
const PAGES = [
  { index: "01", title: "Head Unit" },
  { index: "02", title: "Cluster" },
  { index: "03", title: "HUD" },
  { index: "04", title: "Navigational Widget" },
  { index: "05", title: "Decision Doc" },
  { index: "06", title: "Changelog" },
  { index: "07", title: "MD Preview" },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────────
function Sidebar({
  current,
  onSelect,
  t,
}: {
  current: number;
  onSelect: (i: number) => void;
  t: typeof darkPalette;
}) {
  return (
    <nav
      style={{
        width: 220,
        flexShrink: 0,
        backgroundColor: t.bgSidebar,
        borderRight: `1px solid ${t.border}`,
        display: "flex",
        flexDirection: "column",
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 9,
          color: t.textMuted,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "0 20px 16px",
        }}
      >
        Sections
      </div>
      {PAGES.map((page, i) => {
        const active = current === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              border: "none",
              borderLeft: active ? `2px solid ${t.accent}` : "2px solid transparent",
              backgroundColor: active ? t.sidebarActive : "transparent",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.sidebarHover;
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                color: active ? t.accent : t.textMuted,
                width: 20,
                flexShrink: 0,
              }}
            >
              {page.index}
            </span>
            <span
              style={{
                fontFamily: "'Work Sans',sans-serif",
                fontSize: 12,
                fontWeight: active ? 600 : 400,
                color: active ? t.text : t.textMuted,
                letterSpacing: "0.02em",
              }}
            >
              {page.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ── Page header ───────────────────────────────────────────────────────────────
function PageHeader({
  page,
  current,
  total,
  onPrev,
  onNext,
  t,
}: {
  page: (typeof PAGES)[0];
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  t: typeof darkPalette;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingBottom: 20,
        marginBottom: 24,
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 12,
            color: t.accent,
            fontWeight: 500,
          }}
        >
          {page.index}
        </span>
        <h2
          style={{
            fontFamily: "'Work Sans',sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: t.text,
            margin: 0,
          }}
        >
          {page.title}
        </h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button
          type="button"
          onClick={onPrev}
          disabled={current === 0}
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 11,
            padding: "4px 10px",
            background: "transparent",
            border: `1px solid ${t.border}`,
            borderRadius: 2,
            color: current === 0 ? t.border3 : t.textMuted,
            cursor: current === 0 ? "default" : "pointer",
            transition: "border-color 0.1s",
          }}
        >
          ← PREV
        </button>
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            color: t.textMuted,
            padding: "0 4px",
          }}
        >
          {current + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={current === total - 1}
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 11,
            padding: "4px 10px",
            background: "transparent",
            border: `1px solid ${t.border}`,
            borderRadius: 2,
            color: current === total - 1 ? t.border3 : t.textMuted,
            cursor: current === total - 1 ? "default" : "pointer",
            transition: "border-color 0.1s",
          }}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}

// ── Main app ──────────────────────────────────────────────────────────────────
export default function App() {
  const [spec, setSpec] = useState<DesignSpec>(createDefaultSpec);
  const [isLight, setIsLight] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [decisionTopics, setDecisionTopics] = useState<DecisionTopic[]>([]);
  const [changelogEntries, setChangelogEntries] = useState<ChangelogEntry[]>([]);
  const [exportMsg, setExportMsg] = useState<"" | "md" | "json">("");

  const t = isLight ? lightPalette : darkPalette;

  useEffect(() => {
    document.body.classList.toggle("light", isLight);
  }, [isLight]);

  const set = <K extends keyof DesignSpec>(k: K, v: DesignSpec[K]) =>
    setSpec((s) => ({ ...s, [k]: v }));

  const handleExportMd = () => {
    const md = exportMarkdown(spec, decisionTopics, changelogEntries);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${spec.carLineName || "design-spec"}_${spec.softwareReleaseNumber || "v0"}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMsg("md");
    setTimeout(() => setExportMsg(""), 2000);
  };

  const handleExportJson = () => {
    const fullDoc = { ...spec, decisionDoc: { topics: decisionTopics }, changelog: { entries: changelogEntries } };
    const blob = new Blob([JSON.stringify(fullDoc, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${spec.carLineName || "design-spec"}_${spec.softwareReleaseNumber || "v0"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMsg("json");
    setTimeout(() => setExportMsg(""), 2000);
  };

  const page = PAGES[currentPage];

  return (
    <ThemeContext.Provider value={isLight}>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: t.bg, color: t.text }}>

        {/* ── Header ── */}
        <header
          style={{
            position: "sticky", top: 0, zIndex: 50,
            backgroundColor: t.bgHeader,
            borderBottom: `1px solid ${t.border}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}>
            {/* Left: title inputs inline */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: t.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", flexShrink: 0 }}>
                Design Spec
              </span>
              <span style={{ width: 1, height: 16, backgroundColor: t.border, flexShrink: 0 }} />
              <input
                style={{
                  background: "transparent", border: "none", outline: "none",
                  fontFamily: "'Work Sans',sans-serif", fontSize: 14, fontWeight: 600,
                  color: t.text, width: 180,
                  borderBottom: `1px solid transparent`,
                  transition: "border-color 0.15s",
                }}
                placeholder="Car Line Name"
                value={spec.carLineName}
                onChange={(e) => set("carLineName", e.target.value)}
                onFocus={(e) => (e.target.style.borderBottomColor = t.accent)}
                onBlur={(e) => (e.target.style.borderBottomColor = "transparent")}
              />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: t.border3 }}>/</span>
              <input
                style={{
                  background: "transparent", border: "none", outline: "none",
                  fontFamily: "'DM Mono',sans-serif", fontSize: 13, fontWeight: 500,
                  color: t.accent, width: 100,
                  borderBottom: `1px solid transparent`,
                  transition: "border-color 0.15s",
                }}
                placeholder="v0.0.0"
                value={spec.softwareReleaseNumber}
                onChange={(e) => set("softwareReleaseNumber", e.target.value)}
                onFocus={(e) => (e.target.style.borderBottomColor = t.accent)}
                onBlur={(e) => (e.target.style.borderBottomColor = "transparent")}
              />
            </div>

            {/* Right: controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Theme toggle */}
              <button
                type="button"
                onClick={() => setIsLight((v) => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "transparent", border: `1px solid ${t.border}`,
                  borderRadius: 2, padding: "5px 10px", cursor: "pointer",
                  color: t.textMuted, fontFamily: "'DM Mono',monospace", fontSize: 10,
                  letterSpacing: "0.08em",
                }}
              >
                <span style={{ fontSize: 13 }}>{isLight ? "☽" : "☀"}</span>
                {isLight ? "DARK" : "LIGHT"}
              </button>

              {/* Export MD */}
              <button
                type="button"
                onClick={handleExportMd}
                style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 10,
                  padding: "5px 12px", borderRadius: 2, cursor: "pointer",
                  border: exportMsg === "md" ? "1px solid rgba(16,185,129,0.4)" : `1px solid ${t.accentBorder}`,
                  backgroundColor: exportMsg === "md" ? "rgba(16,185,129,0.12)" : t.accentBg,
                  color: exportMsg === "md" ? "#10b981" : t.accent,
                  letterSpacing: "0.08em", transition: "all 0.15s",
                }}
              >
                {exportMsg === "md" ? "✓ EXPORTED" : "EXPORT .MD"}
              </button>

              {/* Export JSON */}
              <button
                type="button"
                onClick={handleExportJson}
                style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 10,
                  padding: "5px 12px", borderRadius: 2, cursor: "pointer",
                  border: exportMsg === "json" ? "1px solid rgba(16,185,129,0.4)" : `1px solid ${t.border}`,
                  backgroundColor: exportMsg === "json" ? "rgba(16,185,129,0.12)" : "transparent",
                  color: exportMsg === "json" ? "#10b981" : t.textMuted,
                  letterSpacing: "0.08em", transition: "all 0.15s",
                }}
              >
                {exportMsg === "json" ? "✓ EXPORTED" : "EXPORT .JSON"}
              </button>
            </div>
          </div>
        </header>

        {/* ── Body: sidebar + content ── */}
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <Sidebar current={currentPage} onSelect={setCurrentPage} t={t} />

          {/* Page content */}
          <main style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: "32px 40px" }}>
            <PageHeader
              page={page}
              current={currentPage}
              total={PAGES.length}
              onPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
              onNext={() => setCurrentPage((p) => Math.min(PAGES.length - 1, p + 1))}
              t={t}
            />

            {currentPage === 0 && <HeadUnitForm spec={spec.headUnit} onChange={(v) => set("headUnit", v)} />}
            {currentPage === 1 && <ClusterForm spec={spec.cluster} onChange={(v) => set("cluster", v)} />}
            {currentPage === 2 && <HudForm spec={spec.hud} onChange={(v) => set("hud", v)} />}
            {currentPage === 3 && <NavWidgetForm spec={spec.navWidget} onChange={(v) => set("navWidget", v)} />}
            {currentPage === 4 && <DecisionDocForm topics={decisionTopics} onChange={setDecisionTopics} />}
            {currentPage === 5 && <ChangelogForm entries={changelogEntries} onChange={setChangelogEntries} />}
            {currentPage === 6 && (
              <MarkdownPreview
                currentDoc={() => exportMarkdown(spec, decisionTopics, changelogEntries)}
                currentDocName={`${spec.carLineName || "design-spec"}_${spec.softwareReleaseNumber || "v0"}.md`}
              />
            )}
          </main>
        </div>

        {/* ── Global field styles ── */}
        <style>{`
          .field-row {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 7px 0;
            border-bottom: 1px solid ${t.border2};
          }
          .field-row:last-child { border-bottom: none; }
          .field-label {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            color: ${t.textMid};
            flex: 1;
            min-width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .field-input {
            background: ${t.inputBg};
            border: 1px solid ${t.border};
            border-radius: 2px;
            padding: 4px 8px;
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            color: ${t.text};
            outline: none;
            transition: border-color 0.1s;
          }
          .field-input:focus { border-color: ${t.accent}; }
          .field-input::placeholder { color: ${t.border3}; }
          .field-select {
            background: ${t.inputBg};
            border: 1px solid ${t.border};
            border-radius: 2px;
            padding: 4px 8px;
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            color: ${t.text};
            outline: none;
            cursor: pointer;
            min-width: 220px;
            transition: border-color 0.1s;
          }
          .field-select:focus { border-color: ${t.accent}; }
          .field-select option { background: ${t.inputBg}; color: ${t.text}; }

          .h2-section-btn { background: ${t.card} !important; }
          .h2-section-btn:hover { background: ${t.hoverBg} !important; }
          .h2-section-border { border-color: ${t.sectionAccentBorder} !important; }
          .h3-section-btn { background: ${t.card2} !important; }
          .h3-section-btn:hover { background: ${t.card} !important; }
          .sub-section-btn { background: ${t.bg} !important; }
          .sub-section-btn:hover { background: ${t.hoverBg2} !important; }
          .toggle-off { background: ${t.border} !important; }
          .bin-unselected { background: ${t.card} !important; color: ${t.textMuted} !important; border-color: ${t.border} !important; }
          .bin-unselected:hover { color: ${t.textMid} !important; border-color: ${t.border3} !important; }
          .bin-selected { background: ${t.accent} !important; color: ${t.accentText} !important; border-color: ${t.accent} !important; }
          .multi-off { background: ${t.card} !important; color: ${t.textMuted} !important; border-color: ${t.border} !important; }
          .multi-off:hover { color: ${t.textMid} !important; border-color: ${t.border3} !important; }
          .multi-on { background: ${t.accent} !important; color: ${t.accentText} !important; border-color: ${t.accent} !important; }
          .add-layout-btn { color: ${t.accent} !important; border-color: ${t.accentBorder} !important; }
          .add-layout-btn:hover { border-color: ${t.accentBorder2} !important; }
          .sub-nested-border { border-color: ${t.border} !important; }
          .sub-nested-label { color: ${t.textMuted} !important; }
          .h2-index { color: ${t.accent} !important; }
          .h2-title { color: ${t.text} !important; }
          .chevron-icon { color: ${t.textMuted} !important; }
          .sh-title { color: ${t.textMid} !important; }
          .sh-accent-faint { color: ${t.accent} !important; opacity: 0.6; }
          .accent-x { color: ${t.accent} !important; }
          .unit-label { color: ${t.textMuted} !important; }
          .toggle-true-label { color: ${t.accent} !important; }
          .toggle-false-label { color: ${t.textMuted} !important; }
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
}
