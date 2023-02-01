import {
  EnergyRequiredResults,
  FormValues,
  HeatTransferResults,
  RequiredTime,
  RequiredTimeResults,
  SolarPanelEnergy,
  StorageTankCapacity,
  StorageTankEnergyRequired,
  SurfaceArea,
} from "../types";

const heatTransferCalcs = (formValues: FormValues): HeatTransferResults => {
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
    numberOfIncrements,
  } = formValues;

  //Calculate surface area of solar panel (m^2)
  const panelSurfaceArea = calculateSolarPanelSurfaceArea({
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
    panelSurfaceArea,
    panelEfficiency,
    solarFlux,
  });

  //Calculate energy required to heat fluid in storage tank from initial temp to final temp (J)
  const energyRequiredToHeatTankFluid = calculateEnergyRequired({
    storageTankCapacity,
    fluidInitTemp,
    fluidFinalTemp,
    numberOfIncrements,
  });

  //Calculate the required time to heat fluid in tank to final temp (s)
  const requiredTime = calculateRequiredTime({
    energyRequiredToHeatTankFluid,
    solarPanelEnergyInput,
  });

  const results = {
    calculationComplete: true,
    panelSurfaceArea,
    storageTankCapacity,
    solarPanelEnergyInput,
    energyRequiredToHeatTankFluid,
    requiredTime,
  };

  return results;
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
  panelSurfaceArea,
  panelEfficiency,
  solarFlux,
}: SolarPanelEnergy) => {
  return (panelSurfaceArea * solarFlux * (panelEfficiency as number)) / 100;
};

const calculateEnergyRequired = ({
  storageTankCapacity,
  fluidInitTemp,
  fluidFinalTemp,
  numberOfIncrements,
}: StorageTankEnergyRequired) => {
  let densityWater = 997; // kg/m^3
  densityWater *= 1000; // g/m^3
  const specificHeatWater = 4.184; // J/g˚C
  const massOfWaterInTank = storageTankCapacity * densityWater; //convert storageTankCapacity to m^3 then calculate mass
  fluidInitTemp = Number(fluidInitTemp);
  fluidFinalTemp = Number(fluidFinalTemp);
  let currentFluidTemp = fluidInitTemp;

  const requiredEnergy: EnergyRequiredResults[] = [
    { step: 0, currentFluidTemp, energy: 0 },
  ];

  const stepIncrementVal =
    ((fluidFinalTemp as number) - fluidInitTemp) /
    (numberOfIncrements as number);

  for (let i = 0; i < (numberOfIncrements as number); i++) {
    const fluidTempSetPoint = currentFluidTemp + stepIncrementVal;
    const energy =
      massOfWaterInTank *
      specificHeatWater *
      (fluidTempSetPoint - currentFluidTemp);
    currentFluidTemp = fluidTempSetPoint;

    requiredEnergy.push({ step: i + 1, currentFluidTemp, energy });
  }

  return requiredEnergy;
};

const calculateRequiredTime = ({
  energyRequiredToHeatTankFluid,
  solarPanelEnergyInput,
}: RequiredTime) => {
  const timeResults: RequiredTimeResults[] = [];

  energyRequiredToHeatTankFluid.forEach((measurement) => {
    const time = measurement.energy / solarPanelEnergyInput;
    timeResults.push({ step: measurement.step, time });
  });

  return timeResults;
};

export default heatTransferCalcs;
