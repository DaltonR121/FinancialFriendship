import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'

const Footer = () => {

  return (
    <div className={styles.footer_container}>
      <a href='https://www.RyanDalton.dev'>
        <h6>Created by Ryan Dalton - RyanDalton.dev</h6>
      </a>
    </div>
  );
}

export default Footer;
