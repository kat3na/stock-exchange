'use client';
import router from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

export default function LivePriceChart() {
  const [chartData, setChartData] = useState({
    labels: [new Date().toLocaleTimeString()],
    datasets: [
      {
        label: 'Price',
        data: [Math.random() * 100],
        borderColor: '#00c6ff',
        backgroundColor: 'rgba(0,198,255,0.1)',
        tension: 0.5,
        fill: true,
        pointRadius: 0,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newLabel = new Date().toLocaleTimeString();
      const newData = Math.random() * 100;

      setChartData(prev => ({
        labels: [...prev.labels.slice(-19), newLabel],
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data.slice(-19), newData],
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0d0d26] rounded-xl p-4 shadow-lg w-full max-w-screen-md mx-auto">
      <h2 className="text-[#00c6ff] text-xl font-semibold mb-4">Live Price Chart</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 300 },
          scales: {
            x: {
              ticks: { color: '#aaa' },
              grid: { color: '#222' },
            },
            y: {
              ticks: { color: '#aaa' },
              grid: { color: '#222' },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: '#1e1e2f',
              titleColor: '#fff',
              bodyColor: '#00c6ff',
            },
          },
        }}
        height={300}
      />
    </div>
  );
}
