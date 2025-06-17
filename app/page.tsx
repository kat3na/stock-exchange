'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { motion } from 'framer-motion'
import SidebarRight from './components/SidebarRight' // Default import
import DepositPanel  from './components/DepositPanel' // Ensure this file exists in the components folder
import LiveChart from './components/LiveChart'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

export default function HomePage() {
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 20 }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Mock Stock',
        data: Array.from({ length: 20 }, () => Math.random() * 100),
        borderColor: '#00ffcc',
        backgroundColor: 'transparent',
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.datasets[0].data.slice(1), Math.random() * 100]
        return {
          ...prev,
          datasets: [{ ...prev.datasets[0], data: newData }],
        }
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#0d0d26] text-white h-screen overflow-hidden relative">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark w-full sm:w-96 p-6 rounded-lg shadow-lg">
    <div className="p-4 sm:p-9">
      
      <LiveChart />
    </div>
        {/* Icons here */}
      </div>
      <div className="fixed right-0 top-0 h-full w-16 bg-dark flex flex-col items-center justify-center">
        {/* Icons here */}
      </div>
      
      <SidebarRight />
      <div className="px-16">
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: { display: true },
              y: { display: true },
            },
            plugins: { legend: { display: true } },
          }}
        />
      </div>
      <DepositPanel />
    {/* ✅ Buy and Sell Buttons Positioned at Bottom Center */}
    <div className="absolute bottom-30 left-20 right-0 flex justify-center gap-4 px-4">
        <button
          onClick={() => window.location.href = '/buystock'}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
        >
          Buy Stock
        </button>
        <button
          onClick={() => window.location.href = '/sellstock'}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
        >
          Sell Stock
        </button>
    </div>
  </div>
  )
}