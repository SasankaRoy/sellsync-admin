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
      {/* Mobile Portrait (default) - xs to sm */}
      <div className="block sm:hidden w-full h-[200px]">
        <Doughnut 
          data={data} 
          options={{ 
            ...options, 
            responsive: true, 
            maintainAspectRatio: false 
          }} 
        />
      </div>

      {/* Mobile Landscape - sm */}
      <div className="hidden sm:block md:hidden w-full h-[220px]">
        <Doughnut 
          data={data} 
          options={{ 
            ...options, 
            responsive: true, 
            maintainAspectRatio: false 
          }} 
        />
      </div>

      {/* Tablet Portrait - md */}
      <div className="hidden md:block lg:hidden xl:portrait:hidden w-full h-[280px]">
        <Doughnut 
          data={data} 
          options={{ 
            ...options, 
            responsive: true, 
            maintainAspectRatio: false 
          }} 
        />
      </div>

      {/* Tablet Landscape - lg (but not xl+) */}
      <div className="hidden lg:block xl:hidden w-full h-[320px]">
        <Doughnut 
          data={data} 
          options={{ 
            ...options, 
            responsive: true, 
            maintainAspectRatio: false 
          }} 
        />
      </div>

      {/* Desktop Small - xl */}
      <div className="hidden xl:block 2xl:hidden w-full h-[380px]">
        <Doughnut 
          data={data} 
          options={{ 
            ...options, 
            responsive: true, 
            maintainAspectRatio: false 
          }} 
        />
      </div>

      {/* Desktop Large - 2xl+ */}
      <div className="hidden 2xl:block w-full h-[420px]">
        <Doughnut 
          data={data} 
          options={{ 
            ...options, 
            responsive: true, 
            maintainAspectRatio: false 
          }} 
        />
      </div>
    </div>
  );
};