'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function dashboard() {
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');
  const [amount, setAmount] = useState('');
  const [expiry, setExpiry] = useState('60');
  const router = useRouter();

  return (
    <main className="flex flex-col p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Trade Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Asset selector + chart */}
        <div className="col-span-2 bg-gray-900 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block mb-2">Select Asset:</label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full bg-black text-white p-2 rounded border border-gray-700"
            >
              <option>EUR/USD</option>
              <option>BTC/USD</option>
              <option>ETH/USD</option>
              <option>Gold</option>
            </select>
          </div>

          <div className="mb-4">
            <iframe
              src="https://www.tradingview.com/chart/"
              className="w-full h-[400px] rounded"
              title="Live Trading Chart"
            />
          </div>
        </div>

        {/* Right: Trade controls */}
        <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-4">
          <label className="block">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black text-white p-2 mt-1 rounded border border-gray-700"
            />
          </label>
          <label className="block">
            Expiry Time (seconds):
            <input
              type="number"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full bg-black text-white p-2 mt-1 rounded border border-gray-700"
            />
          </label>
          <div className="flex justify-between gap-2 mt-4">
            <button className="w-full bg-green-600 p-2 rounded hover:bg-green-700">Call</button>
            <button className="w-full bg-red-600 p-2 rounded hover:bg-red-700">Put</button>
          </div>
        </div>
      </div>

      {/* Open Trades */}
      <div className="mt-6 bg-gray-800 p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Open Trades</h2>
        <p className="text-gray-400">No open trades yet.</p>
      </div>
    </main>
  );
}
