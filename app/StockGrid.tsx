'use client';

import React, { useState } from 'react';

export default function StockGrid({ stocks }: { stocks: any[] }) {
  const [prices, setPrices] = useState<{ [key: string]: string }>({});

  const handlePriceChange = (id: string, value: string) => {
    setPrices((prev) => ({ ...prev, [id]: value }));
  };

  const updatePrice = async (stockId: string) => {
    const price = prices[stockId];
    if (!price) return alert('Please enter a price.');

    const res = await fetch('/api/update-prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockId, price: parseFloat(price) }),
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ Price updated!');
    } else {
      alert('❌ Error: ' + data.error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {stocks.map((stock) => (
        <div
          key={stock.id}
          className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <div className="text-lg font-bold">{stock.symbol}</div>
          <div className="text-gray-600">{stock.name}</div>
          <div className="text-2xl font-semibold mt-2">${stock.price}</div>

          {/* Update Price */}
          <div className="mt-2">
            <input
              type="number"
              step="0.01"
              placeholder="New Price"
              className="border rounded px-2 py-1 w-full"
              value={prices[stock.id] || ''}
              onChange={(e) => handlePriceChange(stock.id, e.target.value)}
            />
            <button
              onClick={() => updatePrice(stock.id)}
              className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded"
            >
              Update Price
            </button>
          </div>

          {/* Buy/Sell Buttons */}
          <div className="mt-4 flex gap-2">
            <form action="/api/buy" method="post">
              <input type="hidden" name="stockId" value={stock.id} />
              <input type="hidden" name="price" value={stock.price} />
              <button className="bg-green-600 text-white px-3 py-1 rounded">
                Buy
              </button>
            </form>

            <form action="/api/sell" method="post">
              <input type="hidden" name="stockId" value={stock.id} />
              <input type="hidden" name="price" value={stock.price} />
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Sell
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
