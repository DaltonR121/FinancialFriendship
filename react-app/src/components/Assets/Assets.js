import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsset, deleteUserAsset } from '../../store/assets'
import AddAssetForm from './AddAssetForm';
import EditAssetForm from './EditAssetForm'
import styles from './Assets.module.css'

const Assets = () => {
  const [assetAddForm, setAssetAddForm] = useState(false);
  const [assetEditForm, setAssetEditForm] = useState(false);
  const [asset, setAsset] = useState();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const assets = useSelector((state) => Object.values(state.assets));

  const assetsTotal = () => {
    let total = 0;
    assets.map(asset => {
      total += asset.current_value
    })

    return total;
  }

  const assetsOwed = () => {
    let total = 0;
    assets.map(asset => {
      total += asset.amount_owed
    })

    return total;
  }

  const deleteAsset = (assetId) => {
    dispatch(deleteUserAsset(assetId))
  }

  // const editFormEvent = (asset) => {
  //     setAssetId(asset.id)
  //     setAssetName(asset.asset_name)
  //     setAssetType(asset.asset_type)
  //     setBalance(asset.balance)
  // }
  
  useEffect(() => {
    dispatch(getUserAsset(userId));
  }, [])

  return (
    <div className={styles.assets__wrapper}>
      <h1>Your Assets</h1>
      <h2>Assets Current Value: {assetsTotal()}</h2>
      <h2>Amount Owed: {assetsOwed()}</h2>
      <div onClick={(e) => setAssetAddForm(true)} className={styles.add_asset}>
        <h2>+</h2>
      </div>
      <div className={styles.assets_table_wrapper}>
        <table>
          <thead>
            <tr>
              <th>Asset Description</th>
              <th>Current Value</th>
              <th>Amount Owed</th>
              <th>Interest Rate</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr onClick={(e) => setAsset(asset)} onDoubleClick={(e) => setAssetEditForm(asset)} key={asset.id}>
                <td>{asset.asset_description}</td>
                <td>{asset.current_value}</td>
                <td>{asset.amount_owed}</td>
                <td>{asset.interest_rate}%</td>
                <td>{asset.due_date}<button onClick={(e) => deleteAsset(asset.id)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {assetAddForm ? (
        <div className={styles.add_asset_form_wrapper}>
          <AddAssetForm assetAddForm={assetAddForm} setAssetAddForm={setAssetAddForm} />
        </div>
      ) : null}
      {assetEditForm ? (
        <div className={styles.add_asset_form_wrapper}>
          <EditAssetForm assetEditForm={assetEditForm} 
            setAssetEditForm={setAssetEditForm}
            asset={asset}
             />
        </div>
      ) : null}
    </div>
  );
}

export default Assets;
