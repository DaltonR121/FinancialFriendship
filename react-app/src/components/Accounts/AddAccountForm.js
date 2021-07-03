import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAccount } from '../../store/accounts';

const AddAccountForm = ({ accountAddForm, setAccountAddForm }) => {
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
    setAccountAddForm(false)
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
          <select onChange={(e) => setAccountType(e.target.value)} name="accountType">
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
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddAccountForm;
