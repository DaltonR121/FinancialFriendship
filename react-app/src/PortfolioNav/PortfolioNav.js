import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './PortfolioNav.module.css'

const PortfolioNav = () => {

  return(
    <div className={styles.portfolo__wrapper}>
      <div className={styles.page__tabs}>
        <div className={styles.accounts__tab}>
          <NavLink to={'/accounts'}>Accounts</NavLink>
        </div>
        <div className={styles.accounts__tab}>
          <NavLink to={'/'}>Assets</NavLink>
        </div>
        <div className={styles.accounts__tab}>
          <NavLink to={'/'}>Credit Cards</NavLink>
        </div>
        <div className={styles.accounts__tab}>
          <NavLink to={'/'}>Reoccuring Bills</NavLink>
        </div>
        <div className={styles.accounts__tab}>
          <NavLink to={'/'}>Other Obligations</NavLink>
        </div>
      </div>
    </div>
  );
}

export default PortfolioNav;
