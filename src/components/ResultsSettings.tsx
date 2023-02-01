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
import "../stylesheets/results-settings.css";
import React, { useState, useEffect } from "react";
import formControl from "../utils/formControl";

interface StorageTankSettingsProps {
  formValues: FormValues;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  globalFormErrors: GlobalFormErrors;
  handleSetGlobalFormErrors: ({ name, error }: SetGlobalFormErrors) => void;
}
const ResultsSettings = ({
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
      <Accordion className="results-settings">
        <AccordionSummary
          expandIcon={<PropaneTankIcon sx={{ color: "secondary.main" }} />}
          sx={{
            bgcolor: globalFormErrors.storageTankSettingsErrors
              ? "error.main"
              : "success.main",

            ":hover": {
              bgcolor: globalFormErrors.storageTankSettingsErrors
                ? "error.light"
                : "success.light",
            },
            ":focus": {
              bgcolor: globalFormErrors.storageTankSettingsErrors
                ? "error.light"
                : "success.light",
            },
          }}
        >
          <Typography>Results Settings</Typography>
        </AccordionSummary>
        <AccordionDetails className="results-details">
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
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ResultsSettings;
