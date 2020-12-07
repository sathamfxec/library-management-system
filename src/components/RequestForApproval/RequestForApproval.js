import React from 'react';
import axios from 'axios';
import styles from './RequestForApproval.module.css';
import services from './../../services/services';
import Sidebar from './../Sidebar/Sidebar';
import appConfig from './../../appConfig';

class RequestForApproval extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lendedBookList: [],
			message: {
				class: '',
				text: ''
			}
		};
	}
	/*
    	Method to clear all state values
  	*/
  	clearState = () => {
		this.setState({
			message: {
				class: '',
				text: ''
			}
		});
  	}
  	/*
		Method to approve the lend request
	*/
	approve = (req) => {
		console.log(req);
		let URL = axios.put(appConfig.httpUrl + appConfig.adminApprovalApi.approve, req)
		this.apiResponse(URL);
	}
	/*
		Method to reject the lend request
	*/
	reject = (req) => {
		console.log(req);
		let URL = axios.put(appConfig.httpUrl + appConfig.adminApprovalApi.reject, req)
		this.apiResponse(URL);
	}
	/*
		Method to handle success and error callback
	*/
	apiResponse = (URL) => {
		URL.then(response => {
			if(response.data.id !== 0) {
				this.setState({
					lendedBookList: response.data.lendedBookList,
					message: {
						class: 'success',
						text: response.data.message
					}
				});
				setTimeout(() => {
					this.clearState(); //Calling to clear state
				}, 500);
			} else {
				this.setState({
					message: {
						class: 'error',
						text: response.data.message
					}
				});
				setTimeout(() => {
					this.clearState(); //Calling to clear state
				}, 500);
			}
		})
		.catch(error => {
			this.setState({
				message: {
					class: 'error',
					text: error
				}
			});
			setTimeout(() => {
				this.clearState(); //Calling to clear state
			}, 500);
		});
	}
	componentDidMount() {
  		services.getLendedBooks()
		.then(response => {
			this.setState({
				lendedBookList: response.data.lended
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
	render() {
  		const userInfo = services.getUserInfo();
  		return (<React.Fragment>
  			<Sidebar />
			<div className="container" data-testid="RequestForApproval">
				<div className="row">
					<div className="col-sm-12">
						<label className="col-sm-12 welcome">Welcome to LMS portal {userInfo.name}</label>
					</div>
					<div className="col-sm-12 flex-sb">
						<h3 className="col-sm-6">
							Request for approval
						</h3>
						{this.state.message.class !== '' ?
							<div className="form-group col-sm-6 txtRight marginBZero">
	            				<label className={this.state.message.class}>{this.state.message.text}</label>
	          				</div>
          				: ''}
					</div>
					<div className="col-sm-12 flex-sb">
						<div className="col-sm-7">
							<table className={`${styles.table} ${"table"}`}>
								<thead>
							      <tr>
							        <th>Name</th>
							        <th>Catgory</th>
							        <th>Author</th>
							        <th>Publisher</th>
							        <th>Action</th>
							      </tr>
							    </thead>
							    <tbody>
							    	{this.state.lendedBookList.length === 0 ?
							      	<tr><td colSpan="5" className={'txtCenter'}>No records found</td></tr> : 
							      	this.state.lendedBookList.map(lend => {
							      	return (<tr key={Math.random()}>
								        <td>{lend.bookName}</td>
								        <td>{lend.bookCategory}</td>
								        <td>{lend.author}</td>
								        <td>{lend.publisher}</td>
								        {lend.isApproved === false ?
								        <td>
								        	<button className={`${styles.marginR} ${'btn btn-danger'}`} onClick={() => this.approve(lend)}>Approve</button>
								        </td> : <td>
								        	<button className={`${styles.marginR} ${'btn btn-danger'}`} onClick={() => this.reject(lend)}>Reject</button>
								        </td>}
								      </tr>);
							      	})}
							    </tbody>					
							</table>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>);
	}
 }

export default RequestForApproval;
