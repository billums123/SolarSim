import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputAdornment,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { PropaneTank as PropaneTankIcon } from "@mui/icons-material";
import { FormValues } from "../types";
import "../stylesheets/storage-tank-settings.css";

interface StorageTankSettingsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
}
const StorageTankSettings = ({
  formValues,
  handleFormChange,
}: StorageTankSettingsProps) => {
  const {
    storageTankThermalConductivity,
    storageTankHeight,
    storageTankDiameter,
    fluidInitTemp,
    fluidFinalTemp,
  } = formValues;

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<PropaneTankIcon sx={{ color: "secondary.main" }} />}
          sx={{ bgcolor: "primary.main" }}
        >
          <Typography>Storage Tank Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails className="storage-tank-details">
          <TextField
            name="storageTankThermalConductivity"
            label="Thermal Conductivity of Tank"
            type="number"
            value={storageTankThermalConductivity}
            onChange={handleFormChange}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">W/mK</InputAdornment>
              ),
            }}
          />
          <Box component="div" sx={{ display: "flex" }}>
            <TextField
              name="storageTankHeight"
              label="Tank Height"
              type="number"
              value={storageTankHeight}
              onChange={handleFormChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
            <TextField
              name="storageTankDiameter"
              label="Tank Diameter"
              type="number"
              value={storageTankDiameter}
              onChange={handleFormChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
          </Box>
          <TextField
            name="storageTankCapacity"
            label="Storage Tank Capacity"
            type="number"
            disabled
            value={(
              (Math.PI / 4) *
              Math.pow(storageTankDiameter, 2) *
              storageTankHeight *
              1000
            ).toFixed(2)}
            onChange={handleFormChange}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">L</InputAdornment>,
              readOnly: true,
            }}
          />
          <TextField
            name="fluidInitTemp"
            label="Initial Fluid Temperature"
            type="number"
            value={fluidInitTemp}
            onChange={handleFormChange}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">˚C</InputAdornment>,
            }}
          />
          <TextField
            name="fluidFinalTemp"
            label="Desired Final Fluid Temperature"
            type="number"
            value={fluidFinalTemp ? fluidFinalTemp : " "}
            onChange={handleFormChange}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">˚C</InputAdornment>,
            }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default StorageTankSettings;
