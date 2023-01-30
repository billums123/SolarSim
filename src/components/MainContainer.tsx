import { Box } from "@mui/material";
import CanvasContainer from "./CanvasContainer";
import InputsContainer from "./InputsContainer";
import "../stylesheets/main-container.css";

const MainContainer = () => {
  return (
    <Box component="div" className="main-container">
      <InputsContainer />
      <CanvasContainer />
    </Box>
  );
};

export default MainContainer;
