import { Box, Fab } from "@mui/material";
import Canvas from "./Canvas";
import "../stylesheets/canvas-container.css";
import { FormValues } from "../types";
import { useEffect, useState } from "react";

interface CanvasContainerProps {
  formValues: FormValues;
}

const CanvasContainer = ({ formValues }: CanvasContainerProps) => {
  const breakpoint = 900;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
  }, []);

  return (
    <Box component="div" className="canvas-container">
      {screenWidth < breakpoint && (
        <Box component="div" className="scroll-to-top">
          <Fab variant="extended" onClick={() => window.scrollTo(0, 0)}>
            Back To Top
          </Fab>
        </Box>
      )}
      <Canvas formValues={formValues} />
    </Box>
  );
};

export default CanvasContainer;
