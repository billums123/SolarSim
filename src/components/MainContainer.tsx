import { useState } from "react";
import { Box } from "@mui/material";
import CanvasContainer from "./CanvasContainer";
import InputsContainer from "./InputsContainer";
import "../stylesheets/main-container.css";
import { FormValues } from "../types";

const MainContainer = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    shapeOfPanel: "rectangle",
    panelWidth: 1,
    panelLength: 1,
    panelDiameter: 1,
    panelEfficiency: 0.15,
    time: 0,
    storageTank: 1,
    solarFlux: 1000,
    fluidInitTemp: 20,
    fluidFinalTemp: 20,
  });

  const handleFormChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <Box component="div" className="main-container">
      <InputsContainer
        formValues={formValues}
        handleFormChange={handleFormChange}
      />
      <CanvasContainer formValues={formValues} />
    </Box>
  );
};

export default MainContainer;
