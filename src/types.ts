export interface FormValues {
  shapeOfPanel: "rectangle" | "circle";
  panelWidth: number;
  panelLength: number;
  panelDiameter: number;
  panelEfficiency: number;
  time: number;
  storageTankCapacity: number;
  storageTankThermalConductivity: number;
  storageTankHeight: number;
  storageTankDiameter: number;
  solarFlux: number;
  fluidInitTemp: number;
  fluidFinalTemp: number | null;
}

export type CanvasProps = Pick<
  FormValues,
  "shapeOfPanel" | "panelWidth" | "panelLength" | "panelDiameter"
>;
