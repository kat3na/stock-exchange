'use client';
import React, { useEffect, useState } from 'react';
import { fetchStockPrice } from '../api/fetchStockPrice';

const stockSymbols = ['AAPL', 'GOOG', 'TSLA', 'MSFT', 'AMZN'];

const StockGrid = ({ onBuy, onSell }) => {
  const [prices, setPrices] = useState({});

  const updateAllPrices = async () => {
    const newPrices = {};
    for (const symbol of stockSymbols) {
      const price = await fetchStockPrice(symbol);
      newPrices[symbol] = price;
    }
    setPrices(newPrices);
  };

  useEffect(() => {
    updateAllPrices();
    const interval = setInterval(updateAllPrices, 60000); // Every 60 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {stockSymbols.map((symbol) => (
        <div
          key={symbol}
          className="bg-white shadow-md rounded-xl p-6 text-center border"
        >
          <h2 className="text-xl font-bold">{symbol}</h2>
          <p className="text-lg mb-2">
            {prices[symbol] !== undefined
              ? `$${prices[symbol].toFixed(2)}`
              : 'Loading...'}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onBuy(symbol, prices[symbol])}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Buy
            </button>
            <button
              onClick={() => onSell(symbol, prices[symbol])}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sell
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockGrid;
