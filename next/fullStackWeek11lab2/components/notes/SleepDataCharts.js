import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SleepDataChart({ userData }) {
  const data = {
    labels: userData.map(item => item.sleep_direction),
    datasets: [{
      label: 'Time Spent Sleeping by Direction',
      data: userData.map(item => item.time_spent),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    }],
  };

  const options = {
    responsive: true,
    aspectRatio: 2,
  };

  return <Bar data={data} options={options} />;
}

function SleepDataChartMouth({ userData }) {
  const data = {
    labels: userData.map(item => item.mouth_status),
    datasets: [{
      label: 'Time Spent Sleeping by Mouth Status',
      data: userData.map(item => item.time_spent),
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1,
      barThickness: 56, // or you could use 'flex' for flexible bar width
    }],
  };

  const options = {
    responsive: true,
    indexAxis: 'y', // Bars will now be horizontal
    aspectRatio: 1, // Adjust aspect ratio for a squarer look if it's vertical, or use this for horizontal bars
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
    scales: {
      x: {
        grid: {
          display: false, // this will remove the grid lines
        },
        ticks: {
          beginAtZero: true,
        }
      },
      y: { // or 'x' if you're using horizontal bars
        grid: {
          display: false // this will remove the grid lines
        },
        ticks: {
          autoSkip: false, // this ensures "mouth_status" labels are not skipped
        }
      }
    }
  };

  // Adjust the style to center the chart in the wrapper if needed
  const style = {
    margin: 'auto',
    maxWidth: '400px' // Adjust the maximum width as needed
  };

  return <div style={style}><Bar data={data} options={options} /></div>;
}

export { SleepDataChart, SleepDataChartMouth };

