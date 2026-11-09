// Duplicate the spec template for one or more clients.
//
//   node tools/new-client.mjs "Volvo EX90"
//   node tools/new-client.mjs "Volvo EX90" "4.2.1"
//   node tools/new-client.mjs "Volvo EX90" "BMW iX" "Audi Q6"
//
// Each name becomes clients/<Name>.md with the cover line filled in, then the
// preview is rebuilt. Existing files are never overwritten — pass --force to
// replace one deliberately.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const clientsDir = join(root, "clients");
const templatePath = join(root, "Client Configs Template V1.md");

const argv = process.argv.slice(2);
const force = argv.includes("--force");
const args = argv.filter((a) => a !== "--force");

if (args.length === 0) {
  console.error('Usage: node tools/new-client.mjs "Car Line Name" ["Release Number"]');
  console.error('       node tools/new-client.mjs "Client A" "Client B" "Client C"');
  process.exit(1);
}

if (!existsSync(templatePath)) {
  console.error(`✗ Missing template: ${templatePath}`);
  process.exit(1);
}

// Two arguments where the second looks like a version ("4.2.1", "SW23.4") mean
// one client plus its release; anything else is a list of client names.
const looksLikeRelease = (s) => /^[vV]?\d[\w.\-]*$/.test(s) || /^SW/i.test(s);
const jobs =
  args.length === 2 && looksLikeRelease(args[1])
    ? [{ carLine: args[0], release: args[1] }]
    : args.map((a) => ({ carLine: a, release: null }));

const template = readFileSync(templatePath, "utf8");
const safe = (s) => s.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ").trim();

mkdirSync(clientsDir, { recursive: true });

const created = [];
for (const { carLine, release } of jobs) {
  const file = join(clientsDir, `${safe(carLine)}.md`);
  if (existsSync(file) && !force) {
    console.error(`• skipped clients/${safe(carLine)}.md — already exists (use --force to replace)`);
    continue;
  }

  // Fill in the cover line so the preview shows a real title instead of the
  // template's placeholder fields.
  const cover = `Car Line Name: ${carLine} (H1) + Software Release Number: ${release ?? "TBD"} (H1)`;
  const body = template.replace(/^.*\(H1\).*$/m, cover);

  writeFileSync(file, body, "utf8");
  created.push(file);
  console.log(`✓ clients/${safe(carLine)}.md`);
}

if (created.length === 0) process.exit(0);

console.log("");
execFileSync(process.execPath, [join(here, "build-preview.mjs"), ...created.map((f) => `clients/${f.split("/").pop()}`)], {
  stdio: "inherit",
  cwd: root,
});
