import { SolarPanelSettings, SolarPanelSettingsErrors } from "../types";

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

    if (panelEfficiency <= 0 || panelEfficiency > 100)
      errors.panelEfficiencyError = errorMessages.panelEfficiencyErrorMessage;

    handleSetSolarPanelFormErrors(errors);
  },
};

export default formControl;
