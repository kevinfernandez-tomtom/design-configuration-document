import React from "react";
import type { NavWidgetSpec, NavWidgetLayout } from "../types";
import { H3Section, SubSection } from "./Section";
import {
  NumInput,
  Toggle,
  SelectInput,
  EnabledDisabled,
} from "./FormFields";
import { emptyNavWidgetLayout } from "../defaultSpec";

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

function NavWidgetLayoutForm({
  layout,
  index,
  onChange,
}: {
  layout: NavWidgetLayout;
  index: number;
  onChange: (l: NavWidgetLayout) => void;
}) {
  const set = <K extends keyof NavWidgetLayout>(k: K, v: NavWidgetLayout[K]) =>
    onChange({ ...layout, [k]: v });

  return (
    <SubSection title={`Layout #${index + 1}`}>
      <NumInput label="Forced Sizing Theme" value={layout.forcedSizingTheme} onChange={(v) => set("forcedSizingTheme", v)} />
      <SelectInput
        label="NIP Layout Type"
        value={layout.nipLayoutType}
        options={[...NIP_OPTIONS]}
        onChange={(v) => set("nipLayoutType", v as NavWidgetLayout["nipLayoutType"])}
      />
      <SelectInput
        label="ETA Layout Type"
        value={layout.etaLayoutType}
        options={[...ETA_OPTIONS]}
        onChange={(v) => set("etaLayoutType", v as NavWidgetLayout["etaLayoutType"])}
      />
      <EnabledDisabled label="Chevron Customisation" value={layout.chevronCustomisation} onChange={(v) => set("chevronCustomisation", v)} />
      <NumInput label="UI Sizing Theme" value={layout.uiSizingTheme} onChange={(v) => set("uiSizingTheme", v)} />
      <EnabledDisabled label="Events and Hazards" value={layout.eventsAndHazards} onChange={(v) => set("eventsAndHazards", v)} />
      <EnabledDisabled label="Suggested Destinations" value={layout.suggestedDestinations} onChange={(v) => set("suggestedDestinations", v)} />
      <Toggle label="Individual UI Theming" value={layout.individualUiTheming} onChange={(v) => set("individualUiTheming", v)} />
      <Toggle label="Individual Map Theming" value={layout.individualMapTheming} onChange={(v) => set("individualMapTheming", v)} />
    </SubSection>
  );
}

export default function NavWidgetForm({
  spec,
  onChange,
}: {
  spec: NavWidgetSpec;
  onChange: (s: NavWidgetSpec) => void;
}) {
  const set = <K extends keyof NavWidgetSpec>(k: K, v: NavWidgetSpec[K]) =>
    onChange({ ...spec, [k]: v });

  const updateLayout = (i: number, l: NavWidgetLayout) => {
    const layouts = [...spec.layouts];
    layouts[i] = l;
    set("layouts", layouts);
  };

  const addLayout = () => set("layouts", [...spec.layouts, emptyNavWidgetLayout()]);
  const removeLayout = (i: number) =>
    set("layouts", spec.layouts.filter((_, idx) => idx !== i));

  return (
    <H3Section title="Sizes and Dimensions">
      <SubSection title="General">
        <NumInput label="Number of Sizes" value={spec.numberOfSizes} onChange={(v) => set("numberOfSizes", v)} />
        <Toggle label="Additional Controls" value={spec.additionalControls} onChange={(v) => set("additionalControls", v)} />
        {spec.additionalControls && (
          <NumInput label="Size of Header / Footer of Controls" value={spec.headerFooterControlsSize} onChange={(v) => set("headerFooterControlsSize", v)} unit="px" />
        )}
      </SubSection>

      {spec.layouts.map((layout, i) => (
        <div key={i} className="relative">
          <NavWidgetLayoutForm layout={layout} index={i} onChange={(l) => updateLayout(i, l)} />
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
