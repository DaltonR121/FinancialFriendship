import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { createUserMonthlyReoccurring } from '../../store/monthlyReoccurrings';
import styles from './MonthlyReoccurring.module.css'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: "1",
  },
};

const AddMonthlyReoccurringModal = ({ monthlyReoccurringAddModal, setMonthlyReoccurringAddModal }) => {
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
    setMonthlyReoccurringAddModal(false)
  }

  function closeModal() {
    setMonthlyReoccurringAddModal(false);
  }

  return (
    <div>
    <Modal
      isOpen={monthlyReoccurringAddModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className={styles.modal_wrapper}>
        <h1>Add Monthly Reoccurring</h1>
    <form onSubmit={submitEvent}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
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
        <button onClick={(e) => setMonthlyReoccurringAddModal(false)}>Cancel</button>
      </div>
    </form>
    </div>
      </Modal>
    </div>
  );
};

export default AddMonthlyReoccurringModal;
