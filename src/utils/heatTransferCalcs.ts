import { FormValues, SolarPanelEnergy, SurfaceArea } from "../types";

const heatTransferCalcs = (formValues: FormValues) => {
  const {
    shapeOfPanel,
    panelWidth,
    panelLength,
    panelDiameter,
    panelEfficiency,
    storageTankThermalConductivity,
    storageTankHeight,
    storageTankDiameter,
    fluidInitTemp,
    fluidFinalTemp,
    solarFlux,
  } = formValues;

  //Calculate surface area of solar panel (m^2)
  const surfaceArea = calculateSolarPanelSurfaceArea({
    shapeOfPanel,
    panelDiameter,
    panelWidth,
    panelLength,
  });

  //Calculate energy produced my solar panel (W)
  const solarPanelEnergyInput = calculateSolarPanelEnergy({
    surfaceArea,
    panelEfficiency,
    solarFlux,
  });
};

const calculateSolarPanelSurfaceArea = ({
  shapeOfPanel,
  panelDiameter,
  panelWidth,
  panelLength,
}: SurfaceArea) => {
  if (shapeOfPanel === "circle")
    return (1 / 4) * Math.PI * Math.pow(panelDiameter, 2);
  else return panelWidth * panelLength;
};

const calculateSolarPanelEnergy = ({
  surfaceArea,
  panelEfficiency,
  solarFlux,
}: SolarPanelEnergy) => {
  return surfaceArea * solarFlux * (panelEfficiency as number);
};

export default heatTransferCalcs;
