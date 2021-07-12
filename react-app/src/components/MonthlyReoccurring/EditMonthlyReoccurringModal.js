import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { editUserMonthlyReoccurring, deleteUserMonthlyReoccurring } from '../../store/monthlyReoccurrings';
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

const EditMonthlyReoccurringModal = ({ monthlyReoccurringEditModal, setMonthlyReoccurringEditModal, monthlyReoccurring }) => {
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
    setMonthlyReoccurringEditModal(false)
  }

  function closeModal() {
    setMonthlyReoccurringEditModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={monthlyReoccurringEditModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.modal_wrapper}>
          <h1>Edit Monthly Reoccurring</h1>
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
              <button onClick={(e) => setMonthlyReoccurringEditModal(false)}>
                Cancel
              </button>
              <button
                onClick={(e) =>
                  dispatch(deleteUserMonthlyReoccurring(monthlyReoccurring.id))
                }
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditMonthlyReoccurringModal;
