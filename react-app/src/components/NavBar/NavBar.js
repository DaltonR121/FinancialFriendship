import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import styles from './NavBar.module.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  let setLinks;

  if (sessionUser) {
    setLinks = (
      <nav>
      <ul>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
    )
  } else {
    setLinks = (
      <nav>
      <ul>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
    )
  }

  return (
    <nav>
      <div className={styles.nav__wrapper}>
        <div className={styles.nav__left}>
          <h1>Financial Friendship</h1>
        </div>
        <div className={styles.nav__center}>
          
        </div>
        <div className={styles.nav__right}>
          {setLinks}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
