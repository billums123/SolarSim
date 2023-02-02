import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../stylesheets/results-parameters-table.css";
import {
  EnergyRequiredResults,
  FormValues,
  HeatTransferResults,
  RequiredTimeResults,
  ResultsTableRow,
} from "../types";

interface ResultsParametersTableProps {
  formValues: FormValues;
  heatTransferResults: HeatTransferResults;
}

const ResultsParametersTable = ({
  formValues,
  heatTransferResults,
}: ResultsParametersTableProps) => {
  const {
    panelSurfaceArea,
    storageTankCapacity,
    requiredTime,
    energyRequiredToHeatTankFluid,
  } = heatTransferResults;
  const {
    shapeOfPanel,
    panelEfficiency,
    storageTankThermalConductivity,
    solarFlux,
    fluidInitTemp,
    fluidFinalTemp,
  } = formValues;

  const totalTimeInHours = requiredTime?.reduce((a, b) => {
    return a + b.time;
  }, requiredTime[0].time);

  const totalEnergyRequiredInJoules = energyRequiredToHeatTankFluid?.reduce(
    (a, b) => {
      return a + b.energy;
    },
    energyRequiredToHeatTankFluid[0].energy
  );

  const totalEnergyRequiredInKJ =
    (totalEnergyRequiredInJoules as number) / 1000;

  const totalTimeInSeconds = (totalTimeInHours as number) / 3600;
  return (
    <TableContainer className="results-parameters-table" component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={2} sx={{ fontSize: 20 }}>
              <strong>Test Summary</strong>
            </TableCell>
          </TableRow>

          {/* RESULTS SUMMARY */}
          <TableRow>
            <TableCell colSpan={2} align="center">
              <strong>Results</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{`Total Time: ${totalTimeInSeconds.toFixed(
              2
            )} h`}</TableCell>
            <TableCell>
              {`Total Energy: ${totalEnergyRequiredInKJ.toFixed(2)} kJ`}
            </TableCell>
          </TableRow>

          {/* SOLAR PANEL PARAMETERS */}
          <TableRow>
            <TableCell colSpan={2} align="center">
              <strong>Solar Panel</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{`Shape: ${shapeOfPanel}`}</TableCell>
            <TableCell>
              {`Surface Area: ${panelSurfaceArea?.toFixed(2)} m`}
              <sup>2</sup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{`Efficiency: ${panelEfficiency}%`}</TableCell>
            <TableCell>
              {`Solar Flux: ${solarFlux} W/m`}
              <sup>2</sup>
            </TableCell>
          </TableRow>

          {/* STORAGE TANK PARAMETERS */}
          <TableRow>
            <TableCell colSpan={2} align="center">
              <strong>Storage Tank</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{`Thermal Conductivity: ${storageTankThermalConductivity} W/mK`}</TableCell>
            <TableCell>
              {`Volume: ${((storageTankCapacity as number) * 1000)?.toFixed(
                2
              )} L`}
              {/*value is originally in m^3 divided by 1000 to get to Liters*/}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{`Initial Temp: ${fluidInitTemp}˚C `}</TableCell>
            <TableCell>{`Final Temp: ${fluidFinalTemp}˚C`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsParametersTable;
