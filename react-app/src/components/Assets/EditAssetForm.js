import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserAsset } from '../../store/assets';

const EditAssetForm = ({ assetEditForm, setAssetEditForm, asset }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [assetDescription, setAssetDescription] = useState(asset.asset_description);
  const [assetCurrentValue, setAssetCurrentValue] = useState(asset.current_value);
  const [assetAmountOwed, setAssetAmountOwed] = useState(asset.amount_owed);
  const [assetInterestRate, setAssetInterestRate] = useState(asset.interest_rate);
  const [assetDueDate, setAssetDueDate] = useState(asset.due_date);

  const userId = useSelector((state) => state.session.user.id);

  const submitEvent = (e) => {
    e.preventDefault()
    let assetUpdate = {
      user_id: userId,
      asset_description: assetDescription,
      asset_current_value: assetCurrentValue,
      asset_amount_owed: assetAmountOwed,
      asset_interest_rate: assetInterestRate,
      asset_due_date: assetDueDate
    }
    dispatch(editUserAsset(assetUpdate))
    setAssetEditForm(false)
  }

  return (
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
          onChange={(e) => setAssetAmountOwed(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="assetAmountOwed">Amount Owed:</label>
        <input
          name="assetAmountOwed"
          type="number"
          value={assetAmountOwed}
          onChange={(e) => setAssetCurrentValue(e.target.value)}
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
        <button onClick={(e) => setAssetEditForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditAssetForm;
