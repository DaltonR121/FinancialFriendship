import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOtherObligation, deleteUserOtherObligation } from '../../store/otherObligations'
import AddOtherObligationsModal from './AddOtherObligationsModal';
import EditOtherObligationModalAddOtherObligationsModal from './EditOtherObligationsModal'
import styles from './OtherObligations.module.css'

const OtherObligations = () => {
  const dispatch = useDispatch();

  const [otherObligationAddModal, setOtherObligationAddModal] = useState(false);
  const [otherObligationEditModal, setOtherObligationEditModal] = useState(false);
  const [otherObligation, setOtherObligation] = useState();

  const userId = useSelector((state) => state.session.user.id);
  const otherObligations = useSelector((state) => Object.values(state.otherObligations));

  const otherObligationsTotal = () => {
    let total = 0;
    otherObligations.map(otherObligation => {
      total += otherObligation.current_balance 
    })
    return total;
  }
  
  useEffect(() => {
    dispatch(getUserOtherObligation(userId));
  }, [])

  return (
    <div className={styles.otherObligations__wrapper}>
      <h1>Other Obligations</h1>
      <h2>Total: ${otherObligationsTotal()}</h2>
      <div onClick={(e) => setOtherObligationAddModal(true)} className={styles.add_otherObligation}>
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
              <tr onClick={(e) => setOtherObligation(otherObligation)} onDoubleClick={(e) => setOtherObligationEditModal(otherObligation)} key={otherObligation.id}>
                <td>{otherObligation.account_description}</td>
                <td>${otherObligation.current_balance}</td>
                <td>{otherObligation.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {otherObligationAddModal && <AddOtherObligationsModal otherObligationAddModal={otherObligationAddModal} setOtherObligationAddModal={setOtherObligationAddModal} />}
      {otherObligationEditModal && <EditOtherObligationModalAddOtherObligationsModal otherObligationEditModal={otherObligationEditModal} setOtherObligationEditModal={setOtherObligationEditModal} otherObligation={otherObligation} />}
    </div>
  );
}

export default OtherObligations;
