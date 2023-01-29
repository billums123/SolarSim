import { Box } from "@mui/material";
import Inputs from "./Inputs";
import "./stylesheets/inputs-container.css";

const InputsContainer = () => {
  return (
    <Box component="div" className="inputs-container" bgcolor="primary.main">
      <Inputs />
    </Box>
  );
};

export default InputsContainer;
