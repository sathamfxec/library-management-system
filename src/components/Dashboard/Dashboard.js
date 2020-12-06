import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './Dashboard.module.css';
import {connect} from 'react-redux';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		console.log(this.props.isAuth);
		return (<React.Fragment>
	      <div className="col-sm-12" data-testid="Dashboard">
	        <div className="col-sm-6">Hello Dashboard</div>
	        <div className="col-sm-6">Hello Dashboard</div>
	      </div>
		</React.Fragment>);
	}
}

// Dashboard.propTypes = {};

// Dashboard.defaultProps = {};

const MapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};
// export default Dashboard;
export default connect(MapStateToProps)(Dashboard);
