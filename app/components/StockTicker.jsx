// src/components/StockTicker.jsx
import React, { useEffect, useState } from 'react';
import { fetchStockPrice } from './FetchStockPrice';

const StockTicker = ({ symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const updatePrice = async () => {
      const latestPrice = await fetchStockPrice(symbol);
      if (isMounted) {
        setPrice(latestPrice);
      }
    };

    updatePrice();
    const interval = setInterval(updatePrice, 60000); // Update every 60 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [symbol]);

  return (
    <div className="bg-white shadow rounded p-4 w-full max-w-sm mx-auto my-4">
      <h2 className="text-xl font-bold">{symbol}</h2>
      <p className="text-lg">
        Price: {price !== null ? `$${price.toFixed(2)}` : 'Loading...'}
      </p>
    </div>
  );
};

export default StockTicker;
