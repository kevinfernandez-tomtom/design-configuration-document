import type { DesignSpec } from "./types";
import type { DecisionTopic } from "./components/DecisionDocForm";
import type { ChangelogEntry } from "./components/ChangelogForm";

function dim(v: { w: string; h: string }) {
  return v.w && v.h ? `${v.w} × ${v.h}` : "—";
}
function xy(v: { x: string; y: string }) {
  return v.x && v.y ? `(${v.x}, ${v.y})` : "—";
}
function val(v: string, unit = "") {
  return v ? `${v}${unit ? " " + unit : ""}` : "—";
}
function bool(v: boolean) {
  return v ? "True" : "False";
}
function enabledDisabled(v: boolean) {
  return v ? "Enabled" : "Disabled";
}

function row(label: string, value: string) {
  return `| ${label} | ${value} |`;
}
function tableHeader() {
  return `| Field | Value |\n|---|---|`;
}

export function exportMarkdown(
  spec: DesignSpec,
  topics: DecisionTopic[],
  entries: ChangelogEntry[]
): string {
  const lines: string[] = [];

  lines.push(`# ${spec.carLineName || "—"}`);
  lines.push(`## Release: ${spec.softwareReleaseNumber || "—"}`);
  lines.push("");

  // ── Head Unit ──────────────────────────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push("## Head Unit");
  lines.push("");
  lines.push("### Sizes and Dimensions");
  lines.push("");
  lines.push("#### General");
  lines.push("");
  lines.push(tableHeader());
  const hu = spec.headUnit;
  lines.push(row("Physical Dimensions", dim(hu.physicalDimensions)));
  lines.push(row("Screen Resolution", dim(hu.screenResolution)));
  lines.push(row("Header/Footer Size", dim(hu.headerFooterSize)));
  lines.push(row("DPI", val(hu.dpi, "dpi")));
  lines.push(row("Diagonal Measurement", val(hu.diagonalMeasurement, "in")));
  lines.push(row("Display FPS", val(hu.displayFps, "fps")));
  lines.push(row("Minimum Font Size", val(hu.minimumFontSize, "pt")));
  lines.push(row("Keyboard Size", dim(hu.keyboardSize)));
  lines.push("");
  lines.push("#### Display Zones");
  lines.push("");
  lines.push(tableHeader());
  lines.push(row("Projection Area", dim(hu.projectionArea)));
  lines.push(row("Map Display Area", dim(hu.mapDisplayArea)));
  lines.push(row("Map Safe Area", dim(hu.mapSafeArea)));
  lines.push(row("Content Layouts", val(hu.contentLayouts)));
  lines.push("");
  lines.push("#### Configurations and Customisations");
  lines.push("");
  lines.push(tableHeader());
  lines.push(row("Horizon Panel Elements", hu.horizonElements.join(", ") || "—"));
  lines.push(row("NIP Layout Type", hu.nipLayoutType));
  lines.push(row("ETA Layout Type", hu.etaLayoutType));
  lines.push(row("Chevron", hu.chevron));
  lines.push(row("UI Sizing Theme", val(hu.uiSizingTheme)));
  lines.push(row("Weather Button", enabledDisabled(hu.weatherButton)));
  lines.push(row("Compass", enabledDisabled(hu.compass)));
  lines.push(row("Icons", hu.icons));
  lines.push(row("Search", hu.search));
  lines.push(row("Settings", hu.settings));
  lines.push(row("Map Controls Position", hu.mapControlsPosition));
  lines.push(row("Map Controls Visibility", hu.mapControlsVisibility));
  lines.push(row("Map & UI Mode Sync", bool(hu.mapUiModeSync)));
  lines.push(row("Number of Ambiances/Themes", val(hu.numberOfAmbiances)));
  lines.push(row("Ambiance Related Changes", hu.ambianceChanges.join(", ") || "—"));
  lines.push(row("3D Buildings", enabledDisabled(hu.buildings3d)));
  lines.push(row("3D Landmarks", enabledDisabled(hu.landmarks3d)));
  lines.push("");

  // ── Cluster ────────────────────────────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push("## Cluster");
  lines.push("");
  lines.push("### Sizes and Dimensions");
  lines.push("");
  lines.push("#### General");
  lines.push("");
  lines.push(tableHeader());
  const cl = spec.cluster;
  lines.push(row("Physical Dimensions", dim(cl.physicalDimensions)));
  lines.push(row("Screen Resolution", dim(cl.screenResolution)));
  lines.push(row("Header/Footer Size", dim(cl.headerFooterSize)));
  lines.push(row("DPI", val(cl.dpi, "dpi")));
  lines.push(row("Scale Factor", val(cl.scaleFactor)));
  lines.push(row("Diagonal Measurement", val(cl.diagonalMeasurement, "in")));
  lines.push(row("Display FPS", val(cl.displayFps, "fps")));
  lines.push(row("Minimum Font Size", val(cl.minimumFontSize, "pt")));
  lines.push("");
  lines.push("#### Display Zones");
  lines.push("");
  lines.push(tableHeader());
  lines.push(row("Map Projection Area", dim(cl.mapProjectionArea)));
  lines.push(row("Map Safe Area", dim(cl.mapSafeArea)));
  lines.push(row("Number of Content Layouts", val(cl.numberOfContentLayouts)));
  lines.push("");
  cl.layouts.forEach((layout, i) => {
    lines.push(`#### Layout #${i + 1}`);
    lines.push("");
    lines.push(tableHeader());
    lines.push(row("Screen Resolution", dim(layout.screenResolution)));
    lines.push(row("Content Zone #1 Size", dim(layout.contentZone1Size)));
    lines.push(row("Content Zone #1 Positioning", xy(layout.contentZone1Pos)));
    lines.push(row("Content Zone #2 Size", dim(layout.contentZone2Size)));
    lines.push(row("Content Zone #2 Positioning", xy(layout.contentZone2Pos)));
    lines.push(row("Horizon Panel Elements", layout.horizonElements.join(", ") || "—"));
    lines.push(row("Display Map", bool(layout.displayMap)));
    lines.push(row("Display Current Street Component", bool(layout.displayCurrentStreet)));
    lines.push(row("Display Vignette", bool(layout.displayVignette)));
    if (layout.displayVignette) lines.push(row("Vignette Name", val(layout.vignetteName)));
    lines.push(row("NIP Layout Type", layout.nipLayoutType));
    lines.push(row("ETA Layout Type", layout.etaLayoutType));
    lines.push(row("Chevron", layout.chevron));
    lines.push(row("UI Sizing Theme", val(layout.uiSizingTheme)));
    lines.push(row("Individual TBT Component", enabledDisabled(layout.individualTbt)));
    if (layout.individualTbt) lines.push(row("TBT Implementation Type", layout.tbtImplementationType));
    lines.push(row("Blind Spot Camera", enabledDisabled(layout.blindSpotCamera)));
    lines.push(row("Dynamic Map Safe Area", enabledDisabled(layout.dynamicMapSafeArea)));
    lines.push("");
  });

  // ── HUD ────────────────────────────────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push("## HUD");
  lines.push("");
  lines.push("### Sizes and Dimensions");
  lines.push("");
  lines.push("#### General");
  lines.push("");
  lines.push(tableHeader());
  const hud = spec.hud;
  lines.push(row("Physical Dimensions", dim(hud.physicalDimensions)));
  lines.push(row("Screen Resolution", dim(hud.screenResolution)));
  lines.push(row("Header/Footer Size", dim(hud.headerFooterSize)));
  lines.push(row("DPI", val(hud.dpi, "dpi")));
  lines.push(row("Scale Factor", val(hud.scaleFactor)));
  lines.push(row("Diagonal Measurement", val(hud.diagonalMeasurement, "in")));
  lines.push(row("Display FPS", val(hud.displayFps, "fps")));
  lines.push(row("Minimum Font Size", val(hud.minimumFontSize, "pt")));
  lines.push("");
  lines.push("#### Display Zones");
  lines.push("");
  lines.push(tableHeader());
  lines.push(row("Map Projection Area", dim(hud.mapProjectionArea)));
  lines.push(row("Map Safe Area", dim(hud.mapSafeArea)));
  lines.push(row("Number of Content Layouts", val(hud.numberOfContentLayouts)));
  lines.push("");
  hud.layouts.forEach((layout, i) => {
    lines.push(`#### Layout #${i + 1}`);
    lines.push("");
    lines.push(tableHeader());
    lines.push(row("Screen Resolution", dim(layout.screenResolution)));
    lines.push(row("Content Zone #1 Size", dim(layout.contentZone1Size)));
    lines.push(row("Content Zone #1 Positioning", xy(layout.contentZone1Pos)));
    lines.push(row("Content Zone #2 Size", dim(layout.contentZone2Size)));
    lines.push(row("Content Zone #2 Positioning", xy(layout.contentZone2Pos)));
    lines.push(row("Horizon Panel Elements", layout.horizonElements.join(", ") || "—"));
    lines.push(row("Display Map", bool(layout.displayMap)));
    lines.push(row("Display Vignette", bool(layout.displayVignette)));
    if (layout.displayVignette) lines.push(row("Vignette Name", val(layout.vignetteName)));
    lines.push(row("NIP Layout Type", layout.nipLayoutType));
    lines.push(row("Chevron Customisation", enabledDisabled(layout.chevronCustomisation)));
    lines.push(row("UI Sizing Theme", val(layout.uiSizingTheme)));
    lines.push("");
  });

  // ── Navigational Widget ────────────────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push("## Navigational Widget");
  lines.push("");
  lines.push("### Sizes and Dimensions");
  lines.push("");
  lines.push("#### General");
  lines.push("");
  lines.push(tableHeader());
  const nw = spec.navWidget;
  lines.push(row("Number of Sizes", val(nw.numberOfSizes)));
  lines.push(row("Additional Controls", bool(nw.additionalControls)));
  if (nw.additionalControls) lines.push(row("Header/Footer Controls Size", val(nw.headerFooterControlsSize, "px")));
  lines.push("");
  nw.layouts.forEach((layout, i) => {
    lines.push(`#### Layout #${i + 1}`);
    lines.push("");
    lines.push(tableHeader());
    lines.push(row("Forced Sizing Theme", val(layout.forcedSizingTheme)));
    lines.push(row("NIP Layout Type", layout.nipLayoutType));
    lines.push(row("ETA Layout Type", layout.etaLayoutType));
    lines.push(row("Chevron Customisation", enabledDisabled(layout.chevronCustomisation)));
    lines.push(row("UI Sizing Theme", val(layout.uiSizingTheme)));
    lines.push(row("Events and Hazards", enabledDisabled(layout.eventsAndHazards)));
    lines.push(row("Suggested Destinations", enabledDisabled(layout.suggestedDestinations)));
    lines.push(row("Individual UI Theming", bool(layout.individualUiTheming)));
    lines.push(row("Individual Map Theming", bool(layout.individualMapTheming)));
    lines.push("");
  });

  // ── Decision Doc ───────────────────────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push("## Decision Doc");
  lines.push("");
  if (topics.length === 0) {
    lines.push("_No topics recorded._");
    lines.push("");
  } else {
    lines.push("**Topics**");
    lines.push("");
    topics.forEach((topic) => {
      lines.push(`### ${topic.title || "Untitled"}`);
      lines.push("");
      lines.push(topic.description || "_No description._");
      lines.push("");
    });
  }

  // ── Changelog ─────────────────────────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push("## Changelog");
  lines.push("");
  if (entries.length === 0) {
    lines.push("_No entries recorded._");
    lines.push("");
  } else {
    entries.forEach((entry) => {
      const author = entry.author || "Unknown";
      const date = entry.date || "—";
      lines.push(`### ${date} — ${author}`);
      lines.push("");
      const changes = entry.changes.trim();
      if (changes) {
        changes.split("\n").forEach((line) => {
          const clean = line.replace(/^[•\-\*]\s*/, "").trim();
          if (clean) lines.push(`- ${clean}`);
        });
      } else {
        lines.push("_No changes described._");
      }
      lines.push("");
    });
  }

  return lines.join("\n");
}
