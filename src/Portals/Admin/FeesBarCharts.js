import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const labels = ["School Fees", "Feeding Fees", "Transport Fees"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily Fees Collection",
        backgroundColor: [
          "#5BAFF9",
          "#F66263",
          "#FFE07F"
        ],
        borderColor: "#061e3f",
        data: [18546, 22564, 19548],
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;