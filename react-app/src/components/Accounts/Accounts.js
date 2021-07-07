import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount, deleteUserAccount } from '../../store/accounts'
import AddAccountForm from './AddAccountForm';
import EditAccountForm from './EditAccountForm'
import styles from './Accounts.module.css'

const Accounts = () => {
  const dispatch = useDispatch();
  
  const [accountAddForm, setAccountAddForm] = useState(false);
  const [accountEditForm, setAccountEditForm] = useState(false);
  const [account, setAccount] = useState();

  const userId = useSelector((state) => state.session.user.id);
  const accounts = useSelector((state) => Object.values(state.accounts));

  const accountsTotal = () => {
    let total = 0;
    accounts.map(account => {
      total += account.balance 
    })
    return total;
  }

  useEffect(() => {
    dispatch(getUserAccount(userId));
  }, [])

  return (
    <div className={styles.accounts__wrapper}>
      <h1>Accounts</h1>
      <h2>Accounts Total: ${accountsTotal()}</h2>
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
              <tr onClick={(e) => setAccount(account)} onDoubleClick={(e) => setAccountEditForm(account)} key={account.id}>
                <td>{account.account_name}</td>
                <td>{account.account_type}</td>
                <td>${account.balance}<button onClick={(e) => dispatch(deleteUserAccount(account.id))}>X</button></td>
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
      {accountEditForm ? (
        <div className={styles.add_account_form_wrapper}>
          <EditAccountForm accountEditForm={accountEditForm} 
            setAccountEditForm={setAccountEditForm}
            account={account}
             />
        </div>
      ) : null}
    </div>
  );
}

export default Accounts;
