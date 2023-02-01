import { Box, Paper } from "@mui/material";
import Inputs from "./Inputs";
import "../stylesheets/inputs-container.css";
import { FormValues, SimulationStatus } from "../types";

interface InputsContainerProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
  handleRunSimulation: () => void;
  simulationStatus: SimulationStatus;
  handleOpenResultsModal: () => void;
  handleResetSimulation: () => void;
}

const InputsContainer = ({
  formValues,
  handleFormChange,
  handleRunSimulation,
  simulationStatus,
  handleOpenResultsModal,
  handleResetSimulation,
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
        handleOpenResultsModal={handleOpenResultsModal}
        handleResetSimulation={handleResetSimulation}
      />
    </Paper>
  );
};

export default InputsContainer;
