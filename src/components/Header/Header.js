import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import updateMovies from './../../store/actions/actionLogin';

const Header = (props) => {
	const storageVal = JSON.parse(localStorage.getItem('userInfo'));
	const isAuth = JSON.parse(localStorage.getItem('isAuth'));
	console.log(props.isAuth);
	const history = useHistory();
	const logout = () => {
		localStorage.removeItem('userInfo');
		localStorage.removeItem('isAuth');
		props.updateMovies();
		history.push({
			pathname: '/login'
		});
	};
	return (<React.Fragment>
		<header className="flex-ai">
			<nav className="col-sm-12">
				<ul className="flex-sb">
				  <li>
				  	<label>Library Management System</label>
				 </li>
				 {props.isAuth.login === true || isAuth === true ?
				 <li>
				  	<label onClick={() => logout()}>Logout</label>
				 </li> : ''}
				</ul>
			</nav>
		</header>
	</React.Fragment>);
};

Header.propTypes = {};

Header.defaultProps = {};

const MapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};
const MapDispatchToProps = (dispatch) => {
  return {
    updateMovies: () => dispatch(updateMovies(false))
  }
};
// export default Header;
export default connect(MapStateToProps, MapDispatchToProps)(Header);
