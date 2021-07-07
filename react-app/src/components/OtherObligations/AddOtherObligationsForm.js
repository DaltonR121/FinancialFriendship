import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserOtherObligation } from '../../store/otherObligations';

const AddOtherObligationForm = ({ setOtherObligationAddForm }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [otherObligationDescription, setOtherObligationDescription] = useState("");
  const [otherObligationBalance, setOtherObligationBalance] = useState("Checking");
  const [otherObligationDueDate, setOtherObligationDueDate] = useState("");

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let otherObligation = {
      user_id: userId,
      description: otherObligationDescription,
      current_balance: otherObligationBalance,
      due_date: otherObligationDueDate
    }
    dispatch(createUserOtherObligation(otherObligation))
    setOtherObligationAddForm(false)
  }

  return (
    <form onSubmit={submitEvent}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="otherObligationDescription">OtherObligation Name:</label>
        <input
          name="otherObligationDescription"
          type="text"
          value={otherObligationDescription}
          onChange={(e) => setOtherObligationDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="balance">Current Balance:</label>
        <input
          name="balance"
          type="number"
          value={otherObligationBalance}
          onChange={(e) => setOtherObligationBalance(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          name="dueDate"
          type="number"
          value={otherObligationDueDate}
          onChange={(e) => setOtherObligationDueDate(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Add</button>
        <button onClick={(e) => setOtherObligationAddForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default AddOtherObligationForm;
