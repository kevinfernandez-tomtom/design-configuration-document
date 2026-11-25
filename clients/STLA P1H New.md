# [Car Line Name] — [Software Release Number]

> **How to use this template:** Copy per client / car line / release. Fill the **Value** column; leave **Std / Custom** as `Std` unless the client deviates from the TomTom default, and in that case point to the asset or spec in **Source / Notes**. Use `N/A` for fields that do not apply, and never leave a value blank. Blank means "not yet filled in".

---

## 0. Document Info

| Field | Value |
|---|---|
| Client | Stellantis |
| Car line | P1H |
| Software release | |
| Template version | V3 |
| Document owner | Kevin Fernandez|
| Status | Draft / In validation / Validated |
| Last validated (date) | 18.11.2026 |
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
| Map Projection Size |

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
`Default`,`CMP`, `SLG`, `JV`, `ETA`, `UEP`

### 1.5 Navigation Widget Sizes
`Mini App`, `Micro App`, `Nano App` *Review*

---

# 2. Head Unit

## 2.1 Display Specification

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Physical dimensions | `269.28 x 95.04`, mm  | | | |
| Screen resolution | `2040 x 720`, px | | | |
| Header / footer size | `90`, px | | | |
| DPI | number | 192 | | |
| Scale factor | *Unknown* | N/A | | |
| Diagonal measurement | 11.3, inches | | | |
| Display FPS | *Unknown* | | | |
| Minimum font size | 30, *(unit)* *Unknown* | | | |
| Number of content layouts | 1 | | | |
| Orientation *Landscape* | one of {Landscape, Portrait, Both} | | | |
| Input modalities *Touch* | any of {Touch, Rotary, Voice, Hard keys} | | | |
| Number of themes | 8 | | | e.g. Blue, Black, Red = 3. Moved from 2.4 (was "Number of ambiances / themes") |
| Number of modes | 2 | | | Modes available per theme, e.g. Light and Dark = 2 |

## 2.2 Screen-Specific Sizes

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Keyboard size | *Unknown*, px | | | |
| Keyboard layout type | one of {Full width, Custom} | | | |

## 2.3 Layouts

*Repeat the block 2.3.x once per layout. The number of blocks must equal "Number of content layouts" in 2.1.*

### 2.3.1 Layout #1

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Map Projection Size | `2040 x 630`, px | | | |
| Layout position | `x, y`, px | | | Top-left corner of the layout on the screen |
| Panels docked / undocked | Docked | | | |
| Display vignette | Enabled / Disabled | | | |
| Vignette name | text | | | Only if the vignette is displayed |

## 2.4 Configurations & Customisations

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Horizon panel elements | Default | | | |
| NIP layout type | NORMAL_LAYOUT | | | |
| ETA layout type | NORMAL_LAYOUT_WIDE | | | |
| Chevron | Custom | | | |
| UI sizing theme | *Unknown* | | | |
| Icons | Custom | | | |
| Search | Custom | | | |
| Settings | Std | | | |
| Weather button | Enabled | | | |
| Compass | Enabled / Disabled *Unknown* | | | |
| Map controls: position | Driver | | | |
| Map controls: visibility | Std | | | |
| Map & UI mode sync | Enabled / Disabled *Unknown* | | | |
| Ambiance-related changes | Color only | | | |
| 3D buildings | Enabled | | | |
| 3D landmarks | Enabled | | | |
| Current street name | Enabled | | | |

---

# 3. Cluster

## 3.1 Display Specification

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Physical dimensions | `538.56 x 95.04`, mm *(assumed unit)* | | | |
| Screen resolution | `2040 x 720`, px | | | |
| Header / footer size | `Header= 76, Footer=98`, px *Review* | | | |
| DPI | 192 | | | |
| Scale factor | *Unknown* | | | |
| Diagonal measurement | '11.3', inches | | | |
| Display FPS | number | | | |
| Minimum font size | number, *(unit)* | | | |
| Number of content layouts | number | | | |
| Orientation | Landscape | | | |
| Mode synced with head unit | Enabled / Disabled *Unknown* | | | Whether the cluster's mode (e.g. Light / Dark) follows the head unit |

