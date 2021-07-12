import { defaults } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2'
import styles from './Portfolio.module.css';


const AssetsChart = ({ accounts, assets }) => {

  let assetNames = []
  let assetAmounts = []
  let assetsTotal = 0

  accounts.map((account) => {
    assetNames.push(account.account_name);
    assetAmounts.push(account.balance)
  })

  assets.map((asset) => {
    let value = 0;
    assetNames.push(asset.asset_description);
    value = asset.current_value - asset.amount_owed
    assetAmounts.push(value)
    assetsTotal += value
  })


  const data = {
    labels: assetNames,
    datasets: [
      {
        label: 'Expense Breakdown',
        data: assetAmounts,
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
        <h2>Assets</h2>
        <h2>Total Asset Value: ${ assetsTotal }</h2>
      </div>
      <Doughnut className={styles.pieChart} data={data} options={options} />
    </>
  )
}

export default AssetsChart;
