'use client';

import React, { useState } from 'react';
import styles from './Settings.module.css';
import { useRouter } from 'next/navigation';

const settings = () => {
const router = useRouter();
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Security</h2>

        <div className={styles.settingItem}>
          <label>Change Password</label>
          <button className={styles.button}>Update Password</button>
        </div>

        <div className={styles.settingItem}>
          <label>Two-Factor Authentication (2FA)</label>
          <input
            type="checkbox"
            checked={twoFAEnabled}
            onChange={() => setTwoFAEnabled(!twoFAEnabled)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Preferences</h2>

        <div className={styles.settingItem}>
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className={styles.settingItem}>
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Notifications</h2>

        <div className={styles.settingItem}>
          <label>Email & Push Alerts</label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </div>
      </section>
    </div>
  );
};

export default settings;
