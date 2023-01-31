import { Box } from "@mui/material";
import { Canvas as CanvasElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../stylesheets/canvas.css";
import { FormValues } from "../types";

interface CanvasProps {
  formValues: FormValues;
}

const Canvas = ({ formValues }: CanvasProps) => {
  const {
    shapeOfPanel,
    panelWidth,
    panelLength,
    panelDiameter,
    storageTankHeight,
    storageTankDiameter,
  } = formValues;
  return (
    <Box component="div" className="canvas">
      <CanvasElement shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 5, 5]} />
          {shapeOfPanel === "rectangle" ? (
            <mesh rotation={[Math.PI * (1 / 2), 0, 0]} position={[0, 0, -1]}>
              <boxGeometry args={[panelWidth, 0.1, panelLength]} />
              <meshStandardMaterial />
              <OrbitControls enablePan={false} enableRotate={false} />
            </mesh>
          ) : (
            <mesh rotation={[Math.PI * (1 / 2), 0, 0]} position={[0, 0, -1]}>
              <cylinderGeometry
                args={[panelDiameter / 2, panelDiameter / 2, 0.1]}
              />
              <meshStandardMaterial />
              <OrbitControls enablePan={false} enableRotate={false} />
            </mesh>
          )}
          <mesh position={[0, 0, 3]}>
            <cylinderGeometry
              args={[
                storageTankDiameter / 2,
                storageTankDiameter / 2,
                storageTankHeight,
              ]}
            />
            <meshStandardMaterial />
            <OrbitControls enablePan={false} enableRotate={false} />
          </mesh>
        </>
      </CanvasElement>
    </Box>
  );
};

export default Canvas;
