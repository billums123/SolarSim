import {
  ResultsSettings,
  ResultsSettingsErrors,
  SolarPanelSettings,
  SolarPanelSettingsErrors,
  StorageTankSettings,
  StorageTankSettingsErrors,
} from "../types";

const formControl = {
  solarPanelSettings: (
    {
      shapeOfPanel,
      panelWidth,
      panelLength,
      panelDiameter,
      panelEfficiency,
      solarFlux,
    }: SolarPanelSettings,
    handleSetSolarPanelFormErrors: (errors: SolarPanelSettingsErrors) => void
  ) => {
    const solarConstant = 1376; // W/m^2

    const errors = {
      shapeOfPanelError: "",
      panelWidthError: "",
      panelLengthError: "",
      panelDiameterError: "",
      panelEfficiencyError: "",
      solarFluxError: "",
    };
    const errorMessages = {
      panelDiameterErrorMessage: "Diameter must be greater than 0",
      panelWidthErrorMessage: "Width must be greater than 0",
      panelLengthErrorMessage: "Length must be greater than 0",
      panelEfficiencyErrorMessage:
        "Efficiency must be greater than 0% and less than 100%",
      solarFluxErrorMessage1: "Solar flux must be greater than or equal to 0",
      solarFluxErrorMessage2: `Solar Flux cannot exceed ${solarConstant} (the value of the solar constant)`,
      reset: "",
    };
    //  Circle Panel Error Handling
    if (shapeOfPanel === "circle") {
      errors.panelLengthError = errorMessages.reset;
      errors.panelWidthError = errorMessages.reset;
      if (!panelDiameter || panelDiameter <= 0)
        errors.panelDiameterError = errorMessages.panelDiameterErrorMessage;
    }
    //  Rectangle Panel Error Handling
    if (shapeOfPanel === "rectangle") {
      errors.panelDiameterError = errorMessages.reset;
      if (!panelWidth || panelWidth <= 0)
        errors.panelWidthError = errorMessages.panelWidthErrorMessage;
      if (!panelLength || panelLength <= 0)
        errors.panelLengthError = errorMessages.panelLengthErrorMessage;
    }

    if (!panelEfficiency || panelEfficiency <= 0 || panelEfficiency > 100)
      errors.panelEfficiencyError = errorMessages.panelEfficiencyErrorMessage;

    if (!solarFlux || solarFlux < 0)
      errors.solarFluxError = errorMessages.solarFluxErrorMessage1;
    if (solarFlux > solarConstant)
      errors.solarFluxError = errorMessages.solarFluxErrorMessage2;
    handleSetSolarPanelFormErrors(errors);
  },

  storageTankSettings: (
    {
      storageTankThermalConductivity,
      storageTankHeight,
      storageTankDiameter,
      fluidInitTemp,
      fluidFinalTemp,
    }: StorageTankSettings,
    handleSetStorageTankErrors: (errors: StorageTankSettingsErrors) => void
  ) => {
    const errors = {
      storageTankThermalConductivityError: "",
      storageTankHeightError: "",
      storageTankDiameterError: "",
      fluidInitTempError: "",
      fluidFinalTempError: "",
    };

    const errorMessages = {
      storageTankThermalConductivityErrorMessage:
        "Thermal conductivity must be greater than 0",
      storageTankHeightErrorMessage: "Tank Height must be greater than 0",
      storageTankDiameterErrorMessage: "Tank Diameter must be greater than 0",
      fluidInitTempErrorMessage:
        "Initial Fluid Temperature cannot be left blank",
      fluidFinalTempErrorMessage1:
        "Final Fluid Temperature cannot be left blank",
      fluidFinalTempErrorMessage2:
        "Final Fluid Temperature cannot be less than Initial Fluid Temperature",
    };

    if (!storageTankThermalConductivity || storageTankThermalConductivity <= 0)
      errors.storageTankThermalConductivityError =
        errorMessages.storageTankThermalConductivityErrorMessage;

    if (!storageTankHeight || storageTankHeight <= 0)
      errors.storageTankHeightError =
        errorMessages.storageTankHeightErrorMessage;

    if (!storageTankDiameter || storageTankDiameter <= 0)
      errors.storageTankDiameterError =
        errorMessages.storageTankDiameterErrorMessage;

    if (!fluidInitTemp)
      errors.fluidInitTempError = errorMessages.fluidInitTempErrorMessage;

    if (!fluidFinalTemp)
      errors.fluidFinalTempError = errorMessages.fluidFinalTempErrorMessage1;

    if (fluidFinalTemp && Number(fluidFinalTemp) < Number(fluidInitTemp))
      errors.fluidFinalTempError = errorMessages.fluidFinalTempErrorMessage2;

    handleSetStorageTankErrors(errors);
  },

  resultsSettings: (
    { numberOfIncrements }: ResultsSettings,
    handleSetSolarPanelFormErrors: (errors: ResultsSettingsErrors) => void
  ) => {
    const errors = {
      numberOfIncrementsError: "",
    };

    const errorMessages = {
      numberOfIncrementsErrorMessage1:
        "Number of intervals must be greater than 0 and less than or equal to 150 ",
      numberOfIncrementsErrorMessage2:
        "Number of intervals must be an integer value ",
      reset: "",
    };
    if (
      !numberOfIncrements ||
      numberOfIncrements > 150 ||
      numberOfIncrements <= 0
    ) {
      errors.numberOfIncrementsError =
        errorMessages.numberOfIncrementsErrorMessage1;
    }

    if (!Number.isInteger(Number(numberOfIncrements)))
      errors.numberOfIncrementsError =
        errorMessages.numberOfIncrementsErrorMessage2;
    handleSetSolarPanelFormErrors(errors);
  },
};

export default formControl;
