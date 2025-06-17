'use client';

import React from 'react';
import styles from './Education.module.css';
import { useRouter } from 'next/navigation';

const education = () => {
const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Learn to Trade</h1>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>Video Tutorials</h2>
        <div className={styles.videoGrid}>
          {[
              { title: 'How to Trade', src: 'https://www.youtube.com/embed/BfOj_pUu7XY' },
              { title: 'What is a Call/Put?', src: 'https://www.youtube.com/embed/fYB9DANlGkU' }
            ].map((video, i) => (
              <div key={i} className={styles.videoCard}>
                <iframe
                  src={`${video.src}?autoplay=1&mute=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>{video.title}</p>
              </div>
            ))}
        </div>
      </section>
      <section>
        <h2 className={styles.sectionTitle}>PDF Guides</h2>
        <ul className={styles.pdfList}>
          <li><a href="#">Beginner Trading Guide (PDF)</a></li>
          <li><a href="#">Understanding Risk Management (PDF)</a></li>
        </ul>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Take a Quiz</h2>
        <p className={styles.note}>Coming soon: Test your knowledge and earn a certificate!</p>
        <button className={styles.quizButton} disabled>Start Quiz</button>
      </section>
    </div>
  );
};

export default education;
