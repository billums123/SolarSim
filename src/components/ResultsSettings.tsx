import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  FormValues,
  GlobalFormErrors,
  ResultsSettingsErrors,
  SetGlobalFormErrors,
  StorageTankSettingsErrors,
} from "../types";
import "../stylesheets/results-settings.css";
import React, { useState, useEffect } from "react";
import formControl from "../utils/formControl";

interface ResultsSettingsProps {
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
}: ResultsSettingsProps) => {
  const { numberOfIncrements } = formValues;

  const [resultsFormErrors, setResultsFormErrors] =
    useState<ResultsSettingsErrors>({
      numberOfIncrementsError: "error",
    });

  const handleCheckIfAnyErrorsExist = () => {
    const errorsExist = Object.values(resultsFormErrors).some(
      (formError) => formError.length
    );
    errorsExist
      ? handleSetGlobalFormErrors({
          name: "resultsSettingsErrors",
          error: true,
        })
      : handleSetGlobalFormErrors({
          name: "resultsSettingsErrors",
          error: false,
        });
  };

  const handleSetResultsFormErrors = (errors: ResultsSettingsErrors) => {
    setResultsFormErrors(errors);
    return;
  };

  useEffect(() => {
    formControl.resultsSettings(
      {
        numberOfIncrements,
      },
      handleSetResultsFormErrors
    );
  }, [numberOfIncrements]);

  useEffect(() => {
    handleCheckIfAnyErrorsExist();
  }, [resultsFormErrors]);

  return (
    <>
      <Accordion className="results-settings">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "secondary.main" }} />}
          sx={{
            bgcolor: globalFormErrors.resultsSettingsErrors
              ? "error.main"
              : "success.main",

            ":hover": {
              bgcolor: globalFormErrors.resultsSettingsErrors
                ? "error.light"
                : "success.light",
            },
            ":focus": {
              bgcolor: globalFormErrors.resultsSettingsErrors
                ? "error.light"
                : "success.light",
            },
          }}
        >
          <Typography>Results Settings</Typography>
        </AccordionSummary>
        <AccordionDetails className="results-details">
          <TextField
            name="numberOfIncrements"
            label="Number of Intervals in Results"
            type="number"
            value={numberOfIncrements ? numberOfIncrements : ""}
            onChange={handleFormChange}
            error={resultsFormErrors.numberOfIncrementsError.length > 0}
            helperText={resultsFormErrors.numberOfIncrementsError}
            sx={{ width: "100%" }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ResultsSettings;
