import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { getUserAccount } from '../../store/accounts';
import { getUserAsset } from '../../store/assets';
import { getCreditCards } from '../../store/creditCards';
import { getUserMonthlyReoccurring } from '../../store/monthlyReoccurrings';
import { getUserOtherObligation } from '../../store/otherObligations';
import { useEditProfile } from '../context/EditProfileContext';
import AssetsChart from './AssetsChart';
import DebtChart from './DebtChart';
import ExpensesChart from './ExpensesChart';
import styles from './Portfolio.module.css';

const Portfolio = () => {
  const dispatch = useDispatch();

  const { modalOpen, setModalOpen } = useEditProfile()

  const userId = useSelector((state) => state.session.user.id);
  const accounts = useSelector((state) => Object.values(state.accounts));
  const assets = useSelector((state) => Object.values(state.assets));
  const creditCards = useSelector((state) => Object.values(state.creditCards));
  const monthlyReoccurrings = useSelector((state) => Object.values(state.monthlyReoccurrings));
  const otherObligations = useSelector((state) => Object.values(state.otherObligations));

  const totalAssets = () => {
    let total = 0;
    accounts.map(account => {
      total += account.balance
    })
    assets.map(account => {
      total += (account.current_value - account.amount_owed)
    })
    return total;
  }

  const totalLiabilites = () => {
    let total = 0;
    creditCards.map(account => {
      total += account.current_balance
    })
    otherObligations.map(account => {
      total += account.current_balance
    })
    return total;
  }

  const netWorth = () => {
    let networth = totalAssets() - totalLiabilites();
    return <NumberFormat value={networth} displayType={'text'} thousandSeparator={true} prefix={'$'} />;
  }
  
  useEffect(() => {
    dispatch(getUserAccount(userId));
    dispatch(getUserAsset(userId));
    dispatch(getCreditCards(userId));
    dispatch(getUserMonthlyReoccurring(userId));
    dispatch(getUserOtherObligation(userId));
  }, [])

  return(
    <div className={styles.portfolio_wrapper}>
      <div className={styles.portfolio_header}>
        <h1>Portfolio</h1>
        <h2>Net Worth: {netWorth()}</h2>
      </div>
      {modalOpen ? null : (
      <div className={styles.charts_wrapper}>
        <div className={styles.pieChartWrapper}>
            <AssetsChart className={styles.chart} accounts={accounts} assets={assets} />
        </div>
        <div className={styles.pieChartWrapper}>
            <ExpensesChart className={styles.chart} monthlyReoccurrings={monthlyReoccurrings} />
        </div>
        <div className={styles.pieChartWrapper}>
            <DebtChart className={styles.chart} assets={assets} creditCards={creditCards} otherObligations={otherObligations} />
        </div>
      </div>
      )}
    </div>
  ); 
}

export default Portfolio;
