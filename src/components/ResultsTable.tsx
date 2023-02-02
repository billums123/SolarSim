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
import "../stylesheets/results-table.css";
import {
  EnergyRequiredResults,
  FormValues,
  HeatTransferResults,
  RequiredTimeResults,
  ResultsTableRow,
} from "../types";

interface ResultsTableProps {
  formValues: FormValues;
  heatTransferResults: HeatTransferResults;
}

let rows: ResultsTableRow[] = [
  {
    time: 0,
    fluidTemp: 0,
    energy: 0,
  },
];

const createTableData = (
  energyRequiredToHeatTankFluid: EnergyRequiredResults[],
  requiredTime: RequiredTimeResults[]
) => {
  const tableRows: any = [];
  let timeSum = 0;
  let energySum = 0;

  requiredTime.forEach((interval) => {
    const timeInHours = interval.time / 3600;
    timeSum += timeInHours;
    tableRows.push({ time: timeSum });
  });

  energyRequiredToHeatTankFluid.forEach((interval, index) => {
    const energyInKJ = interval.energy / 1000;
    energySum += energyInKJ;
    tableRows[index] = {
      ...tableRows[index],
      fluidTemp: interval.currentFluidTemp,
      energy: energySum,
    };
  });

  console.log(tableRows);
  return tableRows;
};

const ResultsTable = ({
  formValues,
  heatTransferResults,
}: ResultsTableProps) => {
  const { energyRequiredToHeatTankFluid, requiredTime } = heatTransferResults;
  if (energyRequiredToHeatTankFluid && requiredTime) {
    const tableRows = createTableData(
      energyRequiredToHeatTankFluid,
      requiredTime
    );
    rows = tableRows;
  }
  return (
    <TableContainer className="results-table" component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3} sx={{ fontSize: 20 }}>
              <strong>Results Data</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Time (h)</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Fluid Temp (˚C)</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Energy Required (kJ)</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.time}
              sx={{
                "&:nth-of-type(odd)": {
                  bgcolor: "lightgrey",
                },
              }}
            >
              <TableCell>{row.time.toFixed(2)}</TableCell>
              <TableCell align="right">{row.fluidTemp.toFixed(2)}</TableCell>
              <TableCell align="right">{row.energy.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
