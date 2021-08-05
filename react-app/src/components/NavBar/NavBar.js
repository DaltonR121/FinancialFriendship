import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session";
import github from '../../assets/GitHub-Mark-32px.png'
import styles from './NavBar.module.css'
import { useEditProfile } from '../context/EditProfileContext';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../../SignupModal/SignupModal';

const NavBar = () => {
  const dispatch = useDispatch();

  const { modalOpen, setModalOpen } = useEditProfile()
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  const sessionUser = useSelector((state) => state.session.user);
  let setLinks;

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  useEffect(() => {
    if (password !== repeatPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true)
    }
  }, [password, repeatPassword]);

  if (sessionUser) {
    setLinks = (
      <nav>
        <ul>
          <li>
            <a onClick={() => setModalOpen(true)}>
              Profile
            </a>
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
          <a onClick={() => setLoginModal(true)}>
            Login
          </a>
        </li>
        <li>
        <a onClick={() => setSignupModal(true)}>
            Signup
          </a>
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
            <Link to='/'>
              <h1>Financial Friendship</h1>
            </Link>
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
        </div>
      ) : null}
      {modalOpen && <EditProfileModal />}
      {loginModal && <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />}
      {signupModal && <SignupModal signupModal={signupModal} setSignupModal={setSignupModal} passwordsMatch={passwordsMatch} setPasswordsMatch={setPasswordsMatch} password={password} setPassword={setPassword} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword}  /> }
    </>
  );
}

export default NavBar;
