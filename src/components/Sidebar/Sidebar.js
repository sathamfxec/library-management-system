import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

const Sidebar = (props) => (<React.Fragment>
  <aside>
  	<ul className={styles.lists}>
  		<li className={styles.li}>Dashboard</li>
  		<li className={styles.li, styles.active}>Books</li>
  		<li className={styles.li}>Users</li>
  		<li className={styles.li}>Author</li>
  		<li className={styles.li}>Publishers</li>
  	</ul>
  </aside>
</React.Fragment>);

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;
