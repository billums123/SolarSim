import { Box } from "@mui/material";
import Canvas from "./Canvas";
import "../stylesheets/canvas-container.css";
import { FormValues } from "../types";

interface CanvasContainerProps {
  formValues: FormValues;
}

const CanvasContainer = ({ formValues }: CanvasContainerProps) => {
  return (
    <Box component="div" className="canvas-container">
      <Canvas formValues={formValues} />
    </Box>
  );
};

export default CanvasContainer;
