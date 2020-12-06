import React from 'react';
import PropTypes from 'prop-types';
import styles from './User.module.css';

const User = () => (
  <div className={styles.User} data-testid="User">
    User Component
  </div>
);

User.propTypes = {};

User.defaultProps = {};

export default User;
