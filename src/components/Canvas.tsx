import { Box } from "@mui/material";
import { Canvas as CanvasElement, useLoader } from "@react-three/fiber";
import { RepeatWrapping } from "three";
import { OrbitControls, Sky } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import "../stylesheets/canvas.css";
import { FormValues } from "../types";
// import image from "../assets/textures/solar_panel_ao.jpg";

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
  const solarPanelTexture = useLoader(
    TextureLoader,
    "./src/assets/textures/solar_panel_color.jpg"
  );

  if (shapeOfPanel === "rectangle") {
    solarPanelTexture.repeat.x = panelWidth > 0 ? panelWidth : 1;
    solarPanelTexture.repeat.y = panelLength > 0 ? panelLength : 1;
  } else {
    solarPanelTexture.repeat.x = Number(panelDiameter);
    solarPanelTexture.repeat.y = Number(panelDiameter);
  }
  solarPanelTexture.wrapS = RepeatWrapping;
  solarPanelTexture.wrapT = RepeatWrapping;

  return (
    <Box component="div" className="canvas">
      <CanvasElement shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 5, 5]} />
          {shapeOfPanel === "rectangle" ? (
            <mesh rotation={[Math.PI * (1 / 2), 0, 0]} position={[0, 0, -1]}>
              <boxGeometry
                args={[
                  panelWidth > 0 ? panelWidth : 1,
                  0.1,
                  panelLength > 0 ? panelLength : 1,
                ]}
              />
              <meshStandardMaterial map={solarPanelTexture} />
              <OrbitControls enablePan={false} enableRotate={false} />
            </mesh>
          ) : (
            <mesh rotation={[Math.PI * (1 / 2), 0, 0]} position={[0, 0, -1]}>
              <cylinderGeometry
                args={[
                  panelDiameter > 0 ? panelDiameter / 2 : 0.5,
                  panelDiameter > 0 ? panelDiameter / 2 : 0.5,
                  0.1,
                ]}
              />
              <meshStandardMaterial map={solarPanelTexture} />
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
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
      </CanvasElement>
    </Box>
  );
};

export default Canvas;
