import React from 'react';
import styles from './Dashboard.module.css';
import {connect} from 'react-redux';
import Sidebar from './../Sidebar/Sidebar';
import services from './../../services/services';
import appConfig from './../../appConfig';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dashboardData: {}
		};
	}
	componentDidMount() {
		services.getDashboardData()
		.then(response => {
			this.setState({
				dashboardData: response.data.dashboardData
			});
		})
		.catch(error => {
			console.log(error);
		})
	}
	render() {
		const userInfo = services.getUserInfo();
		return(<React.Fragment>
			<Sidebar />
			<div className="container" data-testid="Dashboard">
				<div className="row">
					<div className="col-sm-12">
						<label className="col-sm-12 welcome">Welcome {userInfo.name}</label>
					</div>
					<div className="col-sm-12 flex-ai">
						<div className={`${'col-sm-3'} ${styles.shadow} ${'flex-ai'}`}>
							<div className="col-sm-6">
								<img className={styles.logo} src="assets/Books-logo.png" alt="Books" />
							</div>
							<div className="col-sm-6 defaultFS txtCenter">
								<div>{this.state.dashboardData.books}</div>
								<div>Books</div>
							</div>
						</div>
						<div className={`${'col-sm-3'} ${styles.shadow} ${'flex-ai'}`}>
							<div className="col-sm-6">
								<img className={styles.logo} src="assets/user.png" alt="Books" />
							</div>
							<div className="col-sm-6 defaultFS txtCenter">
								<div>{this.state.dashboardData.users}</div>
								<div>Users</div>
							</div>
						</div>
						<div className={`${'col-sm-3'} ${styles.shadow} ${'flex-ai'}`}>
							<div className="col-sm-6">
								<img className={styles.logo} src="assets/user.png" alt="Books" />
							</div>
							<div className="col-sm-6 defaultFS txtCenter">
								<div>{this.state.dashboardData.authors}</div>
								<div>Authors</div>
							</div>
						</div>
						<div className={`${'col-sm-3'} ${styles.shadow} ${'flex-ai'}`}>
							<div className="col-sm-6">
								<img className={styles.logo} src="assets/user.png" alt="Books" />
							</div>
							<div className="col-sm-6 defaultFS txtCenter">
								<div>{this.state.dashboardData.publishers}</div>
								<div>Publishers</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>);
	}
}

const MapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  };
};
export default connect(MapStateToProps)(Dashboard);
