import { defaults } from 'chart.js';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
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
    }
  }

  return (
    <>
      <div className={styles.chart_header}>
        <h2>Expenses</h2>
        <h2>Monthly Expenses: {<NumberFormat value={assetsTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</h2>
      </div>
      <Doughnut className={styles.pieChart} data={data} options={options} />
    </>
  )
}

export default ExpensesChart;
