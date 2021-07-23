import { defaults } from 'chart.js';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Doughnut } from 'react-chartjs-2'
import styles from './Portfolio.module.css';


const AssetsChart = ({ accounts, assets }) => {

  let assetNames = []
  let assetAmounts = []
  let assetsTotal = 0

  accounts.map((account) => {
    assetNames.push(account.account_name);
    assetAmounts.push(account.balance)
    assetsTotal += account.balance
  })

  assets.map((asset) => {
    let value = 0;
    assetNames.push(asset.asset_description);
    value = asset.current_value
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
        <h2>Assets</h2>
        <h2>Assets Value: {<NumberFormat value={assetsTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</h2>
      </div>
      <Doughnut className={styles.pieChart} data={data} options={options} />
    </>
  )
}

export default AssetsChart;
