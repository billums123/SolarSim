import { Box, TextField, Divider, Button, Paper } from "@mui/material";
import "../stylesheets/inputs.css";
import { FormValues } from "../types";
import SolarPanelSettings from "./SolarPanelSettings";
import StorageTankSettings from "./StorageTankSettings";

interface InputsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
}

const Inputs = ({ formValues, handleFormChange }: InputsProps) => {
  const { solarFlux } = formValues;
  return (
    <Box component="div" className="inputs">
      <Paper elevation={3} className="inputs-group">
        <SolarPanelSettings
          formValues={formValues}
          handleFormChange={handleFormChange}
        />
        <StorageTankSettings
          formValues={formValues}
          handleFormChange={handleFormChange}
        />
        {/* <TextField
          name="solarFlux"
          label="Solar Flux"
          type="number"
          value={solarFlux}
          onChange={handleFormChange}
          sx={{ width: "100%" }}
        /> */}
      </Paper>
      <Box component="div" className="run-simulation">
        <Button variant="contained" sx={{ color: "secondary.main" }}>
          RUN SIMULATION
        </Button>
      </Box>
    </Box>
  );
};

export default Inputs;
