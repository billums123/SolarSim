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
import formControl from "../utils/formControl";
import { FormValues, SolarPanelSettingsErrors } from "../types";
import "../stylesheets/solar-panel-settings.css";
import { useEffect, useState } from "react";

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

  const [errorsExist, setErrorsExist] = useState(true);

  const [solarPanelFormErrors, setSolarPanelFormErrors] =
    useState<SolarPanelSettingsErrors>({
      shapeOfPanelError: "",
      panelWidthError: "",
      panelLengthError: "",
      panelDiameterError: "",
      panelEfficiencyError: "error",
    });

  const handleCheckIfAnyErrorsExist = () => {
    const errorsExist = Object.values(solarPanelFormErrors).some(
      (formError) => formError.length
    );
    console.log(solarPanelFormErrors);
    errorsExist ? setErrorsExist(true) : setErrorsExist(false);
  };

  const handleSetSolarPanelFormErrors = (errors: SolarPanelSettingsErrors) => {
    setSolarPanelFormErrors(errors);
    return;
  };

  useEffect(() => {
    formControl.solarPanelSettings(
      {
        shapeOfPanel,
        panelWidth,
        panelLength,
        panelDiameter,
        panelEfficiency,
      },
      handleSetSolarPanelFormErrors
    );
  }, [formValues]);

  useEffect(() => {
    handleCheckIfAnyErrorsExist();
  }, [solarPanelFormErrors]);

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<SolarPowerIcon sx={{ color: "secondary.main" }} />}
          sx={{ bgcolor: errorsExist ? "error.main" : "success.main" }}
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
                  error={solarPanelFormErrors.panelWidthError.length > 0}
                  helperText={solarPanelFormErrors.panelWidthError}
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
                  error={solarPanelFormErrors.panelLengthError.length > 0}
                  helperText={solarPanelFormErrors.panelLengthError}
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
              error={solarPanelFormErrors.panelDiameterError.length > 0}
              helperText={solarPanelFormErrors.panelDiameterError}
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
            placeholder="15"
            value={panelEfficiency}
            onChange={handleFormChange}
            error={solarPanelFormErrors.panelEfficiencyError.length > 0}
            helperText={solarPanelFormErrors.panelEfficiencyError}
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
