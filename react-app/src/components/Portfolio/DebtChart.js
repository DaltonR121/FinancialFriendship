import { defaults } from 'chart.js';
import React, { useEffect, useState } from 'react';
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
          'rgba(51, 66, 87, 0.5)',
          'rgba(141, 40, 40, 0.5)',
          'rgba(79, 14, 14, 0.5)',
          'rgba(82, 0, 106, 0.5)',
          'rgba(153, 105, 13, 0.5)',
          'rgba(255, 118, 0, 0.5)',
          'rgba(75, 45, 195, 0.5)',
        ],
        borderColor: [
          'rgba(51, 66, 87, 1)',
          'rgba(141, 40, 40, 1)',
          'rgba(79, 14, 14, 1)',
          'rgba(82, 0, 106, 1)',
          'rgba(153, 105, 13, 1)',
          'rgba(255, 118, 0, 1)',
          'rgba(75, 45, 195, 1)',
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
        <h2>Total Owed: ${ owedTotal }</h2>
      </div>
      <Doughnut className={styles.pieChart} data={data} options={options} />
    </>
  )
}

export default DebtChart;
