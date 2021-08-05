import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../../store/session' 
import styles from './LoginModal.module.css'
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

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

function LoginModal({loginModal, setLoginModal}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setLoginModal(false)
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('SomeReallyStrongPassword00!!')
    login(email, password);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/portfolio" />;
  }

  function closeModal() {
    setLoginModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={loginModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        >
        <div className={styles.modal_wrapper}>
          <h1>Login</h1>
            <div className={styles.errors__container}>
              {errors.map((error) => (
                <div className={styles.errors}>{error}</div>
              ))}
            </div>
          <form onSubmit={onLogin}>
            <div className={styles.input_field}>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className={styles.input_field}>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
              <button type="submit">Login</button>
              <button onClick={demoLogin}>Demo</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
