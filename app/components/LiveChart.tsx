'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react'
import {
  createChart,
  ColorType,
  UTCTimestamp,
  Time,
} from 'lightweight-charts'

export default function LiveChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter();

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: '#0b0f1a' },
        textColor: '#c9d1d9',
      },
      grid: {
        vertLines: { color: '#1f2733' },
        horzLines: { color: '#1f2733' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      rightPriceScale: {
        borderColor: '#2e3a4e',
      },
    })

    const lineSeries = chart.addLineSeries({
      color: 'rgba(0, 255, 200, 1)',
      lineWidth: 2,
    })

    // Start time in seconds as UTCTimestamp
    let currentTime = Math.floor(Date.now() / 1000) as UTCTimestamp
    let price = 100

    const updateChart = () => {
      price += (Math.random() - 0.5) * 2
      currentTime = (currentTime + 1) as UTCTimestamp

      const newPoint = {
        time: currentTime,
        value: price,
      }

      lineSeries.update(newPoint)
    }

    const interval = setInterval(updateChart, 1000)

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.resize(chartContainerRef.current.clientWidth, 400)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [])
  // ✅ Redirects to the correct component route
  const handleBuy = () => {
    router.push('/buy');
  };

  const handleSell = () => {
    router.push('/sell');
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
     <div
      ref={chartContainerRef}
      className="w-full h-[200px] rounded-xl shadow-lg"
      style={{
        width: '100%',
        height: '300px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 30px rgba(0,255,200,0.3)',
      }}
  >
  
</div>
</div>
  );
}
