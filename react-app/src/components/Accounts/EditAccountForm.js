import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserAccount } from '../../store/accounts';
import { Redirect } from "react-router-dom";

const EditAccountForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [balance, setBalance] = useState("");

  const updateAccount = (accountId) => {
    dispatch(editUserAccount(accountId))
  }


  return (
    <form onSubmit={updateAccount}>
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
          onChange={setAccountName}
        />
      </div>
      <div>
        <label htmlFor="accountType">Account Type:</label>
        <input
          name="accountType"
          type="text"
          value={accountType}
          onChange={setAccountType}
        />
      </div>
      <div>
        <label htmlFor="balance">Balance:</label>
        <input
          name="balance"
          type="text"
          value={balance}
          onChange={setBalance}
        />
      </div>
      <div>
        <button type="submit">Edit</button>
      </div>
    </form>
  );
};

export default EditAccountForm;
