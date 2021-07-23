import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { getUserAccount, deleteUserAccount } from '../../store/accounts'
import EditAccountModal from './EditAccountModal'
import AddAccountModal from './AddAccountModal';
import styles from './Accounts.module.css'

const Accounts = () => {
  const dispatch = useDispatch();
  
  const [accountAddModal, setAccountAddModal] = useState(false);
  const [accountEditModal, setAccountEditModal] = useState(false);
  const [account, setAccount] = useState();

  const userId = useSelector((state) => state.session.user.id);
  const accounts = useSelector((state) => Object.values(state.accounts));

  const accountsTotal = () => {
    let total = 0;
    accounts.map(account => {
      total += account.balance 
    })
    return <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />;
  }

  useEffect(() => {
    dispatch(getUserAccount(userId));
  }, [])

  return (
    <div className={styles.accounts__wrapper}>
      <h1>Accounts</h1>
      <h2>Accounts Total: {accountsTotal()}</h2>
      <div onClick={(e) => setAccountAddModal(true)} className={styles.add_account}>
        <h2>+</h2>
      </div>
      <div className={styles.accounts_table_wrapper}>
        <table>
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr onClick={(e) => setAccount(account)} onDoubleClick={(e) => setAccountEditModal(account)} key={account.id}>
                <td>{account.account_name}</td>
                <td>{account.account_type}</td>
                <td><NumberFormat value={account.balance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {accountAddModal && <AddAccountModal accountAddModal={accountAddModal} setAccountAddModal={setAccountAddModal} />}
      {accountEditModal && <EditAccountModal accountEditModal={accountEditModal} setAccountEditModal={setAccountEditModal} account={account} />}
    </div>
  );
}

export default Accounts;
