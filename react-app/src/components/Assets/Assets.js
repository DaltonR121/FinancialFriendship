import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { getUserAsset, deleteUserAsset } from '../../store/assets'
import AddAssetModal from './AddAssetModal';
import EditAssetModal from './EditAssetModal'
import styles from './Assets.module.css'

const Assets = () => {
  const dispatch = useDispatch();

  const [assetAddModal, setAssetAddModal] = useState(false);
  const [assetEditModal, setAssetEditModal] = useState(false);
  const [asset, setAsset] = useState();

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
  
  useEffect(() => {
    dispatch(getUserAsset(userId));
  }, [])

  return (
    <div className={styles.assets__wrapper}>
      <h1>Assets</h1>
      <h2>Assets Value: {<NumberFormat value={assetsTotal()} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</h2>
      <h2>Amount Owed: {<NumberFormat value={assetsOwed()} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</h2>
      <div onClick={(e) => setAssetAddModal(true)} className={styles.add_asset}>
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
              <tr onClick={(e) => setAsset(asset)} onDoubleClick={(e) => setAssetEditModal(asset)} key={asset.id}>
                <td>{asset.asset_description}</td>
                <td><NumberFormat value={asset.current_value} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                <td><NumberFormat value={asset.amount_owed} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                <td>{asset.interest_rate}%</td>
                <td>{asset.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {assetAddModal && <AddAssetModal assetAddModal={assetAddModal} setAssetAddModal={setAssetAddModal} />}
      {assetEditModal && <EditAssetModal assetEditModal={assetEditModal} setAssetEditModal={setAssetEditModal} asset={asset} />}
    </div>
  );
}

export default Assets;
