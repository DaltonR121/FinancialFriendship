import React from 'react';
import styles from './Splash.module.css'
import money from '../../../src/assets/money.png'

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
        <div className={styles.main_content__right}>
          <h1>Our Platform</h1>
          <h3>We exist as a resource to help YOU keep track of your financial wellbeing.  You won't see any automated account balances and that is by design.  We believe the number one way to keep track of your finances is to be involved in your accounts and know exactly where every penny is and what it is doing!</h3>
          <img src={money} />
        </div>
      </div>
      {/* <div className={styles.splash__secondary_content}>
          <div className={styles.secondary_content__left}>
          
          </div>
          <div className={styles.secondary_content__right}>
            <h1>Our Platform</h1>
          </div>
      </div> */}
    </div>
  );
}

export default Splash;
