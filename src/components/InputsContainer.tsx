import { Box, Paper } from "@mui/material";
import Inputs from "./Inputs";
import "../stylesheets/inputs-container.css";
import { FormValues } from "../types";

interface InputsContainerProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
}

const InputsContainer = ({
  formValues,
  handleFormChange,
}: InputsContainerProps) => {
  return (
    <Paper elevation={10} className="inputs-container">
      <Inputs formValues={formValues} handleFormChange={handleFormChange} />
    </Paper>
  );
};

export default InputsContainer;
