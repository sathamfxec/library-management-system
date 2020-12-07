import React from 'react';
import axios from 'axios'; 
import styles from './Book.module.css';
import Sidebar from './../Sidebar/Sidebar';
import services from './../../services/services';
import appConfig from './../../appConfig';

class Book extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookList: [],
			id: '',
			bookName: '',
			bookCategory: '',
			author: '',
			authorId: '',
			publisher: '',
			publisherId: '',
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
		if(this.state.bookName === '' || this.state.bookCategory === '' || this.state.author === '' || this.state.publisher === '') {
			this.setState({
				message: {
					class: 'error',
					text: 'Please fill all mandatory fields.'
				}
			});
		} else {
			let body = Object.assign({}, this.state);
			delete body.bookList;
			let URL = (this.state.update === false) 
			? axios.post(appConfig.httpUrl+appConfig.booksApi.post, body)
			: axios.put(appConfig.httpUrl+appConfig.booksApi.put+ '/' + body.id, body);
			this.apiResponse(URL);
		}
	}
	/*
		Method to populate selected value
	*/
	editBook = (book) => {
		book.update = true;
		book.message = {
			class: '',
			text: ''
		};
		let editVal = Object.assign({}, this.state, book);
		this.setState(editVal);
	}
	/*
		Method to update the book value
	*/
	updateBook = (book) => {
		book.update = true;
		let editVal = Object.assign({}, this.state, book);
		this.setState(editVal);
	}
	/*
		Method to delete the book value
	*/
	deleteBook = (id) => {
		let URL = axios.delete(appConfig.httpUrl + appConfig.booksApi.delete + '/' + id, this.state);
		this.apiResponse(URL);
	}
	/*
		Method to handle success and error callback
	*/
	apiResponse = (URL) => {
		URL.then(response => {
			if(response.data.id !== 0) {
				this.setState({
					bookList: response.data.bookList,
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
    	Method to clear all state values
  	*/
  	clearState = () => {
  		this.setState({
  			id: '',
  			bookName: '',
			bookCategory: '',
			author: '',
			authorId: '',
			publisher: '',
			publisherId: '',
			update: false,
			message: {
				class: '',
				text: ''
			}
  		});
  	} 
	/*
    	Method to handle the book form values
  	*/
	handleChange = (event) => {
		if(event.target.name === 'authorId' || event.target.name === 'publisherId') {
			let evtNm = event.target.name.split('Id');
			this.setState({
				[evtNm[0]]: event.target.options[event.target.selectedIndex].text
			});
		}
		this.setState({
		  [event.target.name]: event.target.value
		});
	}
	componentDidMount() {
		services.getBooks()
		.then(result => {
			const bookList = result.data.data;
			this.setState({
				bookList: result.data.data
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
	render() {
		const authors = JSON.parse(localStorage.getItem('authors'));
		const publishers = JSON.parse(localStorage.getItem('publishers'));
		const userInfo = services.getUserInfo();
		return (<React.Fragment>
			<Sidebar />
			<div className="container" data-testid="Book"> 
				<div className="row">
					<div className="col-sm-12">
						<label className="col-sm-12 welcome">Welcome {userInfo.name}</label>
					</div>
					<div className="col-sm-12 flex-sb">
						<h3 className="col-sm-6">Books</h3>
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
						        <th>Catgory</th>
						        <th>Author</th>
						        <th>Publisher</th>
						        <th>Action</th>
						      </tr>
						    </thead>
						    <tbody>
						      {this.state.bookList.map(book => {
						      	return (<tr key={Math.random()}>
							        <td>{book.bookName}</td>
							        <td>{book.bookCategory}</td>
							        <td>{book.author}</td>
							        <td>{book.publisher}</td>
							        <td>
							        	<button className={`${styles.marginR} ${'btn btn-info'}`} onClick={() => this.editBook(book)}>Edit</button>
							        	<button className="btn btn-danger" onClick={() => this.deleteBook(book.id)}>Delete</button>
							        </td>
							      </tr>);
						      })}
						    </tbody>
						</table>
					</div>
					<div className={`${'col-sm-4'} ${styles.crtBook}`}>
						{this.state.update === false ? <h3>Create Book</h3> : <h3>Update Book</h3>}
						<form onSubmit={this.submitForm}>
							<div className="form-group">
								<label htmlFor="booknm">Book Name <span className="mandatory">*</span></label>
								<input id="booknm" name="bookName" className="form-control defaultFS" type="text" value={this.state.bookName} onChange={this.handleChange}/>
							</div>
							<div className="form-group">
								<label htmlFor="bookcat">Book Category <span className="mandatory">*</span></label>
								<select id="bookcat" name="bookCategory" className="form-control defaultFS" onChange={this.handleChange} value={this.state.bookCategory}>
									<option value=''>Select</option>
									{appConfig.bookTypes.map(book => {
										return (<option value={book.value} key={Math.random()}>
											{book.name}
										</option>);
									})}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="authorId">Author <span className="mandatory">*</span></label>
								<select id="authorId" name="authorId" className="form-control defaultFS" onChange={this.handleChange} value={this.state.authorId}>
									<option value=''>Select</option>
									{authors.map(author => {
										return (<option value={author.id} key={Math.random()}>
											{author.name}
										</option>);
									})}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="publisherId">Publisher <span className="mandatory">*</span></label>
								<select id="publisherId" name="publisherId" className="form-control defaultFS" onChange={this.handleChange} value={this.state.publisherId}>
									<option value=''>Select</option>
									{publishers.map(publisher => {
										return (<option value={publisher.id} key={Math.random()}>
											{publisher.name}
										</option>);
									})}
								</select>
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

export default Book;
