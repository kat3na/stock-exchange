// app/trending/page.tsx
'use client';

import React from 'react';
import styles from './Trending.module.css';
import { useRouter } from 'next/navigation';

const trending = () => {
const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Your Platform</h1>
      </header>

      <section>
      <h2 className={styles.sectionTitle}>Top Trending Assets</h2>
        <div className={styles.grid}>
          {[
            { name: 'AAPL/USD', price: '$42,500', change: '+3.2%' },
            { name: 'GOOG/USD', price: '$3,150', change: '+2.1%' },
            { name: 'TSLA', price: '$720.50', change: '-1.4%' },
            { name: 'AMZN/USD', price: '1.1050', change: '+0.5%' }
          ].map((asset, i) => (
            <div key={i} className={styles.card}>
              <h3>{asset.name}</h3>
              <div className={styles.price}>{asset.price}</div>
              <div
                className={styles.change}
                style={{ color: asset.change.includes('-') ? '#ff1744' : '#00e676' }}
              >
                {asset.change}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
      <h2 className={styles.sectionTitle}>Live Trader Leaderboard</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Trader</th>
              <th>Asset</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: 1, user: '@CryptoKing', asset: 'BTC/USD', profit: '+$12,300' },
              { rank: 2, user: '@MarketGuru', asset: 'TSLA', profit: '+$9,850' },
              { rank: 3, user: '@ForexPro', asset: 'EUR/USD', profit: '+$7,400' }
            ].map((entry, i) => (
              <tr key={i}>
                <td>{entry.rank}</td>
                <td>{entry.user}</td>
                <td>{entry.asset}</td>
                <td style={{ color: '#00e676' }}>{entry.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
      <h2 className={styles.sectionTitle}>News Impacting Markets</h2>
        <div className={styles.news}>
          <div className={styles.newsItem}>
            <h4>Federal Reserve Signals Potential Rate Hike</h4>
            <p>The Fed indicates a rate increase, affecting currency markets.</p>
          </div>
          <div className={styles.newsItem}>
            <h4>Bitcoin Surges Amidst Uncertainty</h4>
            <p>Bitcoin rises as investors hedge against market volatility.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default trending;
