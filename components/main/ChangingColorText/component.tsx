"use client"
import styles from './styles.module.css'
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <div className="container">

      
        
   
    </div>
  )
}
function Testing() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIndex((visibleIndex + 1) % 3);  // Cycle through 0, 1, 2
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [visibleIndex]);

  return (
    <div className={`${styles.testingBox} d-flex}`}>
      <span className={styles.wordContainer}>
        <span className={styles.testingGradient}>Create.</span>
        <span className={styles.testing} style={{opacity: visibleIndex === 0 ? 0 : 1}}>Create.</span>
      </span>
      <span className={styles.wordContainer}>
        <span className={styles.testingGradient}>Design.</span>
        <span className={styles.testing} style={{opacity: visibleIndex === 1 ? 0 : 1}}>Design.</span>
      </span>
      <span className={styles.wordContainer}>
        <span className={styles.testingGradient}>Prototype.</span>
        <span className={styles.testing} style={{opacity: visibleIndex === 2 ? 0 : 1}}>Prototype.</span>
      </span>
    </div>
  );
}
