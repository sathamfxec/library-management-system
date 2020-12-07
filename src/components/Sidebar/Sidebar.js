import React from 'react';
import styles from './Sidebar.module.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidebar = (props) => {
	const location = useLocation();
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	return (<React.Fragment>
	  <aside data-testid="Sidebar">
	  	{userInfo.userType === 'admin' ?
	  		<ul className={styles.lists}>
		  		<li className={(location.pathname === '/dashboard' ? styles.active : styles.li)}>
		  			<Link to="/dashboard" className={(location.pathname === '/dashboard' ? styles.colorWhite : '')}>Dashboard</Link>
		  		</li>
		  		<li className={(location.pathname === '/book' ? styles.active : styles.li)}>
		  			<Link to="/book" className={(location.pathname === '/book' ? styles.colorWhite : '')}>Books</Link>
		  		</li>
		  		<li className={(location.pathname === '/users' ? styles.active : styles.li)}>
		  			<Link to="/users" className={(location.pathname === '/users' ? styles.colorWhite : '')}>Users</Link>
		  		</li>
		  		<li className={(location.pathname === '/authors' ? styles.active : styles.li)}>
		  			<Link to="/authors" className={(location.pathname === '/authors' ? styles.colorWhite : '')}>Authors</Link>
		  		</li>
		  		<li className={(location.pathname === '/publishers' ? styles.active : styles.li)}>
		  			<Link to="/publishers" className={(location.pathname === '/publishers' ? styles.colorWhite : '')}>Publishers</Link>
		  		</li>
		  		<li className={(location.pathname === '/request-for-approval' ? styles.active : styles.li)}>
		  			<Link to="/request-for-approval" className={(location.pathname === '/request-for-approval' ? styles.colorWhite : '')}>Request for approval</Link>
		  		</li>
	  		</ul> : 
	  		 <ul className={styles.lists}>
	  		 	<li className={(location.pathname === '/book-request' ? styles.active : styles.li)}>
		  			<Link to="/book-request" className={(location.pathname === '/book-request' ? styles.colorWhite : '')}>Book Request</Link>
		  		</li>
		  	</ul>}
	  </aside>
	</React.Fragment>);
};

export default Sidebar;
