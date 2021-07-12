import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { editUserAsset, deleteUserAsset } from "../../store/assets";
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

const EditAssetModal = ({ assetEditModal, setAssetEditModal, asset }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState(asset.id);
  const [assetDescription, setAssetDescription] = useState(
    asset.asset_description
  );
  const [assetCurrentValue, setAssetCurrentValue] = useState(
    asset.current_value
  );
  const [assetAmountOwed, setAssetAmountOwed] = useState(asset.amount_owed);
  const [assetInterestRate, setAssetInterestRate] = useState(
    asset.interest_rate
  );
  const [assetDueDate, setAssetDueDate] = useState(asset.due_date);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault();
    let assetUpdate = {
      id: id,
      userId: userId,
      description: assetDescription,
      current_value: assetCurrentValue,
      amount_owed: assetAmountOwed,
      interest_rate: assetInterestRate,
      due_date: assetDueDate,
    };
    dispatch(editUserAsset(assetUpdate));
    setAssetEditModal(false);
  };

  function closeModal() {
    setAssetEditModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={assetEditModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.modal_wrapper}>
          <h1>Add Account</h1>
          <form onSubmit={submitEvent}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor="assetDescription">Asset Description:</label>
              <input
                name="assetDescription"
                type="text"
                value={assetDescription}
                onChange={(e) => setAssetDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="assetCurrentValue">Current Value:</label>
              <input
                name="assetCurrentValue"
                type="number"
                value={assetCurrentValue}
                onChange={(e) => setAssetCurrentValue(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="assetAmountOwed">Amount Owed:</label>
              <input
                name="assetAmountOwed"
                type="number"
                value={assetAmountOwed}
                onChange={(e) => setAssetAmountOwed(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="assetInterestRate">Interest Rate:</label>
              <input
                name="assetInterestRate"
                type="number"
                value={assetInterestRate}
                onChange={(e) => setAssetInterestRate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dueDate">Due Date:</label>
              <input
                name="dueDate"
                type="number"
                value={assetDueDate}
                onChange={(e) => setAssetDueDate(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Save</button>
              <button onClick={(e) => setAssetEditModal(false)}>Cancel</button>
              <button onClick={(e) => dispatch(deleteUserAsset(asset.id))}>
                X
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditAssetModal;
