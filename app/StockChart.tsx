'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const StockChart = () => {
  const data = {
    labels: ['9:00', '10:00', '11:00', '12:00', '1:00'],
    datasets: [
      {
        label: 'Stock Price',
        data: [10, 12, 9, 15, 14],
        fill: false,
        borderColor: 'rgb(75,192,192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Stock Price Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default StockChart;
// components/StockGrid.tsx
type StockGridProps = {
  stocks: any[];
};

