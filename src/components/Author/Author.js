import React from 'react';
import styles from './Author.module.css';
import axios from 'axios';
import Sidebar from './../Sidebar/Sidebar';
import services from './../../services/services';
import appConfig from './../../appConfig';

class Author extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authorList: [],
			id: '',
			name: '',
			email: '',
			type: 'author',
			update: false,
			message: {
				class: '',
				text: ''
			}
		};
	}
	/*
    	Method to submit login form
  	*/
	submitForm = (event) => {
		event.preventDefault();
		if(this.state.name === '' || this.state.email === '') {
			this.setState({
				message: {
					class: 'error',
					text: 'Please fill all mandatory fields.'
				}
			});
		} else {
			let body = Object.assign({}, this.state);
			delete body.authorList;
			let URL = (this.state.update === false) 
			? axios.post(appConfig.httpUrl+appConfig.authorsApi.post, body)
			: axios.put(appConfig.httpUrl+appConfig.authorsApi.put+ '/' + body.id, body);
			this.apiResponse(URL);
		}
	}
	/*
		Method to delete the author value
	*/
	deleteAuthor = (id) => {
		let URL = axios.delete(appConfig.httpUrl + appConfig.authorsApi.delete + '/' + id, this.state);
		this.apiResponse(URL);
	}
	/*
		Method to handle success and error callback
	*/
	apiResponse = (URL) => {
		URL.then(response => {
			if(response.data.id !== 0) {
				this.setState({
					authorList: response.data.authorList,
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
			}
		})
		.catch(error => {
			console.log(error);
			this.setState({
				message: {
					class: 'error',
					text: error
				}
			});
		});
	}
	/*
		Method to populate selected value
	*/
	editAuthor = (author) => {
		author.update = true;
		author.message = {
			class: '',
			text: ''
		};
		let editVal = Object.assign({}, this.state, author);
		this.setState(editVal);
	}
	/*
    	Method to handle the author form values
  	*/
	handleChange = (event) => {
		let val = (event.target.name === 'email') ? event.target.value.trim() : event.target.value;
		this.setState({
		  [event.target.name]: val
		});
	}
	/*
    	Method to clear all state values
  	*/
  	clearState = () => {
  		this.setState({
			id: '',
			name: '',
			email: '',
			type: 'author',
			update: false,
			message: {
				class: '',
				text: ''
			}
  		});
  	} 
	componentDidMount() {
		services.getAuthors()
		.then(result => {
			this.setState({
				authorList: result.data.data
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
	render() {
		const userInfo = services.getUserInfo();
		return(<React.Fragment>
			<Sidebar />
			<div className="container" data-testid="Author">
				<div className="row">
					<div className="col-sm-12">
						<label className="col-sm-12 welcome">Welcome {userInfo.name}</label>
					</div>
					<div className="col-sm-12 flex-sb">
						<h3 className="col-sm-6">Authors</h3>
						{this.state.message.class !== '' ?
							<div className="form-group col-sm-6 txtRight marginBZero">
	            				<label className={this.state.message.class}>{this.state.message.text}</label>
	          				</div>
	          			: ''}
					</div>
					<div className="col-sm-8">
						<table className={`${styles.table} ${"table"}`}>
						    <thead>
						      <tr>
						        <th>Name</th>
						        <th>Email</th>
						        <th>Action</th>
						      </tr>
						    </thead>
						    <tbody>
						      {this.state.authorList.map(author => {
						      	return (<tr key={Math.random()}>
							        <td>{author.name}</td>
							        <td>{author.email}</td>
							        <td>
							        	<button className={`${styles.marginR} ${'btn btn-info'}`} onClick={() => this.editAuthor(author)}>Edit</button>
							        	<button className="btn btn-danger" onClick={() => this.deleteAuthor(author.id)}>Delete</button>
							        </td>
							      </tr>);
						      })}
						    </tbody>
						</table>
					</div>
					<div className={`${'col-sm-4'} ${styles.crtAuthor}`}>
						{this.state.update === false ? <h3>Create Author</h3> : <h3>Update Author</h3>}
						<form onSubmit={this.submitForm}>
							<div className="form-group">
								<label htmlFor="name">Author Name <span className="mandatory">*</span></label>
								<input id="name" name="name" className="form-control defaultFS" type="text" value={this.state.name} onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="email">Author Email <span className="mandatory">*</span></label>
								<input id="email" name="email" className="form-control defaultFS" type="text" value={this.state.email} onChange={this.handleChange} disabled={this.state.update} />
							</div>
							<div className="form-group flex-sb">
								<button className="btn btn-info" type="button" onClick={this.clearState}>Clear</button>
                				<button className="btn btn-success" type="submit">{this.state.update === false ? 'Create' : 'Update'}</button>
              				</div>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>);
	}
}

export default Author;
