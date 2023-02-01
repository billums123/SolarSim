import { Box, Paper } from "@mui/material";
import Inputs from "./Inputs";
import "../stylesheets/inputs-container.css";
import { FormValues } from "../types";

interface InputsContainerProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
  handleRunSimulation: () => void;
  simulationStatus: boolean;
}

const InputsContainer = ({
  formValues,
  handleFormChange,
  handleRunSimulation,
  simulationStatus,
}: InputsContainerProps) => {
  return (
    <Paper
      sx={{ bgcolor: "secondary.light" }}
      elevation={10}
      className="inputs-container"
    >
      <Inputs
        formValues={formValues}
        handleFormChange={handleFormChange}
        handleRunSimulation={handleRunSimulation}
        simulationStatus={simulationStatus}
      />
    </Paper>
  );
};

export default InputsContainer;
