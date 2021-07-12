import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useEditProfile } from '../context/EditProfileContext';
import styles from './EditProfileModal.module.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: '1'
  },
};

function EditProfileModal() {
  const { modalOpen, setModalOpen } = useEditProfile()

  const user = useSelector((state) => state.session.user);
  
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [income, setIncome] = useState(user.income);
  
  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const submitEvent = (e) => {
    e.preventDefault()
    let userUpdate = {
      id: user.id,
      username,
      email,
      income
    }
    console.log(userUpdate)
    // dispatch(editUserCreditCard(creditCardUpdate))
    // setCreditCardEditForm(false)
  }

  return (
    <div className={styles.modal_wrapper}>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div>
          <form onSubmit={submitEvent}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="income">Income:</label>
              <input
                name="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Edit</button>
            </div>
          </form>
          <button onClick={closeModal}>close</button>
        </div>
      </Modal>
    </div>
  );
}

export default EditProfileModal;
