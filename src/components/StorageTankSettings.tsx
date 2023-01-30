import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputAdornment,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { PropaneTank as PropaneTankIcon } from "@mui/icons-material";
import { FormValues } from "../types";
import "../stylesheets/storage-tank-settings.css";

interface StorageTankSettingsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
}
const StorageTankSettings = ({
  formValues,
  handleFormChange,
}: StorageTankSettingsProps) => {
  const {
    shapeOfPanel,
    panelWidth,
    panelLength,
    panelDiameter,
    panelEfficiency,
  } = formValues;

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<PropaneTankIcon sx={{ color: "secondary.main" }} />}
          sx={{ bgcolor: "primary.main" }}
        >
          <Typography>Storage Tank Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails className="storage-tank-details">
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
              <Box component="div" sx={{ display: "flex" }}>
                <TextField
                  name="panelWidth"
                  label="Width"
                  type="number"
                  value={panelWidth}
                  onChange={handleFormChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="panelLength"
                  label="Length"
                  type="number"
                  value={panelLength}
                  onChange={handleFormChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m</InputAdornment>
                    ),
                  }}
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
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
          )}
          <TextField
            name="panelEfficiency"
            label="Panel Efficiency"
            type="number"
            value={panelEfficiency}
            onChange={handleFormChange}
            sx={{ width: "100%" }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default StorageTankSettings;
