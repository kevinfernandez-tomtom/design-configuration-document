# [Car Line Name] — [Software Release Number]

> **How to use this template:** Copy per client / car line / release. Fill the **Value** column; leave **Std / Custom** as `Std` unless the client deviates from the TomTom default, and in that case point to the asset or spec in **Source / Notes**. Use `N/A` for fields that do not apply, and never leave a value blank. Blank means "not yet filled in".

---

## 0. Document Info

| Field | Value |
|---|---|
| Client | |
| Car line | |
| Software release | |
| Template version | V3 |
| Document owner | |
| Status | Draft / In validation / Validated |
| Last validated (date) | |
| Source spec(s) / links | |
| Supported screens | Head Unit / Cluster / HUD / Passenger Screen / Navigation Widget *(delete those not supported)* |

### Legend

| Notation | Meaning |
|---|---|
| `W × H` | Width × height. Unit is given in the **Type / Allowed values** column |
| `one of {…}` | Pick exactly one |
| `any of {…}` | Pick zero or more |
| `Enabled / Disabled` | Feature toggle (used for every on/off setting) |
| `Std / Custom` | Whether the client uses the TomTom default or a customised version |
| **Std / Custom** column | `Std` = TomTom default, `Custom` = client deviation (link the asset or spec in Notes) |
| `N/A` | Not applicable to this client or screen |
| *(new)* | Field added in V3, to be confirmed |

### Glossary

*Confirm or correct these definitions.*

| Term | Meaning |
|---|---|
| CMP | Consecutive Maneuver Panel, a Horizon Panel sub panel |
| SLG | Speed limit / guidance element *(confirm)* |
| JV | Junction view *(confirm)* |
| ETA | Estimated time of arrival panel, a Horizon Panel sub panel |
| UEP | Upcoming Events Panel, a Horizon Panel sub panel (Cluster only) |
| NIP | Next Instruction Panel, shown in the Horizon Panel |
| TBT | Turn-by-turn |
| Horizon Panel | The panel holding the NIP and its sub panels (CMP, ETA, UEP). Its size and position come from `hpComponentRect` |
| Vignette | A border on the outer edges of the Cluster or HUD |
| Content Zone | *(define)* |
| Safe Area | The rectangle that frames the chevron. The chevron sits in its middle. When it isn't set, the whole screen is the safe area |
| UI Sizing Theme | *(define the letters, see 1.3)* |
| XY coordinates | Origin: top-left of the activity. `x` is the margin from the left edge (`startMargin`, does not mirror in right-to-left languages), `y` the margin from the top (`topMargin`). Unit is px or dp, set by `displayPX` |
| Map Projection Size | *(define)* |

---

## 1. Shared Enumerations

*Defined once here and referenced by every screen, so the lists cannot drift apart.*

### 1.1 NIP Layout Types
`NORMAL_LAYOUT`, `LANDSCAPE_MINIMAL`, `LANDSCAPE_MEDIUM`, `LANDSCAPE_MAXIMAL`, `PORTRAIT_MINIMAL`, `PORTRAIT_MEDIUM`, `PORTRAIT_MAXIMAL`, `COMPACT` *(Cluster only)*

### 1.2 ETA Layout Types
`NORMAL_LAYOUT_WIDE`, `NORMAL_LAYOUT_NARROW`, `MINIMAL`, `MEDIUM`, `MAXIMAL`

### 1.3 UI Sizing Themes

| Letter | Meaning / typical use |
|---|---|
| | |

### 1.4 Horizon Panel Elements
`Default`, `CMP`, `SLG`, `JV`, `ETA`, `UEP`

### 1.5 Navigation Widget Sizes
`Mini App`, `Micro App`, `Nano App` *(confirm)*

---

# 2. Head Unit

## 2.1 Display Specification

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Physical dimensions | `W × H`, mm | | | |
| Screen resolution | `W × H`, px | | | |
| Header / footer size | number, px | | | |
| DPI | number | | | |
| Scale factor | alphanumeric *(confirm type and format)* | | | |
| Diagonal measurement | number, inches | | | |
| Display FPS | number | | | |
| Minimum font size | number, *(unit)* | | | |
| Number of content layouts | number | | | |
| Orientation | one of {Landscape, Portrait, Both} | | | |
| Input modalities | any of {Touch, Rotary, Voice, Hard keys} | | | |
| Number of themes | number | | | e.g. Blue, Black, Red = 3 |
| Number of modes | number | | | Modes available per theme, e.g. Light and Dark = 2 |

## 2.2 Screen-Specific Sizes

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Keyboard size | `W × H`, px | | | |
| Keyboard layout type | one of {Full width, Custom} | | | |

