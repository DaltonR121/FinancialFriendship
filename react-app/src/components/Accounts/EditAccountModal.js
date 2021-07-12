import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import { editUserAccount, deleteUserAccount } from '../../store/accounts';
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

const EditAccountModal = ({ accountEditModal, setAccountEditModal, account }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [accountName, setAccountName] = useState(account.account_name);
  const [accountType, setAccountType] = useState(account.account_type);
  const [balance, setBalance] = useState(account.balance);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let accountUpdate = {
      id: account.id,
      user_id: userId,
      account_name: accountName,
      account_type: accountType,
      balance
    }
    dispatch(editUserAccount(accountUpdate))
    setAccountEditModal(false)
  }

  function closeModal() {
    setAccountEditModal(false);
  }

  return (
    <>
    <Modal
        isOpen={accountEditModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        >
        <div className={styles.modal_wrapper}>
          <h1>Edit Account</h1>
    <form onSubmit={submitEvent}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="accountName">Account Name:</label>
        <input
          name="accountName"
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="accountType">Account Type:</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)} name="accountType">
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            <option value="Retirement">Retirement</option>
          </select>
      </div>
      <div>
        <label htmlFor="balance">Balance:</label>
        <input
          name="balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Save</button>
        <button onClick={(e) => setAccountEditModal(false)}>Cancel</button>
        <button onClick={(e) => dispatch(deleteUserAccount(account.id))}>Delete</button>
      </div>
    </form>
    </div>
    </Modal>
    </>
  );
};

export default EditAccountModal;
