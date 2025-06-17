'use client';

import React from 'react';
import styles from './Portfolio.module.css';
import { useRouter } from 'next/navigation';

const portfolio = () => {
const router = useRouter();
    // Sample data for active trades and trade history
  const activeTrades = [
    { asset: 'BTC/USD', type: 'Buy', amount: '$0', pnl: '+$0' },
    { asset: 'AAPL', type: 'Sell', amount: '$0', pnl: '-$0' }
  ];

  const tradeHistory = [
    { asset: 'ETH/USD', type: 'Buy', result: 'Win', pnl: '+$0' },
    { asset: 'GOOG', type: 'Sell', result: 'Loss', pnl: '-$0' },
    { asset: 'EUR/USD', type: 'Buy', result: 'Win', pnl: '+$0' }
  ];

  const portfolioStats = {
    totalProfit: '+$0',
    winRate: '0%',
    totalTrades: 0
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Portfolio</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <span>Total Profit</span>
            <strong>{portfolioStats.totalProfit}</strong>
          </div>
          <div className={styles.statBox}>
            <span>Win Rate</span>
            <strong>{portfolioStats.winRate}</strong>
          </div>
          <div className={styles.statBox}>
            <span>Total Trades</span>
            <strong>{portfolioStats.totalTrades}</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Active Trades</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Amount</th>
              <th>PnL</th>
            </tr>
          </thead>
          <tbody>
            {activeTrades.map((trade, i) => (
              <tr key={i}>
                <td>{trade.asset}</td>
                <td>{trade.type}</td>
                <td>{trade.amount}</td>
                <td style={{ color: trade.pnl.startsWith('-') ? '#ff1744' : '#00e676' }}>{trade.pnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Trade History</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Result</th>
              <th>PnL</th>
            </tr>
          </thead>
          <tbody>
            {tradeHistory.map((trade, i) => (
              <tr key={i}>
                <td>{trade.asset}</td>
                <td>{trade.type}</td>
                <td>{trade.result}</td>
                <td style={{ color: trade.pnl.startsWith('-') ? '#ff1744' : '#00e676' }}>{trade.pnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default portfolio;
