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
| CMP | Compass *(confirm)* |
| SLG | Speed limit / guidance element *(confirm)* |
| JV | Junction view *(confirm)* |
| ETA | Estimated time of arrival panel |
| NIP | Navigation instruction panel *(confirm)* |
| TBT | Turn-by-turn |
| Horizon Panel | *(define)* |
| Vignette | *(define)* |
| Content Zone | *(define)* |
| Safe Area | *(define)* |
| UI Sizing Theme | *(define the letters, see 1.3)* |
| XY coordinates | Origin: *(specify, e.g. top-left, px)* |
| Map Projection Size |

---

## 1. Shared Enumerations

*Defined once here and referenced by every screen, so the lists cannot drift apart.*

### 1.1 NIP Layout Types
`NORMAL_LAYOUT`, `LANDSCAPE_MINIMAL`, `LANDSCAPE_MEDIUM`, `LANDSCAPE_MAXIMAL`, `PORTRAIT_MINIMAL`, `PORTRAIT_MEDIUM`, `PORTRAIT_MAXIMAL`

### 1.2 ETA Layout Types
`NORMAL_LAYOUT_WIDE`, `NORMAL_LAYOUT_NARROW`, `MINIMAL`, `MEDIUM`, `MAXIMAL`

### 1.3 UI Sizing Themes

| Letter | Meaning / typical use |
|---|---|
| | |

### 1.4 Horizon Panel Elements
`Default`,`CMP`, `SLG`, `JV`, `ETA`

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

### 3.4.1 Layout #1 - TBT

**Sizes and zones**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Content Area Size | '570 x 546', px *Review* | | | |
| Layout position | `x, y`, px | | | Top-left corner of the layout on the screen |
| Map safe area | NA | | | |

**Content zones** *(add a row per zone)*

| Zone | Size `W × H` (px) | Position `x, y` | Notes |
|---|---|---|---|
| Content zone #1 | '570 x 546' | '1470,76' | *Review* |

**Layout configurations**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Panels docked / undocked | NA | | | |
| Horizon panel elements | Intstruction Arrow, Distance to Maneuver, Name of Road *Review* | | | |
| Display map | Disabled | | | |
| Dynamic map safe area | Disabled | | | |
| Display current street component | Disabled | | | |
| Display vignette | Disabled | | | |
| Vignette name | NA | | | Only if the vignette is displayed |
| NIP layout type | NA | | | |
| ETA layout type | NA | | | |
| Chevron | Custom | | | |
| UI sizing theme | *Unknown* | | | |

---
### 3.4.2 Layout #2 - Map View

**Sizes and zones**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Map Projection Size | `1669 x 540`, px *Review* | | | |
| Layout position | `x, y`, px | | | Top-left corner of the layout on the screen |
| Map safe area | `1028 x 492`, px *Review* | | | |

**Content zones** *(add a row per zone)*

| Zone | Size `W × H` (px) | Position `x, y` | Notes |
|---|---|---|---|
| Content zone #1 | '1669 x 540' | '286,85' | *Review* |

**Layout configurations**

| Parameter | Type / Allowed values | Value | Std / Custom | Source / Notes |
|---|---|---|---|---|
| Panels docked / undocked | Undocked | | | |
| Horizon panel elements | Default *Review* | | | |
| Display map | Enabled| | | |
| Dynamic map safe area | Enabled | | | |
| Display current street component | Enabled *Review* | | | |
| Display vignette | Enabled | | | |
| Vignette name | *Unknown* | | | Only if the vignette is displayed |
| NIP layout type | *Unknown* | | | |
| ETA layout type | *Unknown* | | | |
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