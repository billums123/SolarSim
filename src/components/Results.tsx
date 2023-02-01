import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import theme from "../theme";
import "../stylesheets/results.css";
import {
  EnergyRequiredResults,
  HeatTransferResults,
  RequiredTimeResults,
} from "../types";

interface ResultsProps {
  heatTransferResults: HeatTransferResults;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const formatData = (heatTransferResults: HeatTransferResults) => {
  const { calculationComplete, energyRequiredToHeatTankFluid, requiredTime } =
    heatTransferResults;

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (hours)",
        },
        grid: {
          // color: theme.palette.primary.light,
        },
      },
      y: {
        title: {
          display: true,
          text: "Fluid Temperature (C˚)",
        },
        grid: {
          // color: theme.palette.primary.light,
        },
      },
      y1: {
        title: {
          display: true,
          text: "Energy Required (kJ)",
        },
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        fullSize: false,
        text: "Storage Tank Fluid Temperature vs. Time",
      },
    },
  };

  //default labels values
  let defaultLabelValues = ["0", "1", "2", "3", "4", "5"];
  let defaultDataValues = [0, 1, 2, 3, 4, 5];

  let labels = defaultLabelValues;
  let tempDataValues = defaultDataValues;
  let energyDataValues = defaultDataValues;

  if (calculationComplete) {
    //create time labels
    let timeSum = 0;
    labels = (requiredTime as RequiredTimeResults[]).map((measurement) => {
      timeSum += measurement.time;
      return String((timeSum / 3600).toFixed(2));
    });

    //create datapoints for energy required and fluid temperature
    let energyTotal = 0;
    tempDataValues = [];
    energyDataValues = [];
    (energyRequiredToHeatTankFluid as EnergyRequiredResults[]).forEach(
      (measurement) => {
        energyTotal += measurement.energy;
        tempDataValues.push(measurement.currentFluidTemp);
        energyDataValues.push(energyTotal / 1000);
      }
    );
  }

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        data: tempDataValues,
        borderColor: `${theme.palette.primary.main}EE`,
        backgroundColor: `${theme.palette.primary.light}AA`,
        yAxisID: "y",
      },
      {
        fill: true,
        data: energyDataValues,
        borderColor: `${theme.palette.primary.main}00`,
        backgroundColor: `${theme.palette.primary.light}00`,
        yAxisID: "y1",
      },
    ],
  };

  return { chartData, chartOptions };
};

const Results = ({ heatTransferResults }: ResultsProps) => {
  const { chartData, chartOptions } = formatData(heatTransferResults);
  return (
    <Box component="div" className="results">
      <Line style={{ margin: 5 }} options={chartOptions} data={chartData} />
    </Box>
  );
};

export default Results;
