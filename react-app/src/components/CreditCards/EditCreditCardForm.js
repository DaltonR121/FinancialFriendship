import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserCreditCard } from '../../store/creditCards';

const EditCreditCardForm = ({ creditCardEditForm, setCreditCardEditForm, creditCard }) => {
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
    setCreditCardEditForm(false)
  }

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
        <button type="submit">Edit</button>
        <button onClick={(e) => setCreditCardEditForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditCreditCardForm;