## 2.3 Layouts

*Repeat the block 2.3.x once per layout. The number of blocks must equal "Number of content layouts" in 2.1.*

### 2.3.1 Layout #1

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Map Projection Size | `W × H`, px | | | |
| Layout position | `x, y`, px | | | Top-left corner of the layout on the screen |
| Panels docked / undocked | one of {Docked, Undocked} | | | |
| Display vignette | Enabled / Disabled | | | |
| Vignette name | text | | | Only if the vignette is displayed |

## 2.4 Configurations & Customisations

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Horizon panel elements | any of §1.4 | | | |
| NIP layout type | one of §1.1 | | | |
| ETA layout type | one of §1.2 | | | |
| Chevron | Std / Custom | | | |
| UI sizing theme | one of §1.3 | | | |
| Icons | Std / Custom | | | |
| Search | Std / Custom | | | |
| Settings | Std / Custom | | | |
| Weather button | Enabled / Disabled | | | |
| Compass | Enabled / Disabled | | | |
| Map controls: position | one of {Driver, Passenger} | | | |
| Map controls: visibility | Std / Custom | | | |
| Map & UI mode sync | Enabled / Disabled | | | |
| Ambiance-related changes | *(describe)* | | | |
| 3D buildings | Enabled / Disabled | | | |
| 3D landmarks | Enabled / Disabled | | | |
| Current street name | Enabled / Disabled | | | |

---

# 3. Cluster

## 3.1 Display Specification

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Physical dimensions | `W × H`, mm | | | |
| Screen resolution | `W × H`, px | | | |
| Header / footer size | `Header = number, Footer = number`, px | | | |
| DPI | number | | | |
| Scale factor | alphanumeric *(confirm type and format)* | | | |
| Diagonal measurement | number, inches | | | |
| Display FPS | number | | | |
| Minimum font size | number, *(unit)* | | | |
| Number of content layouts | number | | | |
| Orientation | one of {Landscape, Portrait, Both} | | | |
| Mode synced with head unit | Enabled / Disabled | | | Whether the cluster's mode (e.g. Light / Dark) follows the head unit |

## 3.2 Screen-Wide Configurations

*These apply to every layout.*

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Other features | | | | |
| ↳ Blind spot camera | Enabled / Disabled | | | |
| ↳ Current street name | Enabled / Disabled | | | |

## 3.3 Individual TBT Component

*The TBT component is shown only on the Cluster and the HUD, so it is configured per screen rather than screen-wide.*

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Individual TBT component | Enabled / Disabled | | | |
| ↳ Implementation type | one of {Streamed, API} | | | Only if the TBT component is enabled |

## 3.4 Layouts

*Repeat the whole block 3.4.x once per layout. The number of blocks must equal "Number of content layouts". Name each layout, e.g. "Layout #1 - TBT".*

*Each layout corresponds to one `cluster_setup_config.json` for `ClusterActivity` (ANA and AUI; UXL does not use it). Where a row maps to a config key, Notes give the key and the default used when the key is omitted. Rows without a key are not part of that config.*

### 3.4.1 Layout #1 - [Name]

**Sizes and zones**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Map Projection Size *(or Content Area Size when there is no map)* | `W × H`, px | | | |
| Layout position | `x, y`, px | | | Top-left corner of the layout on the screen |
| Size unit | one of {px, dp} | | | Key `displayPX` (true = px, false = dp). Default: dp. Applies to the horizon panel and safe area sizes and positions below |
| Horizon panel size | `W × H`, px / dp | | | Key `hpComponentRect` `width`, `height`. Default: 0 |
| Horizon panel position | `x, y`, px / dp | | | Key `hpComponentRect` `startMargin`, `topMargin`. Default: 0, 0 |
| Map safe area | `W × H`, px / dp | | | Key `safeAreaComponentRect` `width`, `height`. Default: none, the whole screen is the safe area. The chevron sits in its middle |
| Map safe area position | `x, y`, px / dp | | | Key `safeAreaComponentRect` `startMargin`, `topMargin`. Default: 0, 0 |

**Content zones** *(add a row per zone)*

| Zone | Size `W × H` (px) | Position `x, y` | Notes |
|---|---|---|---|
| Content zone #1 | | | |

