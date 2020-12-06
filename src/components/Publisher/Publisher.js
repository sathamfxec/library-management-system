import React from 'react';
import PropTypes from 'prop-types';
import styles from './Publisher.module.css';

const Publisher = () => (
  <div className={styles.Publisher} data-testid="Publisher">
    Publisher Component
  </div>
);

Publisher.propTypes = {};

Publisher.defaultProps = {};

export default Publisher;
