import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase'; // Make sure you have Supabase set up correctly

export default function StockDashboard() {
  const [stocks, setStocks] = useState([]);

  // Fetch initial stock data
  useEffect(() => {
    const fetchStocks = async () => {
      const { data, error } = await supabase
        .from('stocks')
        .select('*');
      if (error) {
        console.error('Error fetching stocks:', error);
      } else {
        setStocks(data);
      }
    };

    fetchStocks();

    // Real-time subscription
    const subscription = supabase
      .from('stocks')
      .on('INSERT', (payload) => {
        setStocks((prevStocks) => [...prevStocks, payload.new]);
      })
      .on('UPDATE', (payload) => {
        setStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.stock_id === payload.new.stock_id ? payload.new : stock
          )
        );
      })
      .on('DELETE', (payload) => {
        setStocks((prevStocks) =>
          prevStocks.filter((stock) => stock.stock_id !== payload.old.stock_id)
        );
      })
      .subscribe();

    // Clean up on component unmount
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Real-Time Stock Dashboard</h1>
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Stock Name</th>
            <th className="p-4 text-left">Ticker</th>
            <th className="p-4 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.stock_id} className="border-b">
              <td className="p-4">{stock.name}</td>
              <td className="p-4">{stock.ticker}</td>
              <td className="p-4">${stock.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Stock Price',
      data: [100, 120, 115, 130, 125], // Fake prices for example
      fill: false,
      borderColor: 'blue',
      tension: 0.1,
    },
  ],
};

export default function StockChart() {
  return <Line data={data} />;
}