## 3.2 Screen-Wide Configurations

*These apply to every layout.*

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Other Features | | | |
| ↳ Blind spot camera | Enabled | | | |
| ↳ Current street name | Enabled | | | |

## 3.3 Individual TBT Component

*The TBT component is shown only on the Cluster and the HUD, so it is configured per screen rather than screen-wide.*

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Individual TBT component | Enabled | | | |
| ↳ Implementation type | Streamed | | | One of {Streamed, API}. Only if the TBT component is enabled |

## 3.4 Layouts

*Repeat the whole block 3.4.x once per layout. The number of blocks must equal "Number of content layouts".*

*Each layout corresponds to one `cluster_setup_config.json` for `ClusterActivity` (ANA and AUI; UXL does not use it). Where a row maps to a config key, Notes give the key and the default used when the key is omitted. Rows without a key are not part of that config.*

### 3.4.1 Layout #1 - TBT

**Sizes and zones**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Content Area Size | '570 x 546', px *Review* | | | |
| Layout position | `x, y`, px | | | Top-left corner of the layout on the screen |
| Size unit | one of {px, dp} | | | Key `displayPX` (true = px, false = dp). Default: dp. Applies to the horizon panel and safe area sizes and positions below |
| Horizon panel size | `W × H`, px / dp | | | Key `hpComponentRect` `width`, `height`. Default: 0 |
| Horizon panel position | `x, y`, px / dp | | | Key `hpComponentRect` `startMargin`, `topMargin`. Default: 0, 0 |
| Map safe area | NA | | | Key `safeAreaComponentRect` `width`, `height`. Default: none, the whole screen is the safe area. The chevron sits in its middle |
| Map safe area position | `x, y`, px / dp | | | Key `safeAreaComponentRect` `startMargin`, `topMargin`. Default: 0, 0 |

**Content zones** *(add a row per zone)*

| Zone | Size `W × H` (px) | Position `x, y` | Notes |
|---|---|---|---|
| Content zone #1 | '570 x 546' | '1470,76' | *Review* |

**Layout configurations**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Panels docked / undocked | NA | | | |
| Display horizon panel | Enabled / Disabled | | | Key `displayHpComponent`. Default: Enabled |
| Horizon panel elements | Intstruction Arrow, Distance to Maneuver, Name of Road *Review* | | | Key `hpElementsToShowOnCluster`. Default: `CMP`, `ETA`. A replacement static file without this key shows no sub panels, so always list them |
| Display map | Disabled | | | Key `displayMapComponent`. Default: Enabled |
| Dynamic map safe area | Disabled | | | |
| Display current street component | Disabled | | | Key `displayCurrentStreetComponent`. Default: Enabled. Bottom-centred in the map safe area; only shown when the safe area is large enough and there is a street name |
| Display vignette | Disabled | | | Key `displayVignette`. Default: Enabled |
| Vignette name | NA | | | Key `vignetteName`. Default: `default_vignette`. Only if the vignette is displayed. An unknown name falls back to the default |
| NIP layout type | NA | | | Key `nipLayoutType`. Default: none, a layout that fits the horizon panel is picked adaptively |
| ETA layout type | NA | | | Key `etaLayoutType`. Default: none, the ETA panel shows as much as fits the horizon panel, on one row |
| Chevron | Custom | | | |
| UI sizing theme | *Unknown* | | | |

---
### 3.4.2 Layout #2 - Map View

**Sizes and zones**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Map Projection Size | `1669 x 540`, px *Review* | | | |
| Layout position | `x, y`, px | | | Top-left corner of the layout on the screen |
| Size unit | one of {px, dp} | | | Key `displayPX` (true = px, false = dp). Default: dp. Applies to the horizon panel and safe area sizes and positions below |
| Horizon panel size | `W × H`, px / dp | | | Key `hpComponentRect` `width`, `height`. Default: 0 |
| Horizon panel position | `x, y`, px / dp | | | Key `hpComponentRect` `startMargin`, `topMargin`. Default: 0, 0 |
| Map safe area | `1028 x 492`, px *Review* | | | Key `safeAreaComponentRect` `width`, `height`. Default: none, the whole screen is the safe area. The chevron sits in its middle |
| Map safe area position | `x, y`, px / dp | | | Key `safeAreaComponentRect` `startMargin`, `topMargin`. Default: 0, 0 |

