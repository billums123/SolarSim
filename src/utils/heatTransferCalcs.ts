import {
  FormValues,
  SolarPanelEnergy,
  StorageTankCapacity,
  StorageTankEnergyRequired,
  SurfaceArea,
} from "../types";

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

  //Calculate storage tanks capacity (m^3)
  const storageTankCapacity = calculateStorageTankCapacity({
    storageTankDiameter,
    storageTankHeight,
  });

  //Calculate energy produced my solar panel (W)
  const solarPanelEnergyInput = calculateSolarPanelEnergy({
    surfaceArea,
    panelEfficiency,
    solarFlux,
  });

  //Calculate energy required to heat fluid in storage tank from initial temp to final temp
  const energyRequiredToHeatTankFluid = calculateEnergyRequired({
    storageTankCapacity,
    fluidInitTemp,
    fluidFinalTemp,
  });

  const requiredTime = energyRequiredToHeatTankFluid / solarPanelEnergyInput;
  console.log("SURFACE AREA", surfaceArea);
  console.log("STORAGE TANK CAP", storageTankCapacity);
  console.log("SOLAR ENERGY", solarPanelEnergyInput);
  console.log("HEATING ENERGY", energyRequiredToHeatTankFluid);
  console.log("REQUIRED TIME", requiredTime);
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

const calculateStorageTankCapacity = ({
  storageTankDiameter,
  storageTankHeight,
}: StorageTankCapacity) => {
  return (
    (1 / 4) * Math.PI * Math.pow(storageTankDiameter, 2) * storageTankHeight
  );
};

const calculateSolarPanelEnergy = ({
  surfaceArea,
  panelEfficiency,
  solarFlux,
}: SolarPanelEnergy) => {
  return (surfaceArea * solarFlux * (panelEfficiency as number)) / 100;
};

const calculateEnergyRequired = ({
  storageTankCapacity,
  fluidInitTemp,
  fluidFinalTemp,
}: StorageTankEnergyRequired) => {
  let densityWater = 997; // kg/m^3
  densityWater *= 1000; // g/m^3
  const specificHeatWater = 4.184; // J/g˚C
  const massOfWaterInTank = storageTankCapacity * densityWater; //convert storageTankCapacity to m^3 then calculate mass
  return (
    massOfWaterInTank *
    specificHeatWater *
    ((fluidFinalTemp as number) - fluidInitTemp)
  );
};

export default heatTransferCalcs;
