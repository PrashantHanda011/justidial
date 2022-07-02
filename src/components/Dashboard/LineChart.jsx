import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
const LineChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: [
      "Oct 2015",
      "Nov 2015",
      "Dec 2015",
      "Jan 2016",
      "Feb 2016",
      "Mar 2016",
      "April 2016",
    ],
    datasets: [
      {
        label: "Cash-Flow",
        fill: false,
        borderColor: "#91cfff",
        backgroundColor: "#249bf7",
        data: [10, 20, 13, 23, 40, 35,70],
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Line data={data} height={100} options={options} />;
};

export default LineChart;
