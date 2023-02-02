export interface SolarPanelSettings {
  shapeOfPanel: "rectangle" | "circle";
  panelWidth: number;
  panelLength: number;
  panelDiameter: number;
  panelEfficiency: number | null;
  solarFlux: number;
}

export interface StorageTankSettings {
  storageTankThermalConductivity: number;
  storageTankHeight: number;
  storageTankDiameter: number;
  fluidInitTemp: number;
  fluidFinalTemp: number | null;
}

export interface ResultsSettings {
  numberOfIncrements: number | null;
}

export interface FormValues
  extends SolarPanelSettings,
    StorageTankSettings,
    ResultsSettings {}

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
  resultsSettingsErrors: boolean;
}
export interface SetGlobalFormErrors {
  name:
    | "solarPanelSettingsErrors"
    | "storageTankSettingsErrors"
    | "resultsSettingsErrors";
  error: boolean;
}

export interface SolarPanelSettingsErrors {
  shapeOfPanelError: string;
  panelWidthError: string;
  panelLengthError: string;
  panelDiameterError: string;
  panelEfficiencyError: string;
  solarFluxError: string;
}

export interface StorageTankSettingsErrors {
  storageTankThermalConductivityError: string;
  storageTankHeightError: string;
  storageTankDiameterError: string;
  fluidInitTempError: string;
  fluidFinalTempError: string;
}

export interface ResultsSettingsErrors {
  numberOfIncrementsError: string;
}

export interface SimulationStatus {
  status: "waiting" | "inProgress" | "complete";
}