**Layout configurations**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Panels docked / undocked | one of {Docked, Undocked} | | | |
| Display horizon panel | Enabled / Disabled | | | Key `displayHpComponent`. Default: Enabled |
| Horizon panel elements | any of {`CMP`, `ETA`, `UEP`} | | | Key `hpElementsToShowOnCluster`. Default: `CMP`, `ETA`. A replacement static file without this key shows no sub panels, so always list them |
| Display map | Enabled / Disabled | | | Key `displayMapComponent`. Default: Enabled |
| Dynamic map safe area | Enabled / Disabled | | | |
| Display current street component | Enabled / Disabled | | | Key `displayCurrentStreetComponent`. Default: Enabled. Bottom-centred in the map safe area; only shown when the safe area is large enough and there is a street name |
| Display vignette | Enabled / Disabled | | | Key `displayVignette`. Default: Enabled |
| Vignette name | one of {`default_vignette`, `vignette_1` … `vignette_5`} | | | Key `vignetteName`. Default: `default_vignette`. Only if the vignette is displayed. An unknown name falls back to the default |
| NIP layout type | one of §1.1 | | | Key `nipLayoutType`. Default: none, a layout that fits the horizon panel is picked adaptively |
| ETA layout type | one of §1.2 | | | Key `etaLayoutType`. Default: none, the ETA panel shows as much as fits the horizon panel, on one row |
| Chevron | Std / Custom | | | |
| UI sizing theme | one of §1.3 | | | |

---

# 4. HUD

## 4.1 Display Specification

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Physical dimensions | `W × H`, mm *(assumed unit)* | | | |
| Screen resolution | `W × H`, px | | | |
| Header / footer size | `W × H`, px *(assumed unit)* | | | |
| DPI | number | | | |
| Scale factor | alphanumeric *(confirm type and format)* | | | |
| Diagonal measurement | number, inches *(assumed unit)* | | | |
| Display FPS | number | | | |
| Minimum font size | number, *(unit)* | | | |
| Number of content layouts | number | | | |
| Virtual image distance *(new)* | number, m | | | |
| Field of view *(new)* | `H° × V°` | | | |
| Colour support *(new)* | one of {Monochrome, Limited palette, Full colour} | | | |
| Brightness constraints *(new)* | *(describe)* | | | |

## 4.2 Individual TBT Component

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Individual TBT component | Enabled / Disabled | | | |
| ↳ Implementation type | one of {Streamed, API} | | | Only if the TBT component is enabled |

## 4.3 Layouts

*Repeat the block 4.3.x once per layout.*

*Each layout corresponds to one `hud_setup_config.json` for `HudActivity` (ANA and AUI; UXL has no HUD). Where a row maps to a config key, Notes give the key and the default used when the key is omitted. Rows without a key are not part of that config.*

### 4.3.1 Layout #1

**Sizes and zones**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Layout resolution | `W × H`, px | | | Was duplicated in General in V2. Per-layout if it differs from 4.1, otherwise `N/A` |
| Layout position | `x, y`, px | | | Top-left corner of the layout on the screen |
| Map Projection Size | `W × H`, px | | | |
| Size unit | one of {px, dp} | | | Key `displayPX` (true = px, false = dp). Default: dp. Applies to the horizon panel and safe area sizes and positions below |
| Horizon panel size | `W × H`, px / dp | | | Key `hpComponentRect` `width`, `height`. Default: none, the XML-defined values are used |
| Horizon panel position | `x, y`, px / dp | | | Key `hpComponentRect` `startMargin`, `topMargin`. Default: none, the XML-defined values are used |
| Map safe area | `W × H`, px / dp | | | Key `safeAreaComponentRect` `width`, `height`. Default: none, the whole screen is the safe area. The chevron sits in its middle |
| Map safe area position | `x, y`, px / dp | | | Key `safeAreaComponentRect` `startMargin`, `topMargin`. Default: 0, 0 |

**Content zones** *(add a row per zone)*

| Zone | Size `W × H` (px) | Position `x, y` | Notes |
|---|---|---|---|
| Content zone #1 | | | |
| Content zone #2 | | | |

**Layout configurations**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Display horizon panel | Enabled / Disabled | | | Key `displayHpComponent`. Default: Enabled |
| Horizon panel elements | any of {`CMP`} | | | Key `hpElementsToShowOnHud`. Default: `CMP`. The HUD config supports only `CMP`; V3 listed `SLG` too |
| Display map | Enabled / Disabled | | | Key `displayMapComponent`. Default: Enabled |
| Display vignette | Enabled / Disabled | | | Key `displayVignette`. Default: Enabled |
| Vignette name | one of {`default_hud_vignette`, `vignette_1` … `vignette_5`} | | | Key `vignetteName`. Default: `default_hud_vignette`. Only if the vignette is displayed. An unknown name falls back to the default |
| NIP layout type | one of §1.1, except `COMPACT` | | | Key `nipLayoutType`. Default: `NORMAL_LAYOUT` |
| ETA layout type | N/A | N/A | | Not supported on HUD: the HUD config has no ETA setting |
| Chevron | Std / Custom | | | Was "Chevron Customisation [Enabled/Disabled]" in V2 |
| UI sizing theme | one of §1.3 | | | |

