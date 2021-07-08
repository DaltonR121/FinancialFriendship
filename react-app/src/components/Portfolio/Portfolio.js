import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount } from '../../store/accounts';
import { getUserAsset } from '../../store/assets';
import { getCreditCards } from '../../store/creditCards';
import { getUserMonthlyReoccurring } from '../../store/monthlyReoccurrings';
import { getUserOtherObligation } from '../../store/otherObligations';
import PiChart from './PieChart';
import styles from './Portfolio.module.css';

const Portfolio = () => {
  const dispatch = useDispatch();

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
      total += account.current_value
    })
    return total;
  }

  const totalLiabilites = () => {
    let total = 0;
    creditCards.map(account => {
      total += account.current_balance
    })
    monthlyReoccurrings.map(account => {
      total += account.amount
    })
    otherObligations.map(account => {
      total += account.current_balance
    })
    return total;
  }

  const netWorth = () => {
    return totalAssets() - totalLiabilites();
  }
  
  useEffect(() => {
    dispatch(getUserAccount(userId));
    dispatch(getUserAsset(userId));
    dispatch(getCreditCards(userId));
    dispatch(getUserMonthlyReoccurring(userId));
    dispatch(getUserOtherObligation(userId));
  }, [])

  return(
    <>
    <h1>Net Worth: ${netWorth()}</h1>
    <div className={styles.pieChartWrapper}>
      <PiChart 
        accounts = {accounts} 
        assets = {assets} 
        creditCards = {creditCards}
        monthlyReoccurrings = {monthlyReoccurrings}
        otherObligations = {otherObligations}
      />
    </div>
    </>
  ); 
}

export default Portfolio;
