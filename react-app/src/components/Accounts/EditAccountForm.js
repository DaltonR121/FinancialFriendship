import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserAccount } from '../../store/accounts';

const EditAccountForm = ({ accountEditForm, setAccountEditForm, account }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [accountName, setAccountName] = useState(account.account_name);
  const [accountType, setAccountType] = useState(account.account_type);
  const [balance, setBalance] = useState(account.balance);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let accountUpdate = {
      // table id not being passed...? Start here
      id: account.id,
      user_id: userId,
      account_name: accountName,
      account_type: accountType,
      balance
    }
    dispatch(editUserAccount(accountUpdate))
    setAccountEditForm(false)
  }

  return (
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
        <button onClick={(e) => setAccountEditForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditAccountForm;
