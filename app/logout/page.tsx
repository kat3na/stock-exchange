'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Logout.module.css';

const logout = () => {
  const router = useRouter();

  const handleRedirect = (action: string) => {
    if (action === 'login') {
      router.push('/login');
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>You Have Been Logged Out</h1>
      
      <div className={styles.buttons}>
        <button 
          className={styles.button} 
          onClick={() => handleRedirect('login')}
        >
          Log Back In
        </button>
        
        <button 
          className={styles.button} 
          onClick={() => handleRedirect('homepage')}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default logout;
