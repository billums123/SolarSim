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
  const { shapeOfPanel } = formValues;
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
      <TextField />
      <TextField />
    </Box>
  );
};

export default Inputs;
