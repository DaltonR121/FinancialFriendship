import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session";
import github from '../../assets/GitHub-Mark-32px.png'
import styles from './NavBar.module.css'

const NavBar = () => {
  const dispatch = useDispatch();
  
  const sessionUser = useSelector((state) => state.session.user);
  let setLinks;

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  if (sessionUser) {
    setLinks = (
      <nav>
        <ul>
          <li>
            <NavLink to="/profile" exact={true} activeClassName={styles.active}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={onLogout} exact={true} activeClassName="active">
                Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  } else {
    setLinks = (
      <nav>
      <ul>
        <li>
          <NavLink to="/login" exact={true} activeClassName={styles.active}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName={styles.active}>
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
    )
  }

  return (
    <>
      <nav>
        <div className={styles.nav__wrapper}>
          <div className={styles.nav__left}>
            <div className={styles.nav__github} onClick={() => (window.location.href='https://github.com/DaltonR121/FinancialFriendship')}>
              <img src={github} />
            </div>
          </div>
          <div className={styles.nav__center}>
          <h1>Financial Friendship</h1>
          </div>
          <div className={styles.nav__right}>
            {setLinks}
          </div>
        </div>
      </nav>
      {sessionUser ? (
        <div className={styles.tab_nav__tab_wrapper}>
          <li>
            <NavLink to="/portfolio" exact={true} activeClassName={styles.active}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/accounts" exact={true} activeClassName={styles.active}>
              Accounts
            </NavLink>
          </li>
          <li>
            <NavLink to="/assets" exact={true} activeClassName={styles.active}>
              Assets
            </NavLink>
          </li>
          <li>
            <NavLink to="/credit_cards" exact={true} activeClassName={styles.active}>
              Credit Cards
            </NavLink>
          </li>
          <li>
            <NavLink to="/reoccurring" exact={true} activeClassName={styles.active}>
              Monthly Reoccurring
            </NavLink>
          </li>
          <li>
            <NavLink to="/other" exact={true} activeClassName={styles.active}>
              Other Obligations
            </NavLink>
          </li>
          <li>
            <NavLink to="/goals" exact={true} activeClassName={styles.active}>
              Goals
            </NavLink>
          </li>
        </div>
      ) : null}
    </>
  );
}

export default NavBar;
