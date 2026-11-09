import React from "react";

// ── Markdown → React renderer ────────────────────────────────────────────────
// Purpose-built for the spec documents this app produces (headings, | Field |
// Value | tables, horizontal rules, nested outlines) plus the common markdown
// around them. It emits React elements rather than HTML strings, so untrusted
// file content can never inject markup — no sanitiser needed.

interface ListItem {
  text: string;
  children: ListItem[];
  ordered: boolean;
}

type Block =
  | { kind: "heading"; level: number; text: string }
  | { kind: "para"; text: string }
  | { kind: "hr" }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "list"; ordered: boolean; items: ListItem[] }
  | { kind: "quote"; text: string }
  | { kind: "code"; text: string };

// ── Inline formatting ────────────────────────────────────────────────────────
// `_` italics require non-word boundaries so that SNAKE_CASE values like
// NORMAL_LAYOUT_WIDE — which fill these specs — are left alone.
const INLINE_RE =
  /(\*\*|__)(.+?)\1|\*(?!\s)(.+?)(?<!\s)\*|(?<![A-Za-z0-9_])_(?!\s)(.+?)(?<!\s)_(?![A-Za-z0-9_])|`([^`]+)`|\[([^\]]*)\]\(([^)\s]+)\)/g;

function safeHref(raw: string): string {
  const u = raw.trim();
  // Allow only navigational schemes; anything else (javascript:, data:) is inert.
  return /^(https?:\/\/|mailto:|#|\/|\.{1,2}\/)/i.test(u) ? u : "#";
}

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const k = `${keyPrefix}i${i++}`;
    if (m[2] !== undefined) {
      nodes.push(<strong key={k}>{inline(m[2], k)}</strong>);
    } else if (m[3] !== undefined) {
      nodes.push(<em key={k}>{inline(m[3], k)}</em>);
    } else if (m[4] !== undefined) {
      nodes.push(<em key={k}>{inline(m[4], k)}</em>);
    } else if (m[5] !== undefined) {
      nodes.push(
        <code key={k} className="md-code">
          {m[5]}
        </code>,
      );
    } else {
      nodes.push(
        <a key={k} className="md-link" href={safeHref(m[7])} target="_blank" rel="noreferrer noopener">
          {m[6] || m[7]}
        </a>,
      );
    }
    last = INLINE_RE.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|?\s*:?-{1,}:?\s*(\|\s*:?-{1,}:?\s*)*\|?\s*$/.test(line) && line.includes("-");
}

// One tab, or two spaces, is one level of nesting.
function indentLevel(raw: string): number {
  const ws = raw.match(/^[\t ]*/)?.[0] ?? "";
  let level = 0;
  let spaces = 0;
  for (const ch of ws) {
    if (ch === "\t") {
      level += 1;
      spaces = 0;
    } else {
      spaces += 1;
      if (spaces === 2) {
        level += 1;
        spaces = 0;
      }
    }
  }
  return level;
}

// Build a nested tree from a flat run of (level, text) list entries.
function nestItems(flat: { level: number; text: string; ordered: boolean }[]): ListItem[] {
  const roots: ListItem[] = [];
  const stack: ListItem[] = [];
  const levels: number[] = [];
  for (const entry of flat) {
    const node: ListItem = { text: entry.text, children: [], ordered: entry.ordered };
    while (levels.length > 0 && entry.level <= levels[levels.length - 1]) {
      stack.pop();
      levels.pop();
    }
    if (stack.length === 0) roots.push(node);
    else stack[stack.length - 1].children.push(node);
    stack.push(node);
    levels.push(entry.level);
  }
  return roots;
}

// ── Block parsing ────────────────────────────────────────────────────────────
function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (line === "") {
      i++;
      continue;
    }

    // Fenced code
    const fence = line.match(/^(```|~~~)/);
    if (fence) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(fence[1])) {
        body.push(lines[i]);
        i++;
      }
      i++; // closing fence
      blocks.push({ kind: "code", text: body.join("\n") });
      continue;
    }

    // Horizontal rule — checked before tables so `---` isn't read as a separator
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      blocks.push({ kind: "hr" });
      i++;
      continue;
    }

    // ATX heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push({ kind: "heading", level: heading[1].length, text: heading[2].trim() });
      i++;
      continue;
    }

    // Table: a pipe row followed by a separator row
    if (line.startsWith("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ kind: "table", head, rows });
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        body.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ kind: "quote", text: body.join(" ") });
      continue;
    }

    // Lists (possibly nested via indentation)
    const bullet = line.match(/^([-*+]|\d+[.)])\s+(.*)$/);
    if (bullet) {
      const flat: { level: number; text: string; ordered: boolean }[] = [];
      const ordered = /^\d/.test(bullet[1]);
      while (i < lines.length) {
        const l = lines[i];
        if (l.trim() === "") {
          // A blank line ends the list unless the next line continues it.
          const next = lines[i + 1];
          if (next === undefined || !/^[\t ]*([-*+]|\d+[.)])\s+/.test(next)) break;
          i++;
          continue;
        }
        const b = l.trim().match(/^([-*+]|\d+[.)])\s+(.*)$/);
        if (!b) break;
        flat.push({ level: indentLevel(l), text: b[2], ordered: /^\d/.test(b[1]) });
        i++;
      }
      blocks.push({ kind: "list", ordered, items: nestItems(flat) });
      continue;
    }

    // Paragraph — consume until a blank line or the start of another block
    const body: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      const t = l.trim();
      if (
        t === "" ||
        /^(#{1,6})\s+/.test(t) ||
        /^(-{3,}|\*{3,}|_{3,})$/.test(t) ||
        t.startsWith("|") ||
        t.startsWith(">") ||
        /^(```|~~~)/.test(t) ||
        /^([-*+]|\d+[.)])\s+/.test(t)
      ) {
        break;
      }
      body.push(t);
      i++;
    }
    blocks.push({ kind: "para", text: body.join(" ") });
  }

  return blocks;
}

// ── Heading slugs ────────────────────────────────────────────────────────────
// renderMarkdown and extractOutline both walk parseBlocks output in the same
// order, so an identical slugger in each yields matching ids to anchor against.
function makeSlugger() {
  const seen = new Map<string, number>();
  return (text: string): string => {
    const base =
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  };
}

// ── Rendering ────────────────────────────────────────────────────────────────
function renderItems(items: ListItem[], key: string): React.ReactNode {
  if (items.length === 0) return null;
  const Tag = items[0].ordered ? "ol" : "ul";
  return (
    <Tag className="md-list">
      {items.map((it, n) => (
        <li key={`${key}-${n}`} className="md-li">
          {inline(it.text, `${key}-${n}`)}
          {renderItems(it.children, `${key}-${n}c`)}
        </li>
      ))}
    </Tag>
  );
}

export function renderMarkdown(src: string): React.ReactNode {
  const blocks = parseBlocks(src);
  const slug = makeSlugger();
  return blocks.map((b, n) => {
    const key = `b${n}`;
    switch (b.kind) {
      case "heading": {
        const level = Math.min(b.level, 6);
        const Tag = `h${level}` as "h1";
        const id = level <= 3 ? slug(b.text) : undefined;
        return (
          <Tag key={key} id={id} className={`md-h md-h${level}`}>
            {inline(b.text, key)}
          </Tag>
        );
      }
      case "hr":
        return <hr key={key} className="md-hr" />;
      case "code":
        return (
          <pre key={key} className="md-pre">
            <code>{b.text}</code>
          </pre>
        );
      case "quote":
        return (
          <blockquote key={key} className="md-quote">
            {inline(b.text, key)}
          </blockquote>
        );
      case "table":
        return (
          <div key={key} className="md-table-wrap">
            <table className="md-table">
              <thead>
                <tr>
                  {b.head.map((h, c) => (
                    <th key={`${key}h${c}`}>{inline(h, `${key}h${c}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, rn) => (
                  <tr key={`${key}r${rn}`}>
                    {b.head.map((_, c) => (
                      <td key={`${key}r${rn}c${c}`}>{inline(r[c] ?? "", `${key}r${rn}c${c}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "list":
        return <React.Fragment key={key}>{renderItems(b.items, key)}</React.Fragment>;
      case "para":
        return (
          <p key={key} className="md-p">
            {inline(b.text, key)}
          </p>
        );
    }
  });
}

// ── Outline extraction (for the preview's contents rail) ─────────────────────
export interface OutlineEntry {
  level: number;
  text: string;
  id: string;
}

export function extractOutline(src: string): OutlineEntry[] {
  const out: OutlineEntry[] = [];
  const slug = makeSlugger();
  parseBlocks(src).forEach((b) => {
    if (b.kind !== "heading" || b.level > 3) return;
    out.push({ level: b.level, text: b.text, id: slug(b.text) });
  });
  return out;
}
