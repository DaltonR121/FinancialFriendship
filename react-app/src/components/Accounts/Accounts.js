import React, { useEffect, useState } from 'react';
import { useDispatch, UserSelector, useSelector } from 'react-redux';
import { getUserAccount, editUserAccount } from '../../store/accounts'
import EditAccountForm from './EditAccountForm'
import styles from './Accounts.module.css'

const Accounts = () => {
  const [editFormVis, setEditFormVis] = useState(false);
  const [accountId, setAccountId] = useState();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const accounts = useSelector((state) => Object.values(state.accounts));
  
  useEffect(() => {
    dispatch(getUserAccount(userId));
  }, [])

  return (
    <div className={styles.accounts__wrapper}>
      <h1>Your Accounts</h1>
      <div className={styles.add_account}>
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
              <tr onDoubleClick={(e) => setEditFormVis(true)}
              onDoubleClick={(e) => setAccountId(account.id)} key={account.id}>
                <td>{account.account_name}</td>
                <td>{account.account_type}</td>
                <td>{account.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!  </p>
      </div>
      {editFormVis ? (
        <div className={styles.edit_form}>
          <EditAccountForm accountId={accountId} />
        </div>
      ) : null}
    </div>
  );
}

export default Accounts;
