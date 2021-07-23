import { defaults } from 'chart.js';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Doughnut } from 'react-chartjs-2'
import styles from './Portfolio.module.css';


const DebtChart = ({ assets, creditCards, otherObligations }) => {

  let owedNames = []
  let owedAmounts = []
  let owedTotal = 0


  assets.map((asset) => {
    if (asset.amount_owed > 0) {
      owedNames.push(asset.asset_description);
      owedAmounts.push(asset.amount_owed)
      owedTotal += asset.amount_owed
    }
  })

  creditCards.map(card => {
    if (card.current_balance > 0) {
      owedNames.push(card.account_name);
      owedAmounts.push(card.current_balance)
      owedTotal += card.current_balance
    }
  })

  otherObligations.map(other => {
    if (other.current_balance > 0) {
      owedNames.push(other.account_description);
      owedAmounts.push(other.current_balance)
      owedTotal += other.current_balance
    }
  })

  const data = {
    labels: owedNames,
    datasets: [
      {
        label: 'Expense Breakdown',
        data: owedAmounts,
        backgroundColor: [
          'rgba(75, 45, 195, 0.5)',
          'rgba(19, 167, 107, 0.5)',
          'rgba(255, 228, 1, 0.5)',
          'rgba(102, 252, 241, 0.5)',
          'rgba(175, 210, 116, 0.5)',
          'rgba(238, 76, 125, 0.5)',
          'rgba(24, 38, 39, 0.5)',
          'rgba(255, 118, 0, 0.5)',
        ],
        borderColor: [
          'rgb(129, 138, 139)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 15
          },
        }
      },
    },
  }

  return (
    <>
      <div className={styles.chart_header}>
        <h2>Debt</h2>
        <h2>Debt Owed: {<NumberFormat value={owedTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</h2>
      </div>
      <Doughnut className={styles.pieChart} data={data} options={options} />
    </>
  )
}

export default DebtChart;
