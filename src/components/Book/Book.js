import React from 'react';
import PropTypes from 'prop-types';
import styles from './Book.module.css';
import Sidebar from './../Sidebar/Sidebar';
import axios from 'axios';
import appConfig from './../../appConfig';

class Book extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookList: []
		};
	}
	componentDidMount() {
		axios.get(appConfig.httpUrl + appConfig.booksApi.get)
		.then(result => {
			console.log(result);
			this.setState({
				bookList: result.data.data
			});
		})
		.catch(error => {
			console.log(error);
		})
	}
	render() {
		return (<React.Fragment>
			<Sidebar className/>
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h3>Books</h3>
						<table className={`${styles.table} ${"table"}`}>
						    <thead>
						      <tr>
						        <th>Name</th>
						        <th>Catgory</th>
						        <th>Author</th>
						        <th>Publisher</th>
						      </tr>
						    </thead>
						    <tbody>
						      {this.state.bookList.map(book => {
						      	return (<tr key={Math.random()}>
							        <td>{book.name}</td>
							        <td>{book.category}</td>
							        <td>{book.author}</td>
							        <td>{book.publisher}</td>
							      </tr>);
						      })}
						    </tbody>
						</table>
					</div>	
				</div>
			</div>
		</React.Fragment>);
	}
}

Book.propTypes = {};

Book.defaultProps = {};

export default Book;
