import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserOtherObligation } from '../../store/otherObligations';

const EditOtherObligationForm = ({ setOtherObligationEditForm, otherObligation }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState(otherObligation.id)
  const [otherObligationDescription, setOtherObligationDescription] = useState(otherObligation.account_description);
  const [otherObligationBalance, setOtherObligationBalance] = useState(otherObligation.current_balance);
  const [otherObligationDueDate, setOtherObligationDueDate] = useState(otherObligation.due_date);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let otherObligationUpdate = {
      id: id,
      user_id: userId,
      description: otherObligationDescription,
      current_balance: otherObligationBalance,
      due_date: otherObligationDueDate
    }
    dispatch(editUserOtherObligation(otherObligationUpdate))
    setOtherObligationEditForm(false)
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
        <button type="submit">Edit</button>
        <button onClick={(e) => setOtherObligationEditForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditOtherObligationForm;
