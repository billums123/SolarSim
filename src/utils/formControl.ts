import {
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
    }: SolarPanelSettings,
    handleSetSolarPanelFormErrors: (errors: SolarPanelSettingsErrors) => void
  ) => {
    const errors = {
      shapeOfPanelError: "",
      panelWidthError: "",
      panelLengthError: "",
      panelDiameterError: "",
      panelEfficiencyError: "",
    };

    const errorMessages = {
      panelDiameterErrorMessage: "Diameter must be greater than 0",
      panelWidthErrorMessage: "Width must be greater than 0",
      panelLengthErrorMessage: "Length must be greater than 0",
      panelEfficiencyErrorMessage:
        "Efficiency must be greater than 0 and less than 100",
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

    if (fluidFinalTemp && fluidFinalTemp < fluidInitTemp)
      errors.fluidFinalTempError = errorMessages.fluidFinalTempErrorMessage2;

    handleSetStorageTankErrors(errors);
  },
};

export default formControl;
