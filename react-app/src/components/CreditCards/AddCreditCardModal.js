import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { createUserCreditCard } from "../../store/creditCards";
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

const AddCreditCardModal = ({ creditCardAddModal, setCreditCardAddModal }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [limit, setLimit] = useState(0);
  const [dueDate, setDueDate] = useState(0);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault();
    let creditCard = {
      user_id: userId,
      account_name: accountName,
      current_balance: currentBalance,
      interest_rate: interestRate,
      limit: limit,
      due_date: dueDate,
    };
    dispatch(createUserCreditCard(creditCard));
    setCreditCardAddModal(false);
  };

  function closeModal() {
    setCreditCardAddModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={creditCardAddModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.modal_wrapper}>
          <h1>Add Credit Card</h1>
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
              <button type="submit">Add</button>
              <button onClick={(e) => setCreditCardAddModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddCreditCardModal;
