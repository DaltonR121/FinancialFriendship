import React, { useEffect, useState } from 'react';
import { useDispatch, UserSelector, useSelector } from 'react-redux';
import { getUserAccount, editUserAccount, createUserAccount } from '../../store/accounts'
import AddAccountForm from './AddAccountForm';
import EditAccountForm from './EditAccountForm'
import styles from './Accounts.module.css'

const Accounts = () => {
  const [editFormVis, setEditFormVis] = useState(false);
  const [accountAddForm, setAccountAddForm] = useState(false);
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
      <div onClick={(e) => setAccountAddForm(true)} className={styles.add_account}>
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
              <tr onDoubleClick={(e) => setEditFormVis(true)} key={account.id}>
                <td>
                  {account.account_name}
                </td>
                <td>{account.account_type}</td>
                <td>{account.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.table_footer}>
        <p>* Please DOUBLE-CLICK on any row you would like to make changes to!</p>
      </div>
      {accountAddForm ? (
        <div className={styles.add_account_form_wrapper}>
          <AddAccountForm accountAddForm={accountAddForm} setAccountAddForm={setAccountAddForm} />
        </div>
      ) : null}
    </div>
  );
}

export default Accounts;
