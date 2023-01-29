import { Box } from "@mui/material";
import { Canvas as CanvasElement } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./stylesheets/canvas.css";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  return (
    <Box component="div" className="canvas">
      <CanvasElement shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 5, 5]} />
        <mesh>
          <boxGeometry args={[width, height, 0.1]} />
          <meshStandardMaterial />
          {/* <OrbitControls makeDefault /> */}
          <OrbitControls enablePan={false} enableRotate={false} />
        </mesh>
      </CanvasElement>
    </Box>
  );
};

export default Canvas;
