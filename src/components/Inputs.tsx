import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
} from "@mui/material";
import "../stylesheets/inputs.css";
import { FormValues } from "../types";

interface InputsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
}

const Inputs = ({ formValues, handleFormChange }: InputsProps) => {
  const { shapeOfPanel, panelWidth, panelLength, panelDiameter } = formValues;
  return (
    <Box component="div" className="inputs">
      <FormControl fullWidth>
        <InputLabel id="shape-label">Shape of Solar Panel</InputLabel>
        <Select
          labelId="shape-label"
          name="shapeOfPanel"
          value={shapeOfPanel}
          label="Shape of Solar Panel"
          onChange={handleFormChange}
        >
          <MenuItem value="rectangle">Rectangle</MenuItem>
          <MenuItem value="circle">Circle</MenuItem>
        </Select>
      </FormControl>
      {shapeOfPanel === "rectangle" ? (
        <>
          <Box component="div">
            <TextField
              name="panelWidth"
              label="Width"
              type="number"
              value={panelWidth}
              onChange={handleFormChange}
            />
            <TextField
              name="panelLength"
              label="Length"
              type="number"
              value={panelLength}
              onChange={handleFormChange}
            />
          </Box>
        </>
      ) : (
        <TextField
          name="panelDiameter"
          label="Diameter"
          type="number"
          value={panelDiameter}
          onChange={handleFormChange}
          sx={{ width: "100%" }}
        />
      )}
    </Box>
  );
};

export default Inputs;
