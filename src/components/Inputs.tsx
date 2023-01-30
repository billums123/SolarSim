import { Box, TextField } from "@mui/material";
import "../stylesheets/inputs.css";
import { FormValues } from "../types";
import SolarPanelSettings from "./SolarPanelSettings";

interface InputsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
}

const Inputs = ({ formValues, handleFormChange }: InputsProps) => {
  const { solarFlux } = formValues;
  return (
    <Box component="div" className="inputs">
      <Box component="div" className="solar-panel-group">
        <SolarPanelSettings
          formValues={formValues}
          handleFormChange={handleFormChange}
        />
        {/* <Divider light sx={{ width: "75%" }} /> */}
        <TextField
          name="solarFlux"
          label="Solar Flux"
          type="number"
          value={solarFlux}
          onChange={handleFormChange}
          sx={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default Inputs;
