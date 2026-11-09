import React from "react";
import type { HudSpec, HudLayout } from "../types";
import { H3Section, SubSection } from "./Section";
import {
  DimInput,
  XYInput,
  NumInput,
  Toggle,
  SelectInput,
  MultiCheckbox,
  EnabledDisabled,
  TextInput,
} from "./FormFields";
import { emptyHudLayout } from "../defaultSpec";

const NIP_OPTIONS = [
  "NORMAL_LAYOUT",
  "LANDSCAPE_MINIMAL",
  "LANDSCAPE_MEDIUM",
  "LANDSCAPE_MAXIMAL",
  "PORTRAIT_MINIMAL",
  "PORTRAIT_MEDIUM",
  "PORTRAIT_MAXIMAL",
] as const;

function HudLayoutForm({
  layout,
  index,
  onChange,
}: {
  layout: HudLayout;
  index: number;
  onChange: (l: HudLayout) => void;
}) {
  const set = <K extends keyof HudLayout>(k: K, v: HudLayout[K]) =>
    onChange({ ...layout, [k]: v });

  return (
    <SubSection title={`Layout #${index + 1}`}>
      <DimInput label="Screen Resolution" value={layout.screenResolution} onChange={(v) => set("screenResolution", v)} />
      <DimInput label="Content Zone #1 Size" value={layout.contentZone1Size} onChange={(v) => set("contentZone1Size", v)} />
      <XYInput label="Content Zone #1 Positioning" value={layout.contentZone1Pos} onChange={(v) => set("contentZone1Pos", v)} />
      <DimInput label="Content Zone #2 Size" value={layout.contentZone2Size} onChange={(v) => set("contentZone2Size", v)} />
      <XYInput label="Content Zone #2 Positioning" value={layout.contentZone2Pos} onChange={(v) => set("contentZone2Pos", v)} />

      <div className="sub-nested-border" style={{ paddingLeft: 12, borderLeft: "1px solid", margin: "8px 0" }}>
        <div className="sub-nested-label mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4, paddingTop: 4 }}>Configurations</div>
        <MultiCheckbox
          label="Horizon Panel Elements"
          options={["SLG", "CMP"]}
          value={layout.horizonElements}
          onChange={(v) => set("horizonElements", v)}
        />
        <Toggle label="Display Map" value={layout.displayMap} onChange={(v) => set("displayMap", v)} />
        <Toggle label="Display Vignette" value={layout.displayVignette} onChange={(v) => set("displayVignette", v)} />
        {layout.displayVignette && (
          <TextInput label="Vignette Name" value={layout.vignetteName} onChange={(v) => set("vignetteName", v)} />
        )}
        <SelectInput
          label="NIP Layout Type"
          value={layout.nipLayoutType}
          options={[...NIP_OPTIONS]}
          onChange={(v) => set("nipLayoutType", v as HudLayout["nipLayoutType"])}
        />
        <EnabledDisabled label="Chevron Customisation" value={layout.chevronCustomisation} onChange={(v) => set("chevronCustomisation", v)} />
        <NumInput label="UI Sizing Theme" value={layout.uiSizingTheme} onChange={(v) => set("uiSizingTheme", v)} />
      </div>
    </SubSection>
  );
}

export default function HudForm({
  spec,
  onChange,
}: {
  spec: HudSpec;
  onChange: (s: HudSpec) => void;
}) {
  const set = <K extends keyof HudSpec>(k: K, v: HudSpec[K]) =>
    onChange({ ...spec, [k]: v });

  const updateLayout = (i: number, l: HudLayout) => {
    const layouts = [...spec.layouts];
    layouts[i] = l;
    set("layouts", layouts);
  };

  const addLayout = () => set("layouts", [...spec.layouts, emptyHudLayout()]);
  const removeLayout = (i: number) =>
    set("layouts", spec.layouts.filter((_, idx) => idx !== i));

  return (
    <H3Section title="Sizes and Dimensions">
      <SubSection title="General">
        <DimInput label="Physical Dimensions" value={spec.physicalDimensions} onChange={(v) => set("physicalDimensions", v)} />
        <DimInput label="Screen Resolution" value={spec.screenResolution} onChange={(v) => set("screenResolution", v)} />
        <DimInput label="Header / Footer Size" value={spec.headerFooterSize} onChange={(v) => set("headerFooterSize", v)} />
        <NumInput label="DPI" value={spec.dpi} onChange={(v) => set("dpi", v)} unit="dpi" />
        <TextInput label="Scale Factor" value={spec.scaleFactor} onChange={(v) => set("scaleFactor", v)} />
        <NumInput label="Diagonal Measurement" value={spec.diagonalMeasurement} onChange={(v) => set("diagonalMeasurement", v)} unit="in" />
        <NumInput label="Display FPS" value={spec.displayFps} onChange={(v) => set("displayFps", v)} unit="fps" />
        <NumInput label="Minimum Font Size" value={spec.minimumFontSize} onChange={(v) => set("minimumFontSize", v)} unit="pt" />
      </SubSection>

      <SubSection title="Display Zones">
        <DimInput label="Map Projection Area" value={spec.mapProjectionArea} onChange={(v) => set("mapProjectionArea", v)} />
        <DimInput label="Map Safe Area" value={spec.mapSafeArea} onChange={(v) => set("mapSafeArea", v)} />
        <NumInput label="Number of Content Layouts" value={spec.numberOfContentLayouts} onChange={(v) => set("numberOfContentLayouts", v)} />
      </SubSection>

      {spec.layouts.map((layout, i) => (
        <div key={i} className="relative">
          <HudLayoutForm layout={layout} index={i} onChange={(l) => updateLayout(i, l)} />
          {spec.layouts.length > 1 && (
            <button
              type="button"
              onClick={() => removeLayout(i)}
              className="chevron-icon mono" style={{position:"absolute",top:8,right:16,fontFamily:"'DM Mono',monospace",fontSize:9,background:"transparent",border:"none",cursor:"pointer"}}
            >
              REMOVE
            </button>
          )}
        </div>
      ))}

      <div className="px-6 py-3">
        <button
          type="button"
          onClick={addLayout}
          className="add-layout-btn mono" style={{fontFamily:"'DM Mono',monospace",fontSize:10,background:"transparent",border:"1px solid",borderRadius:2,padding:"5px 12px",cursor:"pointer",letterSpacing:"0.08em",transition:"border-color 0.15s"}}
        >
          + ADD LAYOUT
        </button>
      </div>
    </H3Section>
  );
}
