import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOtherObligation, deleteUserOtherObligation } from '../../store/otherObligations'
import AddOtherObligationForm from './AddOtherObligationsForm';
import EditOtherObligationForm from './EditOtherObligationsForm'
import styles from './OtherObligations.module.css'

const OtherObligations = () => {
  const [otherObligationAddForm, setOtherObligationAddForm] = useState(false);
  const [otherObligationEditForm, setOtherObligationEditForm] = useState(false);
  const [otherObligation, setOtherObligation] = useState();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const otherObligations = useSelector((state) => Object.values(state.otherObligations));

  const otherObligationsTotal = () => {
    let total = 0;
    otherObligations.map(otherObligation => {
      total += otherObligation.current_balance 
    })

    return total;
  }

  const deleteOtherObligation = (otherObligationId) => {
    dispatch(deleteUserOtherObligation(otherObligationId))
  }
  
  useEffect(() => {
    dispatch(getUserOtherObligation(userId));
  }, [])

  return (
    <div className={styles.otherObligations__wrapper}>
      <h1>Other Obligations</h1>
      <h2>Total: ${otherObligationsTotal()}</h2>
      <div onClick={(e) => setOtherObligationAddForm(true)} className={styles.add_otherObligation}>
        <h2>+</h2>
      </div>
      <div className={styles.otherObligations_table_wrapper}>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Current Balance</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {otherObligations.map((otherObligation) => (
              <tr onClick={(e) => setOtherObligation(otherObligation)} onDoubleClick={(e) => setOtherObligationEditForm(otherObligation)} key={otherObligation.id}>
                <td>{otherObligation.account_description}</td>
                <td>${otherObligation.current_balance}</td>
                <td>{otherObligation.due_date}<button onClick={(e) => deleteOtherObligation(otherObligation.id)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {otherObligationAddForm ? (
        <div className={styles.add_otherObligation_form_wrapper}>
          <AddOtherObligationForm otherObligationAddForm={otherObligationAddForm} setOtherObligationAddForm={setOtherObligationAddForm} />
        </div>
      ) : null}
      {otherObligationEditForm ? (
        <div className={styles.add_otherObligation_form_wrapper}>
          <EditOtherObligationForm otherObligationEditForm={otherObligationEditForm} 
            setOtherObligationEditForm={setOtherObligationEditForm}
            otherObligation={otherObligation}
             />
        </div>
      ) : null}
    </div>
  );
}

export default OtherObligations;
