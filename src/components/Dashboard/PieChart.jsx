import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const pieChartData = {
    labels: ["October", "November", "December"],
    datasets: [
      {
        data: [150, 150, 300],
        label: "cash",
        backgroundColor: ["#e9a979", "#b58ec3", "#6d8dc8"],
        hoverBackgroundColor: ["#faa564", "#cf74f0", "#4578d8"],
      },
    ],
  };
  const pieChart = (
    <Pie
      type="pie"
      options={{
        title: {
          display: true,
          text: "Top expenses",
          fontSize: 10,
        },
        legend: {
          position: "right",
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: true,
        offset: true,
      }}
      data={pieChartData}
    />
  );
  return pieChart;
};
export default PieChart;
