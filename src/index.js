import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Book from './components/Book/Book';
import Dashboard from './components/Dashboard/Dashboard';
import User from './components/User/User';
import Author from './components/Author/Author';
import Publisher from './components/Publisher/Publisher';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BookRequest from './components/BookRequest/BookRequest';
import LendedBooks from './components/LendedBooks/LendedBooks';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import store from './store/index';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<Provider store={store}>
	<Router>
		<Header />
			<section>
				<Route exact path = "/login" component = {App} />
				<Route path = "/book" component = {Book} />
				<Route path = "/dashboard" component = {Dashboard} />
				<Route path = "/users" component = {User} />
				<Route path = "/authors" component = {Author} />
				<Route path = "/publishers" component = {Publisher} />
				<Route path = "/book-request" component = {BookRequest} />
				<Route path = "/lended-books" component = {LendedBooks} />
			</section>
		<Footer />
	</Router>
</Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
