import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCreditCards, deleteUserCreditCard } from '../../store/creditCards'
import AddCreditCardForm from './AddCreditCardForm';
import EditCreditCardForm from './EditCreditCardForm'
import styles from './CreditCards.module.css'

const CreditCards = () => {
  const dispatch = useDispatch();

  const [creditCardAddForm, setCreditCardAddForm] = useState(false);
  const [creditCardEditForm, setCreditCardEditForm] = useState(false);
  const [creditCard, setCreditCard] = useState(null);

  const userId = useSelector((state) => state.session.user.id);
  const creditCards = useSelector((state) => Object.values(state.creditCards));

  const creditCardsTotal = () => {
    let total = 0;
    creditCards.map(creditCard => {
      total += creditCard.current_balance
    })
    return total.toFixed(2);
  }

  const utilization = () => {
    let balanceTotal = 0;
    let limitTotal = 0;
    creditCards.map(creditCard => {
      balanceTotal += creditCard.current_balance
      limitTotal += creditCard.limit
    })
    const utilization = (balanceTotal / limitTotal) * 100
    return utilization.toFixed(2);
  }
  
  useEffect(() => {
    dispatch(getCreditCards(userId));
  }, [])

  return (
    <div className={styles.creditCards__wrapper}>
      <h1>Credit Cards</h1>
      <h2>Credit Card Debt: ${creditCardsTotal()}</h2>
      <h2>Credit Utilization: {utilization()}%</h2>
      <div onClick={(e) => setCreditCardAddForm(true)} className={styles.add_creditCard}>
        <h2>+</h2>
      </div>
      <div className={styles.creditCards_table_wrapper}>
        <table>
          <thead>
            <tr>
              <th>Card Name</th>
              <th>Balance</th>
              <th>Interest Rate</th>
              <th>Limit</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {creditCards.map((creditCard) => (
              <tr onClick={(e) => setCreditCard(creditCard)} onDoubleClick={(e) => setCreditCardEditForm(creditCard)} key={creditCard.id}>
                <td>{creditCard.account_name}</td>
                <td>${creditCard.current_balance}</td>
                <td>{creditCard.interest_rate}%</td>
                <td>{creditCard.limit}</td>
                <td>{creditCard.due_date}<button onClick={(e) => dispatch(deleteUserCreditCard(creditCard.id))}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {creditCardAddForm ? (
        <div className={styles.add_creditCard_form_wrapper}>
          <AddCreditCardForm creditCardAddForm={creditCardAddForm} setCreditCardAddForm={setCreditCardAddForm} />
        </div>
      ) : null}
      {creditCardEditForm ? (
        <div className={styles.add_creditCard_form_wrapper}>
          <EditCreditCardForm creditCardEditForm={creditCardEditForm} 
            setCreditCardEditForm={setCreditCardEditForm}
            creditCard={creditCard}
             />
        </div>
      ) : null}
    </div>
  );
}

export default CreditCards;
