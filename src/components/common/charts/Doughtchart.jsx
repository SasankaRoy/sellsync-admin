import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const Doughtchart = ({ aspectRatio }) => {
  const data = {
    labels: ["Beer", "Gin", "Whiskey", "Rum", "Scotch", "Wine"],
    datasets: [
      {
        label: "Sample Data",
        data: [2344, 2004, 1988, 1540, 1340, 840],
        backgroundColor: [
          "#13A34B",
          "#0052CC", 
          "#420088",
          "#00C7E6",
          "#F59E0B",
          "#FACC15",
        ],
        borderColor: [
          "#13A34B",
          "#0052CC",
          "#420088",
          "#00C7E6",
          "#F59E0B",
          "#FACC15",
        ],
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
