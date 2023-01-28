import { Box } from "@mui/material";
import Canvas from "./Canvas";
import "./stylesheets/canvas-container.css";

const CanvasContainer = () => {
  return (
    <Box className="canvas-container">
      <Canvas width={4} height={4} />
    </Box>
  );
};

export default CanvasContainer;
