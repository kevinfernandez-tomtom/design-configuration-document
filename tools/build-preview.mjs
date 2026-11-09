// Build self-contained preview pages from spec .md files.
//
//   node tools/build-preview.mjs                     → template + every clients/*.md
//   node tools/build-preview.mjs clients/Volvo.md    → just that one
//
// Inlines the rasterizer and the markdown so each output is one portable file
// that opens straight from the folder — no server, no network, works offline.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const clientsDir = join(root, "clients");
const outDir = join(root, "previews");

const TEMPLATE = "Client Configs Template V1.md";

// Vendored so this script never depends on an installed node_modules tree —
// it must keep working after a reinstall, or in a fresh clone.
const vendored = join(here, "vendor", "html2canvas.min.js");
const installed = join(root, "node_modules", "html2canvas", "dist", "html2canvas.min.js");
const h2cPath = existsSync(vendored) ? vendored : installed;
const shellPath = join(here, "preview-shell.html");

for (const [label, p] of [
  ["page shell", shellPath],
  ["html2canvas", h2cPath],
]) {
  if (!existsSync(p)) {
    console.error(`✗ Missing ${label}: ${p}`);
    if (label === "html2canvas") {
      console.error(`  Expected at tools/vendor/html2canvas.min.js`);
      console.error(`  Restore with: npm install html2canvas && cp node_modules/html2canvas/dist/html2canvas.min.js tools/vendor/`);
    }
    process.exit(1);
  }
}

// With no arguments, rebuild everything: the template plus every client spec.
let sources = process.argv.slice(2);
if (sources.length === 0) {
  sources = [TEMPLATE];
  if (existsSync(clientsDir)) {
    for (const f of readdirSync(clientsDir).sort()) {
      if (/\.(md|markdown|txt)$/i.test(f)) sources.push(join("clients", f));
    }
  }
}

const shell = readFileSync(shellPath, "utf8");
const h2c = readFileSync(h2cPath, "utf8");

// JSON.stringify handles quoting/escaping; also neutralise any literal
// "</script>" so inlined content cannot terminate the script block early.
const asJs = (s) => JSON.stringify(s).replace(/<\//g, "<\\/");
const kb = (n) => `${Math.round(n / 1024)} KB`;

mkdirSync(outDir, { recursive: true });

let built = 0;
for (const sourceName of sources) {
  const sourcePath = join(root, sourceName);
  if (!existsSync(sourcePath)) {
    console.error(`✗ Missing source markdown: ${sourcePath}`);
    process.exit(1);
  }

  const name = basename(sourceName);
  const stem = name.replace(/\.(md|markdown|txt)$/i, "");
  const outPath = join(outDir, `${stem} Preview.html`);

  const markdown = readFileSync(sourcePath, "utf8");
  const out = shell
    .replace("/*__HTML2CANVAS__*/", () => h2c)
    .replace('/*__MARKDOWN__*/""', () => asJs(markdown))
    .replace('/*__SOURCE_NAME__*/""', () => asJs(name));

  if (out.includes("/*__HTML2CANVAS__*/") || out.includes("/*__MARKDOWN__*/")) {
    console.error("✗ Placeholder substitution failed — shell template may have changed.");
    process.exit(1);
  }

  writeFileSync(outPath, out, "utf8");
  built++;
  console.log(`✓ previews/${basename(outPath)}  ← ${sourceName} (${kb(markdown.length)} → ${kb(out.length)})`);
}

console.log(`\n${built} preview${built === 1 ? "" : "s"} built — self-contained, offline.`);
console.log(`Open them with:\n  open previews/`);
