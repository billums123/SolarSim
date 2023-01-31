export interface SolarPanelSettings {
  shapeOfPanel: "rectangle" | "circle";
  panelWidth: number;
  panelLength: number;
  panelDiameter: number;
  panelEfficiency: number;
}

export interface SolarPanelSettingsErrors {
  shapeOfPanelError: string;
  panelWidthError: string;
  panelLengthError: string;
  panelDiameterError: string;
  panelEfficiencyError: string;
}

export interface FormValues extends SolarPanelSettings {
  time: number;
  storageTankCapacity: number;
  storageTankThermalConductivity: number;
  storageTankHeight: number;
  storageTankDiameter: number;
  solarFlux: number;
  fluidInitTemp: number;
  fluidFinalTemp: number | null;
}
