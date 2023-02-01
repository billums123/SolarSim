import { Box, Divider, Button, Paper, CircularProgress } from "@mui/material";
import { useState } from "react";
import "../stylesheets/inputs.css";
import { FormValues, GlobalFormErrors, SetGlobalFormErrors } from "../types";
import SolarPanelSettings from "./SolarPanelSettings";
import StorageTankSettings from "./StorageTankSettings";

interface InputsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
  handleRunSimulation: () => void;
  simulationStatus: boolean;
  handleOpenResultsModal: () => void;
}

const Inputs = ({
  formValues,
  handleFormChange,
  handleRunSimulation,
  simulationStatus,
  handleOpenResultsModal,
}: InputsProps) => {
  const { solarFlux } = formValues;

  const [globalFormErrors, setGlobalFormErrors] = useState<GlobalFormErrors>({
    solarPanelSettingsErrors: true,
    storageTankSettingsErrors: true,
  });

  const handleSetGlobalFormErrors = async ({
    name,
    error,
  }: SetGlobalFormErrors) => {
    await setGlobalFormErrors({ ...globalFormErrors, [name]: error });
  };

  return (
    <Box component="div" className="inputs">
      <Paper elevation={3} className="inputs-group">
        <SolarPanelSettings
          formValues={formValues}
          handleFormChange={handleFormChange}
          globalFormErrors={globalFormErrors}
          handleSetGlobalFormErrors={handleSetGlobalFormErrors}
        />
        <StorageTankSettings
          formValues={formValues}
          handleFormChange={handleFormChange}
          globalFormErrors={globalFormErrors}
          handleSetGlobalFormErrors={handleSetGlobalFormErrors}
        />
      </Paper>
      <Box component="div" className="run-simulation">
        <Button
          size="large"
          disabled={
            Object.values(globalFormErrors).some(
              (globalFormError) => globalFormError === true
            ) || simulationStatus
          }
          variant="contained"
          onClick={handleRunSimulation}
          sx={{ color: "secondary.main", minWidth: 200 }}
          endIcon={
            simulationStatus && (
              <CircularProgress size={24} sx={{ color: "primary.main" }} />
            )
          }
        >
          {simulationStatus ? "" : "RUN SIMULATION"}
        </Button>
        <Button onClick={handleOpenResultsModal}>MODAL</Button>
      </Box>
    </Box>
  );
};

export default Inputs;
