export interface SolarPanelSettings {
  shapeOfPanel: "rectangle" | "circle";
  panelWidth: number;
  panelLength: number;
  panelDiameter: number;
  panelEfficiency: number | null;
}

export interface StorageTankSettings {
  storageTankCapacity?: number;
  storageTankThermalConductivity: number;
  storageTankHeight: number;
  storageTankDiameter: number;
  fluidInitTemp: number;
  fluidFinalTemp: number | null;
}

export interface FormValues extends SolarPanelSettings, StorageTankSettings {
  time: number;
  solarFlux: number;
}

export type SurfaceArea = Omit<SolarPanelSettings, "panelEfficiency">;

export type SolarPanelEnergy = Pick<
  FormValues,
  "panelEfficiency" | "solarFlux"
> & {
  surfaceArea: number;
};

export interface GlobalFormErrors {
  solarPanelSettingsErrors: boolean;
  storageTankSettingsErrors: boolean;
}
export interface SetGlobalFormErrors {
  name: "solarPanelSettingsErrors" | "storageTankSettingsErrors";
  error: boolean;
}

export interface SolarPanelSettingsErrors {
  shapeOfPanelError: string;
  panelWidthError: string;
  panelLengthError: string;
  panelDiameterError: string;
  panelEfficiencyError: string;
}

export interface StorageTankSettingsErrors {
  storageTankThermalConductivityError: string;
  storageTankHeightError: string;
  storageTankDiameterError: string;
  fluidInitTempError: string;
  fluidFinalTempError: string;
}
