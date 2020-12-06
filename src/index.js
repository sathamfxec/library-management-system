import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Book from './components/Book/Book';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import store from './store/index';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<React.Fragment>
	<Provider store={store}>
		<Router>
			<Header />
				<section>
					<Route exact path = "/login" component = {App} />
					<Route path = "/book" component = {Book} />
					<Route path = "/dashboard" component = {Dashboard} />
				</section>
			<Footer />
		</Router>
	</Provider>
</React.Fragment>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
