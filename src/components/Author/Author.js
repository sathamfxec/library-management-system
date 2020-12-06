import React from 'react';
import PropTypes from 'prop-types';
import styles from './Author.module.css';

const Author = () => (
  <div className={styles.Author} data-testid="Author">
    Author Component
  </div>
);

Author.propTypes = {};

Author.defaultProps = {};

export default Author;
