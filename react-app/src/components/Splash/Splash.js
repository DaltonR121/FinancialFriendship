import React from 'react';
import styles from './Splash.module.css'

const Splash = () => {
  return (
    <div className={styles.splash__wrapper}>
      <div className={styles.splash__main_content}>
        <div className={styles.main_content__left}>
          <div className={styles.syling__box}>
            <div className={styles.quote__container}>
              <h2>"Friendship is like money, easier made than kept." - Samuel Butler</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.splash__secondary_content}>
          <div className={styles.secondary_content__left}>
          
          </div>
          <div className={styles.secondary_content__right}>
            <h1>Our Platform</h1>
          </div>
      </div>
    </div>
  );
}

export default Splash;
