import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMonthlyReoccurring, deleteUserMonthlyReoccurring } from '../../store/monthlyReoccurrings'
import AddMonthlyReoccurringForm from './AddMonthlyReoccurringForm';
import EditMonthlyReoccurringForm from './EditMonthlyReoccurringForm'
import styles from './MonthlyReoccurring.module.css'

const MonthlyReoccurrings = () => {
  const dispatch = useDispatch();

  const [monthlyReoccurringAddForm, setMonthlyReoccurringAddForm] = useState(false);
  const [monthlyReoccurringEditForm, setMonthlyReoccurringEditForm] = useState(false);
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
      <h2>Total: ${monthlyReoccurringsTotal()}</h2>
      <div onClick={(e) => setMonthlyReoccurringAddForm(true)} className={styles.add_monthlyReoccurring}>
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
              <tr onClick={(e) => setMonthlyReoccurring(monthlyReoccurring)} onDoubleClick={(e) => setMonthlyReoccurringEditForm(monthlyReoccurring)} key={monthlyReoccurring.id}>
                <td>{monthlyReoccurring.account_description}</td>
                <td>${monthlyReoccurring.amount}</td>
                <td>{monthlyReoccurring.due_date}<button onClick={(e) => dispatch(deleteUserMonthlyReoccurring(monthlyReoccurring.id))}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {monthlyReoccurringAddForm ? (
        <div className={styles.add_monthlyReoccurring_form_wrapper}>
          <AddMonthlyReoccurringForm monthlyReoccurringAddForm={monthlyReoccurringAddForm} setMonthlyReoccurringAddForm={setMonthlyReoccurringAddForm} />
        </div>
      ) : null}
      {monthlyReoccurringEditForm ? (
        <div className={styles.add_monthlyReoccurring_form_wrapper}>
          <EditMonthlyReoccurringForm setMonthlyReoccurringEditForm={setMonthlyReoccurringEditForm} monthlyReoccurring={monthlyReoccurring} />
        </div>
      ) : null}
    </div>
  );
}

export default MonthlyReoccurrings;
