import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js/auto";
  import { Line } from "react-chartjs-2";
  
  ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  
  
  export const SalesLinechart = ({aspectRatio}) => {
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apl",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Sales Report",
          data: [65, 59, 80, 81, 76, 90, 85, 70, 88, 95, 75, 95],
          fill: true, // Enable fill for the area under the line
          backgroundColor: "rgba(82, 154, 237, .6)", // Fill color
          borderColor: "#529aed", // Line color
          tension: 0.4, // Smooth line
        },
      ],
    };
    
    // Chart options with drawTime
    const options = {
      responsive: true,
      plugins: {
        filler: {
          drawTime: "beforeDatasetDraw", // Options: 'beforeDraw', 'beforeDatasetsDraw', 'beforeDatasetDraw'
          propagate: false,
        },
        title: {
          display: false,
          text: "Line Chart with drawTime",
        },
      },
      aspectRatio: aspectRatio,
    };
    return (
      <>
        <Line options={options} data={data} />
      </>
    );
  };
  