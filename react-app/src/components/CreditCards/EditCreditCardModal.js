import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { editUserCreditCard, deleteUserCreditCard } from '../../store/creditCards';
import styles from './CreditCards.module.css'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: "1",
  },
};

const EditCreditCardModal = ({ creditCardEditModal, setCreditCardEditModal, creditCard }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState(creditCard.id)
  const [accountName, setAccountName] = useState(creditCard.account_name);
  const [currentBalance, setCurrentBalance] = useState(creditCard.current_balance);
  const [interestRate, setInterestRate] = useState(creditCard.interest_rate);
  const [limit, setLimit] = useState(creditCard.limit);
  const [dueDate, setDueDate] = useState(creditCard.due_date);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let creditCardUpdate = {
      id: id,
      user_id: userId,
      account_name: accountName,
      current_balance: currentBalance,
      interest_rate: interestRate,
      limit: limit,
      due_date: dueDate
    }
    dispatch(editUserCreditCard(creditCardUpdate))
    setCreditCardEditModal(false)
  }

  function closeModal() {
    setCreditCardEditModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={creditCardEditModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.modal_wrapper}>
          <h1>Edit Credit Card</h1>
          <form onSubmit={submitEvent}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor="creditCardName">Card Name:</label>
              <input
                name="creditCardName"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="currentBalance">Balance:</label>
              <input
                name="currentBalance"
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="interestRate">Interest Rate:</label>
              <input
                name="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="limit">Limit:</label>
              <input
                name="limit"
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dueDate">Due Date:</label>
              <input
                name="dueDate"
                type="number"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Edit</button>
              <button onClick={(e) => setCreditCardEditModal(false)}>
                Cancel
              </button>
              <button onClick={(e) => dispatch(deleteUserCreditCard(creditCard.id))}>Delete</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditCreditCardModal;
