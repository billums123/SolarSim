export interface FormValues {
  shapeOfPanel: "rectangle" | "circle";
  panelWidth?: number;
  panelLength?: number;
  panelDiameter?: number;
  panelEfficiency: number;
  time: number;
  storageTank: number;
  solarFlux: number;
  fluidInitTemp: number;
  fluidFinalTemp: number;
}

export type CanvasProps = Pick<
  FormValues,
  "shapeOfPanel" | "panelWidth" | "panelLength" | "panelDiameter"
>;
