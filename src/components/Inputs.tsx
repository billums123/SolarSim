import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { RestartAlt as RestartAltIcon } from "@mui/icons-material/";
import "../stylesheets/inputs.css";
import {
  FormValues,
  GlobalFormErrors,
  SetGlobalFormErrors,
  SimulationStatus,
} from "../types";
import SolarPanelSettings from "./SolarPanelSettings";
import StorageTankSettings from "./StorageTankSettings";

interface InputsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
  handleRunSimulation: () => void;
  simulationStatus: SimulationStatus;
  handleOpenResultsModal: () => void;
  handleResetSimulation: () => void;
}

const Inputs = ({
  formValues,
  handleFormChange,
  handleRunSimulation,
  simulationStatus,
  handleOpenResultsModal,
  handleResetSimulation,
}: InputsProps) => {
  const { solarFlux } = formValues;

  const [globalFormErrors, setGlobalFormErrors] = useState<GlobalFormErrors>({
    solarPanelSettingsErrors: true,
    storageTankSettingsErrors: true,
  });

  const handleSetGlobalFormErrors = ({ name, error }: SetGlobalFormErrors) => {
    setGlobalFormErrors({ ...globalFormErrors, [name]: error });
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
        {simulationStatus.status !== "complete" ? (
          <Button
            size="large"
            disabled={
              Object.values(globalFormErrors).some(
                (globalFormError) => globalFormError === true
              ) || simulationStatus.status === "inProgress"
            }
            variant="contained"
            onClick={handleRunSimulation}
            sx={{ color: "secondary.main", minWidth: 200 }}
            endIcon={
              simulationStatus.status === "inProgress" && (
                <CircularProgress size={24} sx={{ color: "primary.main" }} />
              )
            }
          >
            {simulationStatus.status === "inProgress" ? "" : "RUN SIMULATION"}
          </Button>
        ) : (
          <Box component="div" className="results-buttons">
            <IconButton
              sx={{
                color: "primary.main",
                bgcolor: "primary.contrastText",
                boxShadow: 3,
                ":hover": {
                  bgcolor: "secondary.main",
                },
              }}
              onClick={handleResetSimulation}
            >
              <RestartAltIcon />
            </IconButton>
            <Button
              size="large"
              variant="contained"
              onClick={handleOpenResultsModal}
              sx={{
                color: "secondary.main",
                bgcolor: "success.main",
                minWidth: 125,
                ":hover": {
                  bgcolor: "success.dark",
                },
              }}
            >
              Show Results
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Inputs;
