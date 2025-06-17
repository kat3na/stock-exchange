'use client';

import React, { useState } from 'react';
import styles from './Alerts.module.css';
import { useRouter } from 'next/navigation';

const alerts = () => {
const router = useRouter();
  const [asset, setAsset] = useState('');
  const [price, setPrice] = useState('');
  const [activeAlerts, setActiveAlerts] = useState([
    { asset: 'BTC/USD', price: '$30,000', status: 'Active' },
    { asset: 'ETH/USD', price: '$2,000', status: 'Inactive' },
    { asset: 'AAPL', price: '$150', status: 'Active' }
  ]);

  const handleSetAlert = () => {
    setActiveAlerts([
      ...activeAlerts,
      { asset, price, status: 'Active' }
    ]);
    setAsset('');
    setPrice('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Price Alerts</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Create New Alert</h2>
        <div className={styles.form}>
          <input
            type="text"
            className={styles.input}
            placeholder="Asset (e.g. BTC/USD)"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
          />
          <input
            type="number"
            className={styles.input}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button className={styles.button} onClick={handleSetAlert}>Set Alert</button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Active Alerts</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Alert Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activeAlerts.map((alert, i) => (
              <tr key={i}>
                <td>{alert.asset}</td>
                <td>{alert.price}</td>
                <td style={{ color: alert.status === 'Active' ? '#00e676' : '#ff1744' }}>
                  {alert.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default alerts;