---

# 5. Passenger Screen

> ⚠️ **To be defined.** The V2 template had no passenger screen section. Fill this in once the spec is agreed. Suggested starting point: reuse the Head Unit structure (§2) and mark which fields differ.

## 5.1 Display Specification
*Use the same table as §2.1.*

## 5.2 Screen-Specific Sizes and Configurations

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| *(TBD)* | | | | |

---

# 6. Navigation Widget (Activity)

*An additional activity supported alongside the screens above. Sizes below are the widget's size variants.*

## 6.1 General

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Number of sizes | number | | | |
| Additional controls | Enabled / Disabled | | | |
| Host screen(s) | any of {Head Unit, Cluster, HUD, Passenger Screen} | | | Where the widget is shown |

## 6.2 Size Variants

*Repeat the block 6.2.x once per size. The number of blocks must equal "Number of sizes". Name each size, e.g. "Size #1 - Expanded".*

### 6.2.1 Size #1 - [Name]

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Size `W × H` *(new)* | `W × H`, px | | | |
| Size of controls header / footer | number, px | | | Only if additional controls are enabled |
| Navigation Widget Size | one of §1.5 | | | |
| NIP layout type | one of §1.1 | | | |
| ETA layout type | one of §1.2 | | | |
| Chevron | Std / Custom | | | |
| Events and hazards | Enabled / Disabled | | | |
| Suggested destinations | Enabled / Disabled | | | |
| Individual UI theming | Enabled / Disabled | | | |
| Individual map theming | Enabled / Disabled | | | |
| Panels docked / undocked | one of {Docked, Undocked} | | | |

---

# 7. Decision Log

| ID | Date | Topic | Decision | Rationale | Owner | Status | Affected fields |
|---|---|---|---|---|---|---|---|
| D-001 | | | | | | Open / Decided / Superseded | |

---

# 8. Open Questions & Known Issues

| ID | Date raised | Screen | Question / issue | Bug or customisation? | Owner | Status | Link |
|---|---|---|---|---|---|---|---|
| Q-001 | | | | | | | |

---

# Changelog

*Newest first. Track template changes and client config changes separately.*

### Template changes

| Date | Version | Author | Change |
|---|---|---|---|
| 2026-11-25 | V3 | Kevin Fernandez | Added the NavApp Cluster and HUD config parameters to the Cluster and HUD layouts: config key and default in Notes, new rows for Size unit (`displayPX`), Display horizon panel, Horizon panel size and position (`hpComponentRect`) and Map safe area position (`safeAreaComponentRect`). Vignette names and Horizon panel elements now list the allowed values; HUD elements reduced to `CMP`. Added `COMPACT` to §1.1 (Cluster only) and `UEP` to §1.4. Filled the glossary for CMP, NIP, UEP, Horizon Panel, Vignette, Safe Area and XY coordinates. |
| 2026-11-25 | V3 | Kevin Fernandez | Moved the Individual TBT component out of Cluster screen-wide configurations into its own section on the Cluster (§3.3) and HUD (§4.2), with Implementation type as one of {Streamed, API}. Added Layout position `x, y` to every content layout (Head Unit, Cluster, HUD). Added Display vignette and Vignette name to Head Unit layouts, so every layout has the vignette toggle. Renumbered Cluster layouts to §3.4 and HUD layouts to §4.3. |
| 2026-11-23 | V3 | Kevin Fernandez | Navigation Widget: removed Forced sizing theme and UI sizing theme from the size variants; moved Size of controls header / footer from General into each size; added Navigation Widget Size (§1.5) and Panels docked / undocked to each size. Added §1.5 Navigation Widget Sizes. Cluster: added Other features grouping and the per-layout name. |
| 2026-11-17 | V3 | | Restructured into tables with a shared field format. Added shared enumerations, glossary and document info. Unified toggle notation. Split Cluster config into screen-wide and per-layout. Added Passenger Screen placeholder. Renamed Navigational Widget to Navigation Widget (Activity). Added decision and open-question tables. Added proposed new fields (marked *(new)*). Fixed typos. |
| | V2 | | Added Current Street Name to Cluster |
| | V2 | | Added Keyboard Layout Type to General |

### Client config changes

| Date | Release | Author | Screen | Change |
|---|---|---|---|---|
| | | | | |
