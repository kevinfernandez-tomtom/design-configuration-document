export type DimensionValue = { w: string; h: string };
export type XYValue = { x: string; y: string };

export type HorizonElement = "CMP" | "SLG" | "JV" | "ETA";
export type NipLayout =
  | "NORMAL_LAYOUT"
  | "LANDSCAPE_MINIMAL"
  | "LANDSCAPE_MEDIUM"
  | "LANDSCAPE_MAXIMAL"
  | "PORTRAIT_MINIMAL"
  | "PORTRAIT_MEDIUM"
  | "PORTRAIT_MAXIMAL";
export type EtaLayout =
  | "NORMAL_LAYOUT_WIDE"
  | "NORMAL_LAYOUT_NARROW"
  | "MINIMAL"
  | "MEDIUM"
  | "MAXIMAL";
export type HudHorizonElement = "SLG" | "CMP";

export interface HeadUnitSpec {
  physicalDimensions: DimensionValue;
  screenResolution: DimensionValue;
  headerFooterSize: DimensionValue;
  dpi: string;
  diagonalMeasurement: string;
  displayFps: string;
  minimumFontSize: string;
  keyboardSize: DimensionValue;
  projectionArea: DimensionValue;
  mapDisplayArea: DimensionValue;
  mapSafeArea: DimensionValue;
  contentLayouts: string;
  horizonElements: HorizonElement[];
  nipLayoutType: NipLayout;
  etaLayoutType: EtaLayout;
  chevron: "Custom" | "Default";
  uiSizingTheme: string;
  weatherButton: boolean;
  compass: boolean;
  icons: "Custom" | "Default";
  search: "Custom" | "Default";
  settings: "Custom" | "Default";
  mapControlsPosition: "Driver" | "Passenger";
  mapControlsVisibility: "Custom" | "Default";
  mapUiModeSync: boolean;
  numberOfAmbiances: string;
  ambianceChanges: ("Icons" | "Fonts" | "Colors")[];
  buildings3d: boolean;
  landmarks3d: boolean;
}

export interface ClusterLayout {
  screenResolution: DimensionValue;
  contentZone1Size: DimensionValue;
  contentZone1Pos: XYValue;
  contentZone2Size: DimensionValue;
  contentZone2Pos: XYValue;
  horizonElements: HorizonElement[];
  displayMap: boolean;
  displayCurrentStreet: boolean;
  displayVignette: boolean;
  vignetteName: string;
  nipLayoutType: NipLayout;
  etaLayoutType: EtaLayout;
  chevron: "Custom" | "Default";
  uiSizingTheme: string;
  individualTbt: boolean;
  tbtImplementationType: "Component" | "API";
  blindSpotCamera: boolean;
  dynamicMapSafeArea: boolean;
}

export interface ClusterSpec {
  physicalDimensions: DimensionValue;
  screenResolution: DimensionValue;
  headerFooterSize: DimensionValue;
  dpi: string;
  scaleFactor: string;
  diagonalMeasurement: string;
  displayFps: string;
  minimumFontSize: string;
  mapProjectionArea: DimensionValue;
  mapSafeArea: DimensionValue;
  numberOfContentLayouts: string;
  layouts: ClusterLayout[];
}

export interface HudLayout {
  screenResolution: DimensionValue;
  contentZone1Size: DimensionValue;
  contentZone1Pos: XYValue;
  contentZone2Size: DimensionValue;
  contentZone2Pos: XYValue;
  horizonElements: HudHorizonElement[];
  displayMap: boolean;
  displayVignette: boolean;
  vignetteName: string;
  nipLayoutType: NipLayout;
  chevronCustomisation: boolean;
  uiSizingTheme: string;
}

export interface HudSpec {
  physicalDimensions: DimensionValue;
  screenResolution: DimensionValue;
  headerFooterSize: DimensionValue;
  dpi: string;
  scaleFactor: string;
  diagonalMeasurement: string;
  displayFps: string;
  minimumFontSize: string;
  mapProjectionArea: DimensionValue;
  mapSafeArea: DimensionValue;
  numberOfContentLayouts: string;
  layouts: HudLayout[];
}

export interface NavWidgetLayout {
  forcedSizingTheme: string;
  nipLayoutType: NipLayout;
  etaLayoutType: EtaLayout;
  chevronCustomisation: boolean;
  uiSizingTheme: string;
  eventsAndHazards: boolean;
  suggestedDestinations: boolean;
  individualUiTheming: boolean;
  individualMapTheming: boolean;
}

export interface NavWidgetSpec {
  numberOfSizes: string;
  additionalControls: boolean;
  headerFooterControlsSize: string;
  layouts: NavWidgetLayout[];
}

export interface DesignSpec {
  carLineName: string;
  softwareReleaseNumber: string;
  headUnit: HeadUnitSpec;
  cluster: ClusterSpec;
  hud: HudSpec;
  navWidget: NavWidgetSpec;
}
