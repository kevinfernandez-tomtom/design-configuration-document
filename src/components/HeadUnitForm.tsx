import React from "react";
import type { HeadUnitSpec } from "../types";
import { H3Section, SubSection } from "./Section";
import {
  DimInput,
  NumInput,
  Toggle,
  BinarySelect,
  SelectInput,
  MultiCheckbox,
  EnabledDisabled,
} from "./FormFields";

const NIP_OPTIONS = [
  "NORMAL_LAYOUT",
  "LANDSCAPE_MINIMAL",
  "LANDSCAPE_MEDIUM",
  "LANDSCAPE_MAXIMAL",
  "PORTRAIT_MINIMAL",
  "PORTRAIT_MEDIUM",
  "PORTRAIT_MAXIMAL",
] as const;

const ETA_OPTIONS = [
  "NORMAL_LAYOUT_WIDE",
  "NORMAL_LAYOUT_NARROW",
  "MINIMAL",
  "MEDIUM",
  "MAXIMAL",
] as const;

export default function HeadUnitForm({
  spec,
  onChange,
}: {
  spec: HeadUnitSpec;
  onChange: (s: HeadUnitSpec) => void;
}) {
  const set = <K extends keyof HeadUnitSpec>(k: K, v: HeadUnitSpec[K]) =>
    onChange({ ...spec, [k]: v });

  return (
    <H3Section title="Sizes and Dimensions">
      <SubSection title="General">
        <DimInput label="Physical Dimensions" value={spec.physicalDimensions} onChange={(v) => set("physicalDimensions", v)} />
        <DimInput label="Screen Resolution" value={spec.screenResolution} onChange={(v) => set("screenResolution", v)} />
        <DimInput label="Header / Footer Size" value={spec.headerFooterSize} onChange={(v) => set("headerFooterSize", v)} />
        <NumInput label="DPI" value={spec.dpi} onChange={(v) => set("dpi", v)} unit="dpi" />
        <NumInput label="Diagonal Measurement" value={spec.diagonalMeasurement} onChange={(v) => set("diagonalMeasurement", v)} unit="in" />
        <NumInput label="Display FPS" value={spec.displayFps} onChange={(v) => set("displayFps", v)} unit="fps" />
        <NumInput label="Minimum Font Size" value={spec.minimumFontSize} onChange={(v) => set("minimumFontSize", v)} unit="pt" />
        <DimInput label="Keyboard Size" value={spec.keyboardSize} onChange={(v) => set("keyboardSize", v)} />
      </SubSection>

      <SubSection title="Display Zones">
        <DimInput label="Projection Area" value={spec.projectionArea} onChange={(v) => set("projectionArea", v)} />
        <DimInput label="Map Display Area" value={spec.mapDisplayArea} onChange={(v) => set("mapDisplayArea", v)} />
        <DimInput label="Map Safe Area" value={spec.mapSafeArea} onChange={(v) => set("mapSafeArea", v)} />
        <NumInput label="Content Layouts" value={spec.contentLayouts} onChange={(v) => set("contentLayouts", v)} />
      </SubSection>

      <SubSection title="Configurations and Customisations">
        <MultiCheckbox
          label="Horizon Panel Elements"
          options={["CMP", "SLG", "JV", "ETA"]}
          value={spec.horizonElements}
          onChange={(v) => set("horizonElements", v)}
        />
        <SelectInput
          label="NIP Layout Type"
          value={spec.nipLayoutType}
          options={[...NIP_OPTIONS]}
          onChange={(v) => set("nipLayoutType", v as HeadUnitSpec["nipLayoutType"])}
        />
        <SelectInput
          label="ETA Layout Type"
          value={spec.etaLayoutType}
          options={[...ETA_OPTIONS]}
          onChange={(v) => set("etaLayoutType", v as HeadUnitSpec["etaLayoutType"])}
        />
        <BinarySelect label="Chevron" value={spec.chevron} options={["Custom", "Default"]} onChange={(v) => set("chevron", v as "Custom" | "Default")} />
        <NumInput label="UI Sizing Theme" value={spec.uiSizingTheme} onChange={(v) => set("uiSizingTheme", v)} />
        <EnabledDisabled label="Weather Button" value={spec.weatherButton} onChange={(v) => set("weatherButton", v)} />
        <EnabledDisabled label="Compass" value={spec.compass} onChange={(v) => set("compass", v)} />
        <BinarySelect label="Icons" value={spec.icons} options={["Custom", "Default"]} onChange={(v) => set("icons", v as "Custom" | "Default")} />
        <BinarySelect label="Search" value={spec.search} options={["Custom", "Default"]} onChange={(v) => set("search", v as "Custom" | "Default")} />
        <BinarySelect label="Settings" value={spec.settings} options={["Custom", "Default"]} onChange={(v) => set("settings", v as "Custom" | "Default")} />
        <div className="sub-nested-border" style={{ paddingLeft: 12, borderLeft: "1px solid", margin: "8px 0" }}>
          <div className="sub-nested-label mono" style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4, paddingTop: 4 }}>Map Controls Configuration</div>
          <BinarySelect label="Position" value={spec.mapControlsPosition} options={["Driver", "Passenger"]} onChange={(v) => set("mapControlsPosition", v as "Driver" | "Passenger")} />
          <BinarySelect label="Visibility" value={spec.mapControlsVisibility} options={["Custom", "Default"]} onChange={(v) => set("mapControlsVisibility", v as "Custom" | "Default")} />
        </div>
        <Toggle label="Map & UI Mode Sync" value={spec.mapUiModeSync} onChange={(v) => set("mapUiModeSync", v)} />
        <NumInput label="Number of Ambiances / Themes" value={spec.numberOfAmbiances} onChange={(v) => set("numberOfAmbiances", v)} />
        <MultiCheckbox
          label="Ambiance Related Changes"
          options={["Icons", "Fonts", "Colors"]}
          value={spec.ambianceChanges}
          onChange={(v) => set("ambianceChanges", v)}
        />
        <EnabledDisabled label="3D Buildings" value={spec.buildings3d} onChange={(v) => set("buildings3d", v)} />
        <EnabledDisabled label="3D Landmarks" value={spec.landmarks3d} onChange={(v) => set("landmarks3d", v)} />
      </SubSection>
    </H3Section>
  );
}
