import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { createUserOtherObligation } from '../../store/otherObligations';
import styles from './OtherObligations.module.css'

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

const AddOtherObligationModal = ({ otherObligationAddModal, setOtherObligationAddModal }) => {
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
    setOtherObligationAddModal(false)
  }

  function closeModal() {
    setOtherObligationAddModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={otherObligationAddModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.modal_wrapper}>
          <h1>Add Other Obligation</h1>
          <form onSubmit={submitEvent}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor="otherObligationDescription">
                Description:
              </label>
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
              <button onClick={(e) => setOtherObligationAddModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddOtherObligationModal;
