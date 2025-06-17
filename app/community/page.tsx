'use client';

import React from 'react';
import styles from './Community.module.css';
import { useRouter } from 'next/navigation';

const community = () => {
const router = useRouter();
  const leaderboard = [
    { rank: 1, username: '@CryptoKing', asset: 'BTC/USD', profit: '+$25,000' },
    { rank: 2, username: '@MarketMaster', asset: 'ETH/USD', profit: '+$19,500' },
    { rank: 3, username: '@TradeWizard', asset: 'AAPL', profit: '+$15,000' }
  ];

  const tradeFeed = [
    { user: '@CryptoKing', asset: 'BTC/USD', action: 'Bought', amount: '$10,000', time: '2 minutes ago' },
    { user: '@MarketMaster', asset: 'ETH/USD', action: 'Sold', amount: '$5,000', time: '5 minutes ago' },
    { user: '@TradeWizard', asset: 'AAPL', action: 'Bought', amount: '$3,000', time: '10 minutes ago' }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Community</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Leaderboard</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Asset</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, i) => (
              <tr key={i}>
                <td>{user.rank}</td>
                <td>{user.username}</td>
                <td>{user.asset}</td>
                <td style={{ color: '#00e676' }}>{user.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Trade Feed</h2>
        <div className={styles.feed}>
          {tradeFeed.map((entry, i) => (
            <div key={i} className={styles.feedItem}>
              <span className={styles.username}>{entry.user}</span> {entry.action} {entry.asset} worth {entry.amount} <span className={styles.time}>{entry.time}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Community Forum</h2>
        <div className={styles.forum}>
          <textarea placeholder="Join the discussion..." className={styles.textarea}></textarea>
          <button className={styles.button}>Post</button>
        </div>
      </section>
    </div>
  );
};

export default community;
