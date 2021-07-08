import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styles from './Portfolio.module.css';

const PiChart = ({ accounts, assets, creditCards, monthlyReoccurrings, otherObligations }) => {

  return (
    <>
      <h1>Expense Breakdown</h1>
      <PieChart
        data={[
          // monthlyReoccurrings.map(bill => (
          //   { title: bill.account_description, value: bill.amount, color: '#E38627'}
          // ))
          { title: 'One', value: 20, color: '#E38627' },
          { title: 'Two', value: 15, color: '#C13C37' },
          { title: 'Three', value: 20, color: '#6A2135' },
        ]}

      />
    </>
  )
}

export default PiChart;
