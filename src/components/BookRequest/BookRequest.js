import React from 'react';
import axios from 'axios';
import styles from './BookRequest.module.css';
import services from './../../services/services';
import Sidebar from './../Sidebar/Sidebar';
import appConfig from './../../appConfig';

class BookRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lendedBookList: [],
			bookList: [],
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
		this.state = {
			message: {
				class: '',
				text: ''
			}
		};
  	}
  	/*
		Method to lend the book
	*/
	lendBook = (book) => {
		let body = Object.assign({}, book, {
			recId: new Date().getUTCMilliseconds(),
			lenderId: services.getUserInfo().id,
			isApproved: false
		});
		delete body.lend;
		let URL = axios.post(appConfig.httpUrl + appConfig.bookRequestApi.post, body)
		this.apiResponse(URL);
	}
	/*
		Method to delete the lend request
	*/
	withDrawRequest = (req) => {
		let URL = axios.delete(appConfig.httpUrl + appConfig.bookRequestApi.delete + '/' + req.recId)
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
  	componentDidMount() {
  		axios.all([services.getLendedBooks(), services.getNonLendedBooks()])
		.then(axios.spread((...response) => {
			this.setState({
				lendedBookList: response[0].data.lended,
				bookList: response[1].data.nonLended
			});
		}));
	}
  	render() {
  		return (<React.Fragment>
  			<Sidebar />
			<div className="container" data-testid="BookRequest">
				<div className="row">
					<div className="col-sm-12 flex-sb">
						<h3 className="col-sm-7">Your Request</h3>
						<h3 className="col-sm-5">
							List of books
						</h3>
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
								        	<button className={`${styles.marginR} ${'btn btn-danger'}`} onClick={() => this.withDrawRequest(lend)}>Withdraw Request</button>
								        </td> : <td>
								        	<label className="success">Admin Approved</label>
								        </td>}
								      </tr>);
							      	})}
							    </tbody>					
							</table>
						</div>
						<div className="col-sm-5">
							<table className={`${styles.table} ${"table"}`}>
							    <thead>
							      <tr>
							        <th>Book Name</th>
							        <th>Book Catgory</th>
							        <th>Author</th>
							        <th>Action</th>
							      </tr>
							    </thead>
							    <tbody>
							      {this.state.bookList.length === 0 ?
							      	<tr><td colSpan="4" className={'txtCenter'}>No records found</td></tr> : 
							      	this.state.bookList.map(book => {
							      	return (<tr key={Math.random()}>
								        <td>{book.bookName}</td>
								        <td>{book.bookCategory}</td>
								        <td>{book.author}</td>
								        <td>
								        	<button className={`${styles.marginR} ${'btn btn-info'}`} onClick={() => this.lendBook(book)}>Lend</button>
								        </td>
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

export default BookRequest;
