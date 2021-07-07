import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserMonthlyReoccurring } from '../../store/monthlyReoccurrings';

const AddMonthlyReoccurringForm = ({ setMonthlyReoccurringAddForm }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);
  const [dueDate, setDueDate] = useState(0);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let monthlyReoccurring = {
      user_id: userId,
      description: description,
      amount: balance,
      due_date: dueDate
    }
    dispatch(createUserMonthlyReoccurring(monthlyReoccurring))
    setMonthlyReoccurringAddForm(false)
  }

  return (
    <form onSubmit={submitEvent}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="description">MonthlyReoccurring Name:</label>
        <input
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          name="amount"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
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
        <button onClick={(e) => setMonthlyReoccurringAddForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default AddMonthlyReoccurringForm;
