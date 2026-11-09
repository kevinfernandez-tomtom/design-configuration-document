# Design Configuration Documents

One markdown spec per client, previewed as a paginated document you can export as PNGs.

```
Client Configs Template V1.md   the master template — edit this to change every future client
clients/                        one .md per client (your working files)
previews/                       generated preview pages — safe to delete, rebuilt any time
tools/                          the two scripts below
```

Only Node.js is needed. No install step — the rasterizer is vendored in `tools/vendor/`.

## 1. Create a client from the template

```bash
node tools/new-client.mjs "Volvo EX90" "4.2.1"
```

Writes `clients/Volvo EX90.md` with the cover line filled in, and builds its preview.
Several at once:

```bash
node tools/new-client.mjs "Volvo EX90" "BMW iX" "Audi Q6"
```

Existing files are never overwritten — pass `--force` to replace one deliberately.

## 2. Fill in the spec

Edit `clients/<Client>.md` in any editor. Replace the bracketed placeholders with real
values — both of these work:

```
- Screen Resolution [1920 * 720]
- Screen Resolution: 1920 x 720
```

Structure comes from the `(H1)`/`(H2)`/`(H3)`/`(SH)` annotations, not the indentation:
each `(H2)` becomes one exportable page. Standard markdown headings (`#`, `##`, …) and
`| Field | Value |` tables are understood too.

## 3. Rebuild previews

```bash
node tools/build-preview.mjs
```

Rebuilds the template plus every `clients/*.md`. For a single file:

```bash
node tools/build-preview.mjs "clients/Volvo EX90.md"
```

## 4. Export images

Open a file in `previews/` — double-click it, or:

```bash
open previews/
```

Each output is one self-contained HTML file (~220 KB, works offline, safe to email).
In the page:

- **Export all PNG** — every page as a numbered PNG (`00-cover.png`, `01-head-unit.png`, …)
- **PNG** / **Copy** on any single page — save it, or put it on the clipboard for Figma or Slack
- **Print / PDF** — the whole document as one PDF
- **Dark** — dark theme, which also applies to exports
- **Load .md…** — drop in a different spec without rebuilding

Exports render at 2× for crisp placement in decks.

## Changing the template

Edit `Client Configs Template V1.md` for new clients, or `tools/preview-shell.html` to
change how every preview looks, then re-run `node tools/build-preview.mjs`.
