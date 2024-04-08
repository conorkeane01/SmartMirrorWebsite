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
    labels: userData.map((item) => item.sleep_direction), // Use `sleep_direction` as the label for each bar
    datasets: [{
      label: 'Time Spent Sleeping',
      data: userData.map((item) => item.time_spent),
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(75, 192, 192, 0.7)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 5,
    }],
  };

  const options = {
    responsive: true,
    aspectRatio: 2, // Adjust the aspect ratio as needed, where `2` means width is twice the height
    // ... other options here
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SleepDataChart;