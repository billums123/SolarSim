export interface SolarPanelSettings {
  shapeOfPanel: "rectangle" | "circle";
  panelWidth: number;
  panelLength: number;
  panelDiameter: number;
  panelEfficiency: number | null;
}

export interface StorageTankSettings {
  storageTankThermalConductivity: number;
  storageTankHeight: number;
  storageTankDiameter: number;
  fluidInitTemp: number;
  fluidFinalTemp: number | null;
}

export interface FormValues extends SolarPanelSettings, StorageTankSettings {
  time: number;
  solarFlux: number;
  numberOfIncrements: number | null;
}

export type SurfaceArea = Omit<SolarPanelSettings, "panelEfficiency">;

export type StorageTankCapacity = Pick<
  StorageTankSettings,
  "storageTankDiameter" | "storageTankHeight"
>;

export type SolarPanelEnergy = Pick<
  FormValues,
  "panelEfficiency" | "solarFlux"
> & {
  panelSurfaceArea: number;
};

export type StorageTankEnergyRequired = Pick<
  FormValues,
  "fluidInitTemp" | "fluidFinalTemp" | "numberOfIncrements"
> & {
  storageTankCapacity: number;
};

export type EnergyRequiredResults = {
  step: number;
  currentFluidTemp: number;
  energy: number;
};

export interface RequiredTime {
  energyRequiredToHeatTankFluid: EnergyRequiredResults[];
  solarPanelEnergyInput: number;
}

export interface RequiredTimeResults {
  step: number;
  time: number;
}

export interface HeatTransferResults {
  calculationComplete: boolean;
  panelSurfaceArea: number | null;
  storageTankCapacity: number | null;
  solarPanelEnergyInput: number | null;
  energyRequiredToHeatTankFluid: EnergyRequiredResults[] | null;
  requiredTime: RequiredTimeResults[] | null;
}

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
