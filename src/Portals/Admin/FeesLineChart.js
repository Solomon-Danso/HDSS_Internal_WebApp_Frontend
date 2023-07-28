import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {colors} from "../../Designs/Colors"

const labels = ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Yearly Fees Chart",
      backgroundColor: colors.yellow,
      borderColor: colors.darkBlue,
      data: [189325,1423543,3454654,657876,666795,4563456,546456,456465,4645,356346,4564654,456456,45645,34656,3456564,7547,57345,544,354675],
    },
  ],
};

const LineChart = () => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;