import { defaults } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2'
import styles from './Portfolio.module.css';

defaults.legend = 'bottom';

const ExpensesChart = ({ monthlyReoccurrings }) => {

  let bills = []
  let billNames = []
  let assetsTotal = 0

  monthlyReoccurrings.map((bill, i) => {
    bills.push(bill.amount);
    billNames.push(bill.account_description)
    assetsTotal += bill.amount
  })

  const data = {
    labels: billNames,
    datasets: [
      {
        label: 'Expense Breakdown',
        data: bills,
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(0, 0, 0, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(62, 33, 93, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(6, 68, 32, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(62, 33, 93, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(6, 68, 32, 1)',
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
    }
  }

  return (
    <>
      <div className={styles.chart_header}>
        <h2>Expenses</h2>
        <h2>Monthly Expenses: ${ assetsTotal }</h2>
      </div>
      <Doughnut className={styles.pieChart} data={data} options={options} />
    </>
  )
}

export default ExpensesChart;
