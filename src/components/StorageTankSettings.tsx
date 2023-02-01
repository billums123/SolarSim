import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { PropaneTank as PropaneTankIcon } from "@mui/icons-material";
import {
  FormValues,
  GlobalFormErrors,
  SetGlobalFormErrors,
  StorageTankSettingsErrors,
} from "../types";
import "../stylesheets/storage-tank-settings.css";
import React, { useState, useEffect } from "react";
import formControl from "../utils/formControl";

interface StorageTankSettingsProps {
  formValues: FormValues;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  globalFormErrors: GlobalFormErrors;
  handleSetGlobalFormErrors: ({ name, error }: SetGlobalFormErrors) => void;
}
const StorageTankSettings = ({
  formValues,
  handleFormChange,
  globalFormErrors,
  handleSetGlobalFormErrors,
}: StorageTankSettingsProps) => {
  const {
    storageTankThermalConductivity,
    storageTankHeight,
    storageTankDiameter,
    fluidInitTemp,
    fluidFinalTemp,
  } = formValues;

  const [storageTankFormErrors, setStorageTankFormErrors] =
    useState<StorageTankSettingsErrors>({
      storageTankThermalConductivityError: "",
      storageTankHeightError: "",
      storageTankDiameterError: "",
      fluidInitTempError: "",
      fluidFinalTempError: "error",
    });

  const handleCheckIfAnyErrorsExist = () => {
    const errorsExist = Object.values(storageTankFormErrors).some(
      (formError) => formError.length
    );
    errorsExist
      ? handleSetGlobalFormErrors({
          name: "storageTankSettingsErrors",
          error: true,
        })
      : handleSetGlobalFormErrors({
          name: "storageTankSettingsErrors",
          error: false,
        });
  };

  const handleSetstorageTankFormErrors = (
    errors: StorageTankSettingsErrors
  ) => {
    setStorageTankFormErrors(errors);
    return;
  };

  useEffect(() => {
    formControl.storageTankSettings(
      {
        storageTankThermalConductivity,
        storageTankHeight,
        storageTankDiameter,
        fluidInitTemp,
        fluidFinalTemp,
      },
      handleSetstorageTankFormErrors
    );
  }, [
    storageTankThermalConductivity,
    storageTankHeight,
    storageTankDiameter,
    fluidInitTemp,
    fluidFinalTemp,
  ]);

  useEffect(() => {
    handleCheckIfAnyErrorsExist();
  }, [storageTankFormErrors]);

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<PropaneTankIcon sx={{ color: "secondary.main" }} />}
          sx={{
            bgcolor: globalFormErrors.storageTankSettingsErrors
              ? "error.main"
              : "success.main",
          }}
        >
          <Typography>Storage Tank Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails className="storage-tank-details">
          <TextField
            name="storageTankThermalConductivity"
            label="Thermal Conductivity of Tank"
            type="number"
            value={storageTankThermalConductivity}
            placeholder="0.5"
            onChange={handleFormChange}
            error={
              storageTankFormErrors.storageTankThermalConductivityError.length >
              0
            }
            helperText={
              storageTankFormErrors.storageTankThermalConductivityError
            }
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
              error={storageTankFormErrors.storageTankHeightError.length > 0}
              helperText={storageTankFormErrors.storageTankHeightError}
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
              error={storageTankFormErrors.storageTankDiameterError.length > 0}
              helperText={storageTankFormErrors.storageTankDiameterError}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
          </Box>
          <TextField
            variant="standard"
            name="storageTankCapacity"
            label="Storage Tank Capacity"
            disabled
            value={(
              (Math.PI / 4) *
              Math.pow(storageTankDiameter, 2) *
              storageTankHeight *
              1000
            ).toFixed(2)}
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
            error={storageTankFormErrors.fluidInitTempError.length > 0}
            helperText={storageTankFormErrors.fluidInitTempError}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">˚C</InputAdornment>,
            }}
          />
          <TextField
            name="fluidFinalTemp"
            label="Desired Final Fluid Temperature"
            type="number"
            value={fluidFinalTemp ? fluidFinalTemp : ""}
            onChange={handleFormChange}
            error={storageTankFormErrors.fluidFinalTempError.length > 0}
            helperText={storageTankFormErrors.fluidFinalTempError}
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
