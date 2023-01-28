import { Box } from "@mui/material";
import CanvasContainer from "./CanvasContainer";
import InputsContainer from "./InputsContainer";
const App = () => {
  return (
    <Box className="app">
      <InputsContainer />
      <CanvasContainer />
    </Box>
  );
};

export default App;
