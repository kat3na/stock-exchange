'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function BuyStockCard () {
  const [stocks, setStocks] = useState<{ id: string; symbol: string }[]>([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const router = useRouter();
  // TODO: Replace this with actual user ID retrieval logic (e.g., from context, session, or props)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : '';

  useEffect(() => {
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => {
        setStocks(data);

        // ✅ Pre-fill stockId from query param
        const searchParams = new URLSearchParams(window.location.search);
        const prefillStockId = searchParams.get('stockId');
        if (prefillStockId) setSelectedStock(prefillStockId);
      })
      .catch(() => toast.error('Failed to load stocks'));
  }, []);

  const handleBuy = async () => {
    if (!selectedStock || !buyAmount) {
      return toast.error('Please complete all fields');
    }

    const stock = stocks.find(s => s.id === selectedStock);

    const res = await fetch('/api/buy-card', {
      method: 'POST',
      body: JSON.stringify({
        stockId: selectedStock,
        stockSymbol: stock?.symbol,
        buyAmount: parseFloat(buyAmount),
        paymentMethod,
        
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (data?.url) {
      router.push(data.url);
    } else {
      toast.error(data?.error || 'Failed to initiate buy transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-4">
      <h2 className="text-2xl font-semibold text-center text-green-600">Buy Stocks</h2>

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
        <label className="block text-sm font-medium">Amount to Buy ($)</label>
        <input
          type="number"
          value={buyAmount}
          onChange={e => setBuyAmount(e.target.value)}
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
        onClick={handleBuy}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Buy Now
      </button>
    </div>
  );
}
