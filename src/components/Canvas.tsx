import { Box } from "@mui/material";
import { Canvas as CanvasElement, useLoader } from "@react-three/fiber";
import { RepeatWrapping } from "three";
import { OrbitControls, Sky } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import "../stylesheets/canvas.css";
import { FormValues } from "../types";
import solarPanelTextureImage from "../assets/textures/solar_panel_color.jpg";
import metalTextureImage from "../assets/textures/storage_tank_color.jpg";

interface CanvasProps {
  formValues: FormValues;
}

const calculateDistBetweenTankAndPanel = (
  storageTankDiameter: number,
  maxDistance: number
) => {
  let storageTankDist = maxDistance;
  let solarPanelDist = -maxDistance;
  if (storageTankDiameter <= 0) return { storageTankDist, solarPanelDist };
  const storageTankRadius = storageTankDiameter / 2;
  storageTankDist = storageTankRadius + maxDistance / 2;
  solarPanelDist = -1 * (maxDistance / 2);
  return {
    storageTankDist,
    solarPanelDist,
  };
};

const Canvas = ({ formValues }: CanvasProps) => {
  const {
    shapeOfPanel,
    panelWidth,
    panelLength,
    panelDiameter,
    storageTankHeight,
    storageTankDiameter,
  } = formValues;
  const [solarPanelTexture, metalTexture] = useLoader(TextureLoader, [
    solarPanelTextureImage,
    metalTextureImage,
  ]);

  //SET UP SOLAR PANEL TEXTURE WRAPPING
  if (shapeOfPanel === "rectangle") {
    solarPanelTexture.repeat.x = panelWidth > 0 ? panelWidth : 1;
    solarPanelTexture.repeat.y = panelLength > 0 ? panelLength : 1;
  } else {
    solarPanelTexture.repeat.x = panelDiameter > 0 ? panelDiameter : 1;
    solarPanelTexture.repeat.y = panelDiameter > 0 ? panelDiameter : 1;
  }
  solarPanelTexture.wrapS = RepeatWrapping;
  solarPanelTexture.wrapT = RepeatWrapping;

  //SET UP METAL TEXTURE WRAPPING
  metalTexture.repeat.x = storageTankDiameter > 0 ? storageTankDiameter : 1;
  metalTexture.repeat.y = storageTankDiameter > 0 ? storageTankDiameter : 1;

  metalTexture.wrapS = RepeatWrapping;
  metalTexture.wrapT = RepeatWrapping;

  const maxDistance = 1; //max distance between the panel and tank
  const { storageTankDist, solarPanelDist } = calculateDistBetweenTankAndPanel(
    storageTankDiameter,
    maxDistance
  );

  return (
    <Box component="div" className="canvas">
      <CanvasElement shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
        <>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 5, 5]} />
          {shapeOfPanel === "rectangle" ? (
            // RECTANGLE SOLAR PANEL MESH
            <mesh
              rotation={[Math.PI * (1 / 2), 0, 0]}
              position={[0, 0, solarPanelDist]}
            >
              <boxGeometry
                args={[
                  panelWidth > 0 ? panelWidth : 1,
                  0.1,
                  panelLength > 0 ? panelLength : 1,
                ]}
              />
              <meshStandardMaterial map={solarPanelTexture} />
              <OrbitControls
                enablePan={false}
                enableRotate={false}
                maxDistance={750}
              />
            </mesh>
          ) : (
            // CIRCLE SOLAR PANEL MESH
            <mesh rotation={[Math.PI * (1 / 2), 0, 0]} position={[0, 0, -1]}>
              <cylinderGeometry
                args={[
                  panelDiameter > 0 ? panelDiameter / 2 : 0.5,
                  panelDiameter > 0 ? panelDiameter / 2 : 0.5,
                  0.1,
                ]}
              />
              <meshStandardMaterial map={solarPanelTexture} />
              <OrbitControls
                enablePan={false}
                enableRotate={false}
                maxDistance={750}
              />
            </mesh>
          )}

          {/* STORAGE TANK MESH */}
          <mesh position={[0, 0, storageTankDist]}>
            <cylinderGeometry
              args={[
                storageTankDiameter > 0 ? storageTankDiameter / 2 : 0.5,
                storageTankDiameter > 0 ? storageTankDiameter / 2 : 0.5,
                storageTankHeight > 0 ? storageTankHeight : 1,
              ]}
            />
            <meshStandardMaterial map={metalTexture} />
            <OrbitControls enablePan={false} enableRotate={false} />
          </mesh>

          {/* HORIZONTAL PIPE MESH */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI * (1 / 2), 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, maxDistance * 2]} />
            <meshStandardMaterial map={metalTexture} />
            <OrbitControls enablePan={false} enableRotate={false} />
          </mesh>
        </>
        <Sky
          distance={4500000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
      </CanvasElement>
    </Box>
  );
};

export default Canvas;
