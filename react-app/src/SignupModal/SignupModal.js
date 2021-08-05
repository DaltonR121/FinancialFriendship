import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { signUp } from '../store/session';
import styles from './SignupModal.module.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: '1'
  }
};

function SignupModal({ signupModal, setSignupModal, passwordsMatch, setPasswordsMatch, password, setPassword, setRepeatPassword, repeatPassword }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password));
    console.log(data);
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setSignupModal(false)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/portfolio" />;
  }
 
  function closeModal() {
    setSignupModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={signupModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        >
        <div className={styles.modal_wrapper}>
          <h1>Signup</h1>
            <div className={styles.errors__container}>
              {errors.map((error) => (
                <div className={styles.errors}>{error}</div>
              ))}
            </div>
          <form onSubmit={onSignUp}>
            <div className={styles.input_field}>
              <label>User Name</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className={styles.input_field}>
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className={styles.input_field}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className={styles.input_field}>
              {passwordsMatch ? null : (<div className={styles.passwordMatch}>Passwords much match!</div>)}
              <label>Repeat Password</label>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button disabled={!passwordsMatch || password.length < 1} type="submit">Sign Up</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default SignupModal;
