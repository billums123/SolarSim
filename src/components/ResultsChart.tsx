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
import "../stylesheets/results-chart.css";
import {
  EnergyRequiredResults,
  HeatTransferResults,
  RequiredTimeResults,
} from "../types";

interface ResultsChartProps {
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

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (hours)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Fluid Temperature (˚C)",
          color: theme.palette.primary.dark,
        },
        ticks: {
          color: theme.palette.primary.dark,
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
        ticks: {
          color: theme.palette.secondary.dark,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        fullSize: false,
        text: "Storage Tank Fluid Temperature vs. Time",
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        fill: false,
        label: "Fluid Temperature",
        data: tempDataValues,
        borderColor: `${theme.palette.primary.main}`,
        backgroundColor: `${theme.palette.primary.main}`,
        yAxisID: "y",
      },
      {
        fill: false,
        label: "Energy Required",
        data: energyDataValues,
        borderColor: `${theme.palette.secondary.main}`,
        backgroundColor: `${theme.palette.secondary.main}`,
        yAxisID: "y1",
      },
    ],
  };

  return { chartData, chartOptions };
};

const ResultsChart = ({ heatTransferResults }: ResultsChartProps) => {
  const { chartData, chartOptions } = formatData(heatTransferResults);
  return (
    <Box component="div" className="results-chart">
      <Line style={{ margin: 5 }} options={chartOptions} data={chartData} />
    </Box>
  );
};

export default ResultsChart;
