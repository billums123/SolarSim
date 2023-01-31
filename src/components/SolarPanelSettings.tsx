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
import { SolarPower as SolarPowerIcon } from "@mui/icons-material";
import { solarPanelFormControl } from "../utils/FormControl";
import { FormValues } from "../types";
import "../stylesheets/solar-panel-settings.css";

interface SolarPanelSettingsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
}
const SolarPanelSettings = ({
  formValues,
  handleFormChange,
}: SolarPanelSettingsProps) => {
  const {
    shapeOfPanel,
    panelWidth,
    panelLength,
    panelDiameter,
    panelEfficiency,
  } = formValues;

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<SolarPowerIcon sx={{ color: "secondary.main" }} />}
          sx={{ bgcolor: "primary.main" }}
        >
          <Typography>Solar Panel Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails className="solar-panel-details">
          <FormControl fullWidth>
            <InputLabel id="shape-label">Shape of Solar Panel</InputLabel>
            <Select
              labelId="shape-label"
              name="shapeOfPanel"
              value={shapeOfPanel}
              label="Shape of Solar Panel"
              onChange={handleFormChange}
            >
              <MenuItem value="rectangle">Rectangle</MenuItem>
              <MenuItem value="circle">Circle</MenuItem>
            </Select>
          </FormControl>
          {shapeOfPanel === "rectangle" ? (
            <>
              <Box component="div" sx={{ display: "flex" }}>
                <TextField
                  name="panelWidth"
                  label="Width"
                  type="number"
                  value={panelWidth}
                  onChange={handleFormChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="panelLength"
                  label="Length"
                  type="number"
                  value={panelLength}
                  onChange={handleFormChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          ) : (
            <TextField
              name="panelDiameter"
              label="Diameter"
              type="number"
              value={panelDiameter}
              onChange={handleFormChange}
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
          )}
          <TextField
            name="panelEfficiency"
            label="Panel Efficiency"
            type="number"
            value={panelEfficiency}
            onChange={handleFormChange}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SolarPanelSettings;
