import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const Doughtchart = ({ aspectRatio, saleData = [], RColors }) => {
  const data = {
    labels: saleData.slice(0, 10).map((lable) => lable.category_name),
    datasets: [
      {
        label: "Sales Data",
        data: saleData.slice(0, 10).map((item) => item.total_amount),
        backgroundColor: RColors,
        borderColor: RColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Sale data Chart",
      },
    },
    aspectRatio: aspectRatio,
  };

  return (
    <div className="w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};
