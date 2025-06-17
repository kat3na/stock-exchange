'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function SellStockCard () {
  const [stocks, setStocks] = useState<{ id: string; symbol: string }[]>([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => setStocks(data))
      .catch(() => toast.error('Failed to load stocks'));
  }, []);

  const handleSell = async () => {
    if (!selectedStock || !sellAmount) {
      return toast.error('Please complete all fields');
    }

    const stock = stocks.find(s => s.id === selectedStock);

    const res = await fetch('/api/sell-card', {
      method: 'POST',
      body: JSON.stringify({
        stockId: selectedStock,
        stockSymbol: stock?.symbol,
        sellAmount: parseFloat(sellAmount),
        paymentMethod,
        
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (data?.url) {
      router.push(data.url);
    } else {
      toast.error(data?.error || 'Failed to initiate sell transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-4">
      <h2 className="text-2xl font-semibold text-center text-red-600">Sell Stocks</h2>

      <div>
        <label className="block text-sm font-medium">Select Stock</label>
        <select
          value={selectedStock}
          onChange={e => setSelectedStock(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
        >
          <option value="">-- Choose a stock --</option>
          {stocks.map(stock => (
            <option key={stock.id} value={stock.id}>
              {stock.symbol}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Amount to Sell ($)</label>
        <input
          type="number"
          value={sellAmount}
          onChange={e => setSellAmount(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          placeholder="e.g. 100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
        >
          <option value="card">Card</option>
          <option value="paypal">PayPal</option>
          <option value="crypto">Crypto</option>
        </select>
      </div>

      <button
        onClick={handleSell}
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
      >
        Sell Now
      </button>
    </div>
  );
}
