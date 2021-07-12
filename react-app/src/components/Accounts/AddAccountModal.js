import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAccount } from '../../store/accounts';
import styles from './Accounts.module.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: '1'
  }
};

function AddAccountModal({ accountAddModal, setAccountAddModal }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("Checking");
  const [balance, setBalance] = useState("");

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let account = {
      user_id: userId,
      account_name: accountName,
      account_type: accountType,
      balance
    }
    dispatch(createUserAccount(account))
    setAccountAddModal(false)
  }

  function closeModal() {
    setAccountAddModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={accountAddModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        >
        <div className={styles.modal_wrapper}>
          <h1>Add Account</h1>
          <form onSubmit={submitEvent}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="accountName">Account Name:</label>
        <input
          name="accountName"
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="accountType">Account Type:</label>
          <select onChange={(e) => setAccountType(e.target.value)} name="accountType">
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            <option value="Retirement">Retirement</option>
          </select>
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="balance">Balance:</label>
        <input
          name="balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Add</button>
        <button onClick={(e) => setAccountAddModal(false)}>Cancel</button>
      </div>
    </form>
        </div>
      </Modal>
    </div>
  );
}

export default AddAccountModal;
