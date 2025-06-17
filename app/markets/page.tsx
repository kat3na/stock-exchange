// pages/markets.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Markets.module.css';


interface Market {
  id: number;
  name: string;
  price: number;
  category: string;
}

const mockMarkets: Market[] = [
  { id: 1, name: 'EUR/USD', price: 1.1334, category: 'Forex' },
  { id: 2, name: 'Bitcoin', price: 111000.073, category: 'Crypto' },
  { id: 3, name: 'Apple Inc.', price: 201, category: 'Stocks' },
  { id: 4, name: 'Gold', price: 3302, category: 'Commodities' },
  // Add more market items as needed
];

export default function markets() {
  const [markets, setMarkets] = useState<Market[]>(mockMarkets);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'volatility' | 'popularity'>('volatility');

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prevMarkets =>
        prevMarkets.map(market => ({
          ...market,
          price: parseFloat((market.price * (0.95 + Math.random() * 0.1)).toFixed(4)),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredMarkets = markets.filter(market =>
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0d0d26] text-white min-h-screen p-4">
      <h1 className={styles.marketTitle}>Markets</h1>
      

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search markets..."
          className="w-full sm:w-1/3 p-2 rounded bg-gray-800 text-white"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full sm:w-1/4 p-2 rounded bg-gray-800 text-white"
          value={sortKey}
          onChange={e => setSortKey(e.target.value as 'volatility' | 'popularity')}
        >
          <option value="volatility">Sort by Volatility</option>
          <option value="popularity">Sort by Popularity</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMarkets.map(market => (
          <div key={market.id} className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{market.name}</h2>
            <p className="text-sm text-gray-400 mb-1">Category: {market.category}</p>
            <p className="text-lg font-bold">Price: ${market.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

      
   