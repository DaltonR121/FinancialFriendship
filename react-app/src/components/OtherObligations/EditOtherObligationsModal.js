import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { editUserOtherObligation, deleteUserOtherObligation } from '../../store/otherObligations';
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

const EditOtherObligationModal = ({ otherObligationEditModal, setOtherObligationEditModal, otherObligation }) => {
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
    setOtherObligationEditModal(false)
  }

  function closeModal() {
    setOtherObligationEditModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={otherObligationEditModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.modal_wrapper}>
          <h1>Edit Other Obligation</h1>
          <form onSubmit={submitEvent}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div className={styles.modal_input}>
              <label htmlFor="otherObligationDescription">
                OtherObligation Name:
              </label>
              <input
                name="otherObligationDescription"
                type="text"
                value={otherObligationDescription}
                onChange={(e) => setOtherObligationDescription(e.target.value)}
              />
            </div>
            <div className={styles.modal_input}>
              <label htmlFor="balance">Current Balance:</label>
              <input
                name="balance"
                type="number"
                value={otherObligationBalance}
                onChange={(e) => setOtherObligationBalance(e.target.value)}
              />
            </div>
            <div className={styles.modal_input}>
              <label htmlFor="dueDate">Due Date:</label>
              <input
                name="dueDate"
                type="number"
                value={otherObligationDueDate}
                onChange={(e) => setOtherObligationDueDate(e.target.value)}
              />
            </div>
            <div className={styles.modal_buttons}>
              <button type="submit">Edit</button>
              <button onClick={(e) => setOtherObligationEditModal(false)}>
                Cancel
              </button>
              <button id={styles.delete_button}
                onClick={(e) =>
                  dispatch(deleteUserOtherObligation(otherObligation.id))
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

export default EditOtherObligationModal;
