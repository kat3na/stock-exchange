'use client';

import React from 'react';
import styles from './Apps.module.css';
import { useRouter } from 'next/navigation';

const apps = () => {
const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Download Our Apps</h1>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>Available Platforms</h2>
        <div className={styles.grid}>
          {[
            { name: 'iOS App', link: '#', platform: 'iOS' },
            { name: 'Android App', link: '#', platform: 'Android' },
            { name: 'Windows App', link: '#', platform: 'Windows' },
            { name: 'Mac App', link: '#', platform: 'Mac' }
          ].map((app, i) => (
            <a key={i} className={styles.card} href={app.link}>
              <h3>{app.name}</h3>
              <p>Download for {app.platform}</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Quick Access</h2>
        <div className={styles.qr}>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?data=https://yourplatform.com/app&size=150x150"
            alt="QR Code"
          />
          <p>Scan to download on mobile</p>
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Integrations</h2>
        <ul className={styles.integrationList}>
          <li>Telegram Alerts Bot</li>
          <li>WhatsApp Trading Assistant</li>
          <li>Browser Extension (Coming Soon)</li>
        </ul>
      </section>
    </div>
  );
};

export default apps;
