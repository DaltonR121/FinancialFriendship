import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsset } from "../../store/assets";
import styles from "./Assets.module.css";

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

const AddAssetForm = ({ assetAddModal, setAssetAddModal }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [assetDescription, setAssetDescription] = useState("");
  const [assetCurrentValue, setAssetCurrentValue] = useState(0);
  const [assetAmountOwed, setAssetAmountOwed] = useState(0);
  const [assetInterestRate, setAssetInterestRate] = useState(0);
  const [assetDueDate, setAssetDueDate] = useState(0);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault();
    let asset = {
      user_id: userId,
      asset_description: assetDescription,
      asset_current_value: assetCurrentValue,
      asset_amount_owed: assetAmountOwed,
      asset_interest_rate: assetInterestRate,
      asset_due_date: assetDueDate,
    };
    dispatch(createUserAsset(asset));
    setAssetAddModal(false);
  };

  function closeModal() {
    setAssetAddModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={assetAddModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.modal_wrapper}>
          <h1>Add Asset</h1>
          <form onSubmit={submitEvent}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div className={styles.modal_input}>
              <label htmlFor="assetDescription">Asset Description:</label>
              <input
                name="assetDescription"
                type="text"
                value={assetDescription}
                onChange={(e) => setAssetDescription(e.target.value)}
              />
            </div>
            <div className={styles.modal_input}>
              <label htmlFor="assetCurrentValue">Current Value:</label>
              <input
                name="assetCurrentValue"
                type="number"
                value={assetCurrentValue}
                onChange={(e) => setAssetCurrentValue(e.target.value)}
              />
            </div>
            <div className={styles.modal_input}>
              <label htmlFor="assetAmountOwed">Amount Owed:</label>
              <input
                name="assetAmountOwed"
                type="number"
                value={assetAmountOwed}
                onChange={(e) => setAssetAmountOwed(e.target.value)}
              />
            </div>
            <div className={styles.modal_input}>
              <label htmlFor="assetInterestRate">Interest Rate:</label>
              <input
                name="assetInterestRate"
                type="number"
                value={assetInterestRate}
                onChange={(e) => setAssetInterestRate(e.target.value)}
              />
            </div>
            <div className={styles.modal_input}>
              <label htmlFor="dueDate">Due Date:</label>
              <input
                name="dueDate"
                type="number"
                value={assetDueDate}
                onChange={(e) => setAssetDueDate(e.target.value)}
              />
            </div>
            <div className={styles.modal_buttons}>
              <button type="submit">Add</button>
              <button onClick={(e) => setAssetAddModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddAssetForm;
