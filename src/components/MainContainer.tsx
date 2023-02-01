import { useState } from "react";
import { Box } from "@mui/material";
import CanvasContainer from "./CanvasContainer";
import InputsContainer from "./InputsContainer";
import "../stylesheets/main-container.css";
import { FormValues, HeatTransferResults } from "../types";
import Results from "./Results";
import heatTransferCalcs from "../utils/heatTransferCalcs";

const MainContainer = () => {
  const [simulationStatus, setSimulationStatus] = useState(false);

  const [heatTransferResults, setHeatTransferResults] =
    useState<HeatTransferResults>({
      calculationComplete: false,
      panelSurfaceArea: null,
      storageTankCapacity: null,
      solarPanelEnergyInput: null,
      energyRequiredToHeatTankFluid: null,
      requiredTime: null,
    });

  const [formValues, setFormValues] = useState<FormValues>({
    shapeOfPanel: "rectangle",
    panelWidth: 1,
    panelLength: 1,
    panelDiameter: 1,
    panelEfficiency: null,
    time: 0,
    solarFlux: 1000,
    storageTankThermalConductivity: 0.5,
    storageTankHeight: 1,
    storageTankDiameter: 1,
    fluidInitTemp: 20,
    fluidFinalTemp: null,
    numberOfIncrements: 10,
  });

  const handleFormChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleRunSimulation = () => {
    setSimulationStatus(true);
    const results = heatTransferCalcs(formValues);
    setTimeout(() => {
      setSimulationStatus(false);
      setHeatTransferResults(results);
    }, 2000);
  };

  return (
    <Box component="div" className="main-container">
      <InputsContainer
        formValues={formValues}
        handleFormChange={handleFormChange}
        handleRunSimulation={handleRunSimulation}
        simulationStatus={simulationStatus}
      />
      <Results heatTransferResults={heatTransferResults} />
      {/* <CanvasContainer formValues={formValues} /> */}
    </Box>
  );
};

export default MainContainer;
