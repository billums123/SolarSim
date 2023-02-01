import { useState } from "react";
import { Box } from "@mui/material";
import CanvasContainer from "./CanvasContainer";
import InputsContainer from "./InputsContainer";
import "../stylesheets/main-container.css";
import { FormValues } from "../types";

const MainContainer = () => {
  const [simulationStatus, setSimulationStatus] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    shapeOfPanel: "rectangle",
    panelWidth: 1,
    panelLength: 1,
    panelDiameter: 1,
    panelEfficiency: null,
    time: 0,
    storageTankCapacity: 1,
    solarFlux: 1000,
    storageTankThermalConductivity: 0.5,
    storageTankHeight: 1,
    storageTankDiameter: 1,
    fluidInitTemp: 20,
    fluidFinalTemp: null,
  });

  const handleFormChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleRunSimulation = () => {
    console.log("RUNNING SIMULATION)");
    setSimulationStatus(true);
    setTimeout(() => {
      setSimulationStatus(false);
    }, 3000);
  };

  return (
    <Box component="div" className="main-container">
      <InputsContainer
        formValues={formValues}
        handleFormChange={handleFormChange}
        handleRunSimulation={handleRunSimulation}
        simulationStatus={simulationStatus}
      />
      <CanvasContainer formValues={formValues} />
    </Box>
  );
};

export default MainContainer;
