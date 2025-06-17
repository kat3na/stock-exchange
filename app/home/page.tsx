'use client';

import React from 'react';
import styles from './Home.module.css';
import { useRouter } from 'next/navigation';

const home = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to Your Platform</h1>
      </header>

      <section className={styles.stats}>
        <div className={styles.statItem}>
          <h3>Platform Stats</h3>
          <p>Total Trades: 1,235,876</p>
          <p>Active Traders: 14,342</p>
          <p>24h Volume: $125M</p>
        </div>
      </section>

      <section className={styles.news}>
        <h2>Latest News</h2>
        <div className={styles.newsItem}>
          <h4>Crypto Market Surge Expected</h4>
          <p>Market analysts predict a massive surge in cryptocurrency values.</p>
        </div>
      </section>

      <section className={styles.quickLinks}>
        <h2>Quick Links</h2>
        <button onClick={() => router.push('/dashboard')}>Go to Trading</button>
        <button onClick={() => router.push('/deposits')}>Deposit Funds</button>
        <button onClick={() => router.push('/profile')}>Edit Profile</button>
      </section>
    </div>
  );
};

export default home;
