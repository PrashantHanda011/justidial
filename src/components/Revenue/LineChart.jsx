import React, { useState, useEffect } from "react";
import { FetchGraph } from "../Axios/apis";
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
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const GetPlans = async () => {
      try {
        const { data } = await FetchGraph();
        setStats(data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetPlans();
  }, []);

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
        borderColor: "#FF9933",
        backgroundColor: "#FF9933",
        data: stats,
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
