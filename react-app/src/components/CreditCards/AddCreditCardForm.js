import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserCreditCard } from '../../store/creditCards';

const AddCreditCardForm = ({ creditCardAddForm, setCreditCardAddForm }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [accountName, setAccountName] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [limit, setLimit] = useState(0);
  const [dueDate, setDueDate] = useState(0);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    console.log(e)
    e.preventDefault()
    let creditCard = {
      user_id: userId,
      account_name: accountName,
      current_balance: currentBalance,
      interest_rate: interestRate,
      limit: limit,
      due_date: dueDate
    }
    dispatch(createUserCreditCard(creditCard))
    setCreditCardAddForm(false)
  }

  console.log(accountName)

  return (
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
        <button onClick={(e) => setCreditCardAddForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default AddCreditCardForm;
