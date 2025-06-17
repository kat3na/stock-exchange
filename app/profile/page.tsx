'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Profile.module.css';

const profile = () => {
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    email: 'john_doe@example.com',
    phone: '+1234567890',
    kycStatus: 'Verified',
    profilePicture: 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png'
  });

  const router = useRouter();

  const handleEdit = () => {
    // Handle the editing logic or redirect to the edit page
    router.push('/profile/edit');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Profile</h1>

      <section className={styles.profileInfo}>
        <div className={styles.profilePicture}>
          <img src={userData.profilePicture} alt="Profile Picture" className={styles.image} />
        </div>
        
        <div className={styles.info}>
          <h2 className={styles.username}>{userData.username}</h2>
          <p className={styles.email}>{userData.email}</p>
          <p className={styles.phone}>{userData.phone}</p>
          <p className={styles.kycStatus}>KYC Status: <span className={styles.verified}>{userData.kycStatus}</span></p>
        </div>
      </section>

      <button className={styles.editButton} onClick={handleEdit}>Edit Profile</button>
    </div>
  );
};

export default profile;