**Content zones** *(add a row per zone)*

| Zone | Size `W × H` (px) | Position `x, y` | Notes |
|---|---|---|---|
| Content zone #1 | '1669 x 540' | '286,85' | *Review* |

**Layout configurations**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Panels docked / undocked | Undocked | | | |
| Display horizon panel | Enabled / Disabled | | | Key `displayHpComponent`. Default: Enabled |
| Horizon panel elements | Default *Review* | | | Key `hpElementsToShowOnCluster`. Default: `CMP`, `ETA`. A replacement static file without this key shows no sub panels, so always list them |
| Display map | Enabled| | | Key `displayMapComponent`. Default: Enabled |
| Dynamic map safe area | Enabled | | | |
| Display current street component | Enabled *Review* | | | Key `displayCurrentStreetComponent`. Default: Enabled. Bottom-centred in the map safe area; only shown when the safe area is large enough and there is a street name |
| Display vignette | Enabled | | | Key `displayVignette`. Default: Enabled |
| Vignette name | *Unknown* | | | Key `vignetteName`. Default: `default_vignette`. Only if the vignette is displayed. An unknown name falls back to the default |
| NIP layout type | *Unknown* | | | Key `nipLayoutType`. Default: none, a layout that fits the horizon panel is picked adaptively |
| ETA layout type | *Unknown* | | | Key `etaLayoutType`. Default: none, the ETA panel shows as much as fits the horizon panel, on one row |
| Chevron | Custom | | | |
| UI sizing theme | *Unknown* | | | |

---

# 6. Navigation Widget (Activity)

*An additional activity supported alongside the screens above. Sizes below are the widget's size variants.*

## 6.1 General

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Number of sizes | 2 | | | |
| Additional controls | Enabled | | | |
| Host screen(s) | Head Unit only | | | Where the widget is shown |

## 6.2 Size Variants

*Repeat the block 6.2.x once per size. The number of blocks must equal "Number of sizes".*

### 6.2.1 Size #1 - Expanded

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Size `W × H` *(new)* | `512 x 512`, px | | | |
| Size of controls header / footer | 93, px | | | |
| Navigation Widget Size | Mini App | | | |
| NIP layout type | Unknown | | | |
| ETA layout type | Unknown | | | |
| Chevron | NA | | | |
| Events and hazards | Disabled | | | |
| Suggested destinations | Disabled | | | |
| Individual UI theming | Disabled | | | |
| Individual map theming | Disabled | | | |
| Panels docked / undocked | Docked | | | |

### 6.2.2 Size #2 - Collapsed

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Size `W × H` *(new)* | `324 x 324`, px | | | |
| Size of controls header / footer | NA | | | |
| Navigation Widget Size | Nano App *Review* | | | |
| NIP layout type | Unknown | | | |
| ETA layout type | Unknown | | | |
| Chevron | NA | | | |
| Events and hazards | Disabled | | | |
| Suggested destinations | Disabled | | | |
| Individual UI theming | Disabled | | | |
| Individual map theming | Disabled | | | |
| Panels docked / undocked | Docked | | | |

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
| 2026-11-17 | V3 | | Restructured into tables with a shared field format. Added shared enumerations, glossary and document info. Unified toggle notation. Split Cluster config into screen-wide and per-layout. Added Passenger Screen placeholder. Renamed Navigational Widget to Navigation Widget (Activity). Added decision and open-question tables. Added proposed new fields (marked *(new)*). Fixed typos. |
| | V2 | | Added Current Street Name to Cluster |
| | V2 | | Added Keyboard Layout Type to General |

### Client config changes

| Date | Release | Author | Screen | Change |
|---|---|---|---|---|
| | | | | |