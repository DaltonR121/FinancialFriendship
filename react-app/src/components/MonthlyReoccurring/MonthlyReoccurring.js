import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { getUserMonthlyReoccurring } from '../../store/monthlyReoccurrings'
import AddMonthlyReoccurringForm from './AddMonthlyReoccurringModal';
import EditMonthlyReoccurringForm from './EditMonthlyReoccurringModal'
import styles from './MonthlyReoccurring.module.css'

const MonthlyReoccurrings = () => {
  const dispatch = useDispatch();

  const [monthlyReoccurringAddModal, setMonthlyReoccurringAddModal] = useState(false);
  const [monthlyReoccurringEditModal, setMonthlyReoccurringEditModal] = useState(false);
  const [monthlyReoccurring, setMonthlyReoccurring] = useState();

  const userId = useSelector((state) => state.session.user.id);
  const monthlyReoccurrings = useSelector((state) => Object.values(state.monthlyReoccurrings));

  const monthlyReoccurringsTotal = () => {
    let total = 0;
    monthlyReoccurrings.map(monthlyReoccurring => {
      total += monthlyReoccurring.amount 
    })
    return total;
  }
  
  useEffect(() => {
    dispatch(getUserMonthlyReoccurring(userId));
  }, [])

  return (
    <div className={styles.monthlyReoccurrings__wrapper}>
      <h1>Monthly Reoccurring</h1>
      <h2>Total: {<NumberFormat value={monthlyReoccurringsTotal()} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</h2>
      <div onClick={(e) => setMonthlyReoccurringAddModal(true)} className={styles.add_monthlyReoccurring}>
        <h2>+</h2>
      </div>
      <div className={styles.monthlyReoccurrings_table_wrapper}>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {monthlyReoccurrings.map((monthlyReoccurring) => (
              <tr onClick={(e) => setMonthlyReoccurring(monthlyReoccurring)} onDoubleClick={(e) => setMonthlyReoccurringEditModal(monthlyReoccurring)} key={monthlyReoccurring.id}>
                <td>{monthlyReoccurring.account_description}</td>
                <td>{<NumberFormat value={monthlyReoccurring.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                <td>{monthlyReoccurring.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {monthlyReoccurringAddModal && <AddMonthlyReoccurringForm monthlyReoccurringAddModal={monthlyReoccurringAddModal} setMonthlyReoccurringAddModal={setMonthlyReoccurringAddModal} />}
      {monthlyReoccurringEditModal && <EditMonthlyReoccurringForm monthlyReoccurringEditModal={monthlyReoccurringEditModal} setMonthlyReoccurringEditModal={setMonthlyReoccurringEditModal} monthlyReoccurring={monthlyReoccurring} />}
    </div>
  );
}

export default MonthlyReoccurrings;
