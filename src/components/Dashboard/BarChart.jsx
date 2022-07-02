import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { CDBContainer } from "cdbreact";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BarChart = () => {
  const [data] = useState({
    labels: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    datasets: [
      {
        label: "Amount",
        backgroundColor: "#6C5DD3",
        borderColor: "#E4E8EF",
        data: [
          30, 40, 20, 50, 60, 20, 40, 60, 10, 40, 12, 35, 67, 20, 40, 20, 18,
          40, 50, 34, 60, 40, 6, 28,
        ],
      },
      // {
      //   label: 'Expense',
      //   backgroundColor: '#eccb60',
      //   borderColor: 'rgb(225, 81, 71)',
      //   data: [28, 48, 40, 19, 96, 27, 100],
      // },
    ],
  });

  return (
    <CDBContainer>
      <Bar data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

export default BarChart;
