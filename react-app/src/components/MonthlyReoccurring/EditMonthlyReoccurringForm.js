import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserMonthlyReoccurring } from '../../store/monthlyReoccurrings';

const EditMonthlyReoccurringForm = ({ setMonthlyReoccurringEditForm, monthlyReoccurring }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState(monthlyReoccurring.id)
  const [description, setDescription] = useState(monthlyReoccurring.account_description);
  const [balance, setBalance] = useState(monthlyReoccurring.amount);
  const [dueDate, setDueDate] = useState(monthlyReoccurring.due_date);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let monthlyReoccurringUpdate = {
      id: id,
      user_id: userId,
      description: description,
      amount: balance,
      due_date: dueDate
    }
    dispatch(editUserMonthlyReoccurring(monthlyReoccurringUpdate))
    setMonthlyReoccurringEditForm(false)
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
        <label htmlFor="balance">Amount:</label>
        <input
          name="balance"
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
        <button type="submit">Edit</button>
        <button onClick={(e) => setMonthlyReoccurringEditForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditMonthlyReoccurringForm;
