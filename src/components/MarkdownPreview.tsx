import React, { useMemo, useRef, useState } from "react";
import { useLight, darkPalette, lightPalette } from "../App";
import { renderMarkdown, extractOutline } from "../markdownRender";

// ── Rich .md preview + export ────────────────────────────────────────────────
// Open a spec document, read it as a styled page, then print it to PDF or save
// a self-contained .html copy. Print output is always light-on-white regardless
// of the app theme.

const PRINT_ROOT = "md-print-root";

export default function MarkdownPreview({
  currentDoc,
  currentDocName,
}: {
  // Lets the preview render the spec being edited in this session, not just a
  // file from disk.
  currentDoc?: () => string;
  currentDocName?: string;
}) {
  const isLight = useLight();
  const t = isLight ? lightPalette : darkPalette;

  const [source, setSource] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLDivElement>(null);

  const outline = useMemo(() => (source ? extractOutline(source) : []), [source]);
  const body = useMemo(() => (source ? renderMarkdown(source) : null), [source]);

  const loadFile = async (file: File) => {
    const text = await file.text();
    setSource(text);
    setFileName(file.name);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void loadFile(file);
  };

  const exportHtml = () => {
    const rendered = docRef.current?.innerHTML ?? "";
    const title = fileName.replace(/\.(md|markdown|txt)$/i, "") || "design-spec";
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${DOC_CSS}
body { margin:0; background:#f4f5f7; }
.md-doc { max-width: 860px; margin: 40px auto; padding: 56px 64px; background:#fff;
  border:1px solid #dde0e8; border-radius:3px; }
</style>
</head>
<body><div class="md-doc">${rendered}</div></body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const btn = (accent?: boolean): React.CSSProperties => ({
    fontFamily: "'DM Mono',monospace",
    fontSize: 10,
    padding: "5px 12px",
    borderRadius: 2,
    cursor: "pointer",
    letterSpacing: "0.08em",
    border: `1px solid ${accent ? t.accentBorder : t.border}`,
    backgroundColor: accent ? t.accentBg : "transparent",
    color: accent ? t.accent : t.textMuted,
    transition: "all 0.15s",
  });

  return (
    <div>
      {/* ── Toolbar ── */}
      <div
        className="no-print"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          paddingBottom: 16,
          marginBottom: 20,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <button type="button" style={btn(true)} onClick={() => fileInput.current?.click()}>
          OPEN .MD
        </button>
        {currentDoc && (
          <button
            type="button"
            style={btn()}
            onClick={() => {
              setSource(currentDoc());
              setFileName(currentDocName ?? "current spec");
            }}
          >
            USE CURRENT SPEC
          </button>
        )}
        <input
          ref={fileInput}
          type="file"
          accept=".md,.markdown,.txt,text/markdown,text/plain"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void loadFile(f);
            e.target.value = "";
          }}
        />
        {source && (
          <>
            <button type="button" style={btn()} onClick={() => window.print()}>
              PRINT / PDF
            </button>
            <button
              type="button"
              style={{
                ...btn(),
                borderColor: savedMsg ? "rgba(16,185,129,0.4)" : t.border,
                backgroundColor: savedMsg ? "rgba(16,185,129,0.12)" : "transparent",
                color: savedMsg ? "#10b981" : t.textMuted,
              }}
              onClick={exportHtml}
            >
              {savedMsg ? "✓ SAVED" : "EXPORT .HTML"}
            </button>
            <button
              type="button"
              style={{ ...btn(), marginLeft: "auto" }}
              onClick={() => {
                setSource("");
                setFileName("");
              }}
            >
              CLOSE
            </button>
          </>
        )}
        {fileName && (
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              color: t.textMuted,
              order: source ? 0 : 1,
            }}
          >
            {fileName}
          </span>
        )}
      </div>

      {/* ── Empty state / drop zone ── */}
      {!source && (
        <div
          className="no-print"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          style={{
            border: `1px dashed ${dragging ? t.accent : t.border3}`,
            backgroundColor: dragging ? t.accentBg : "transparent",
            borderRadius: 3,
            padding: "64px 24px",
            textAlign: "center",
            transition: "all 0.15s",
          }}
        >
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: t.textMid, marginBottom: 6 }}>
            Drop a .md file here
          </div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: t.textMuted }}>
            {currentDoc ? "or use OPEN .MD / USE CURRENT SPEC above" : "or use OPEN .MD above"}
          </div>
        </div>
      )}

      {/* ── Document ── */}
      {source && (
        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
          {outline.length > 1 && (
            <nav
              className="no-print"
              style={{
                width: 176,
                flexShrink: 0,
                position: "sticky",
                top: 0,
                maxHeight: "calc(100vh - 200px)",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 9,
                  color: t.textMuted,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Contents
              </div>
              {outline.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    lineHeight: 1.5,
                    padding: "3px 0",
                    paddingLeft: (h.level - 1) * 10,
                    color: h.level === 1 ? t.text : h.level === 2 ? t.textMid : t.textMuted,
                    textDecoration: "none",
                  }}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          )}

          <div id={PRINT_ROOT} style={{ flex: 1, minWidth: 0 }}>
            <div
              ref={docRef}
              className="md-doc"
              style={{
                backgroundColor: t.card,
                border: `1px solid ${t.border}`,
                borderRadius: 3,
                padding: "40px 44px",
              }}
            >
              {body}
            </div>
          </div>
        </div>
      )}

      {/* ── Document + print styles ── */}
      <style>{`
        .md-doc { color: ${t.text}; font-family: 'Work Sans', sans-serif; font-size: 13px; line-height: 1.65; }
        .md-doc > *:first-child { margin-top: 0; }
        .md-h { font-family: 'Work Sans', sans-serif; font-weight: 700; letter-spacing: -0.01em;
          color: ${t.text}; scroll-margin-top: 16px; }
        .md-h1 { font-size: 26px; margin: 0 0 4px; padding-bottom: 12px;
          border-bottom: 1px solid ${t.border}; }
        .md-h2 { font-size: 17px; margin: 34px 0 12px; text-transform: uppercase;
          letter-spacing: 0.06em; color: ${t.accent}; }
        .md-h3 { font-size: 13px; margin: 22px 0 8px; text-transform: uppercase;
          letter-spacing: 0.1em; color: ${t.textMid}; }
        .md-h4 { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
          margin: 18px 0 6px; text-transform: uppercase; letter-spacing: 0.18em;
          color: ${t.textMuted}; }
        .md-h5, .md-h6 { font-size: 11px; margin: 14px 0 6px; color: ${t.textMuted}; }
        .md-p { margin: 0 0 10px; color: ${t.textMid}; }
        .md-hr { border: none; border-top: 1px solid ${t.border}; margin: 28px 0; }
        .md-list { margin: 0 0 10px; padding-left: 20px; color: ${t.textMid}; }
        .md-li { margin: 2px 0; }
        .md-li .md-list { margin: 2px 0 2px; }
        .md-quote { margin: 0 0 12px; padding: 6px 0 6px 14px;
          border-left: 2px solid ${t.accentBorder}; color: ${t.textMuted}; font-style: italic; }
        .md-code { font-family: 'DM Mono', monospace; font-size: 11px;
          background: ${t.card2}; border: 1px solid ${t.border2};
          border-radius: 2px; padding: 1px 5px; }
        .md-pre { font-family: 'DM Mono', monospace; font-size: 11px; overflow-x: auto;
          background: ${t.card2}; border: 1px solid ${t.border};
          border-radius: 2px; padding: 12px 14px; margin: 0 0 12px; color: ${t.textMid}; }
        .md-pre code { background: none; border: none; padding: 0; }
        .md-link { color: ${t.accent}; text-decoration: none; }
        .md-link:hover { text-decoration: underline; }

        .md-table-wrap { overflow-x: auto; margin: 0 0 16px; }
        .md-table { border-collapse: collapse; width: 100%; font-size: 11px; }
        .md-table th, .md-table td {
          text-align: left; padding: 6px 12px;
          border-bottom: 1px solid ${t.border2}; vertical-align: top; }
        .md-table th {
          font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.14em; color: ${t.textMuted};
          border-bottom: 1px solid ${t.border}; white-space: nowrap; }
        .md-table td { font-family: 'DM Mono', monospace; color: ${t.text}; }
        .md-table td:first-child {
          color: ${t.textMid}; width: 46%; font-family: 'Work Sans', sans-serif;
          font-size: 12px; }
        .md-table tr:last-child td { border-bottom: none; }

        /* Print: white paper, black text, app chrome hidden */
        @media print {
          body * { visibility: hidden !important; }
          #${PRINT_ROOT}, #${PRINT_ROOT} * { visibility: visible !important; }
          #${PRINT_ROOT} {
            position: absolute !important; left: 0 !important; top: 0 !important;
            width: 100% !important; }
          .no-print { display: none !important; }
          .md-doc {
            background: #fff !important; border: none !important;
            padding: 0 !important; color: #111 !important; font-size: 10pt; }
          .md-doc .md-h, .md-doc .md-table td { color: #111 !important; }
          .md-doc .md-h2 { color: #1a4d8f !important; }
          .md-doc .md-h3, .md-doc .md-p, .md-doc .md-list,
          .md-doc .md-table td:first-child { color: #333 !important; }
          .md-doc .md-h4 { color: #666 !important; }
          .md-doc .md-table th { color: #666 !important; border-bottom-color: #999 !important; }
          .md-doc .md-table td { border-bottom-color: #ddd !important; }
          .md-doc .md-hr { border-top-color: #ccc !important; }
          .md-h1, .md-h2 { break-after: avoid; }
          .md-table, .md-table-wrap { break-inside: avoid; }
          @page { margin: 16mm; }
        }
      `}</style>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

// Standalone stylesheet for exported .html — light theme, no app dependency.
const DOC_CSS = `
.md-doc { color:#111318; font-family:'Work Sans',sans-serif; font-size:13px; line-height:1.65; }
.md-doc > *:first-child { margin-top:0; }
.md-h { font-weight:700; letter-spacing:-0.01em; color:#111318; }
.md-h1 { font-size:26px; margin:0 0 4px; padding-bottom:12px; border-bottom:1px solid #dde0e8; }
.md-h2 { font-size:17px; margin:34px 0 12px; text-transform:uppercase; letter-spacing:0.06em; color:#1a6fd4; }
.md-h3 { font-size:13px; margin:22px 0 8px; text-transform:uppercase; letter-spacing:0.1em; color:#3d4460; }
.md-h4 { font-family:'DM Mono',monospace; font-size:10px; font-weight:500; margin:18px 0 6px;
  text-transform:uppercase; letter-spacing:0.18em; color:#7480a0; }
.md-h5,.md-h6 { font-size:11px; margin:14px 0 6px; color:#7480a0; }
.md-p { margin:0 0 10px; color:#3d4460; }
.md-hr { border:none; border-top:1px solid #dde0e8; margin:28px 0; }
.md-list { margin:0 0 10px; padding-left:20px; color:#3d4460; }
.md-li { margin:2px 0; }
.md-li .md-list { margin:2px 0; }
.md-quote { margin:0 0 12px; padding:6px 0 6px 14px; border-left:2px solid rgba(26,111,212,0.3);
  color:#7480a0; font-style:italic; }
.md-code { font-family:'DM Mono',monospace; font-size:11px; background:#f9fafb;
  border:1px solid #edf0f4; border-radius:2px; padding:1px 5px; }
.md-pre { font-family:'DM Mono',monospace; font-size:11px; overflow-x:auto; background:#f9fafb;
  border:1px solid #dde0e8; border-radius:2px; padding:12px 14px; margin:0 0 12px; color:#3d4460; }
.md-pre code { background:none; border:none; padding:0; }
.md-link { color:#1a6fd4; text-decoration:none; }
.md-table-wrap { overflow-x:auto; margin:0 0 16px; }
.md-table { border-collapse:collapse; width:100%; font-size:11px; }
.md-table th,.md-table td { text-align:left; padding:6px 12px; border-bottom:1px solid #edf0f4; vertical-align:top; }
.md-table th { font-family:'DM Mono',monospace; font-size:9px; font-weight:500; text-transform:uppercase;
  letter-spacing:0.14em; color:#7480a0; border-bottom:1px solid #dde0e8; white-space:nowrap; }
.md-table td { font-family:'DM Mono',monospace; color:#111318; }
.md-table td:first-child { color:#3d4460; width:46%; font-family:'Work Sans',sans-serif; font-size:12px; }
.md-table tr:last-child td { border-bottom:none; }
@media print { @page { margin:16mm; } .md-doc { border:none; padding:0; } }
`;
