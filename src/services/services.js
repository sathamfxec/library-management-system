import appConfig from './../appConfig';
import axios from 'axios';
const services = {
	getBooks: function() {
    	return axios.get(appConfig.httpUrl + appConfig.booksApi.get);
  	},
  	getUsers: function() {
    	return axios.get(appConfig.httpUrl + appConfig.usersApi.get);
  	},
	getAuthors: function() {
    	return axios.get(appConfig.httpUrl + appConfig.authorsApi.get);
  	},
  	getPublishers: function() {
    	return axios.get(appConfig.httpUrl + appConfig.publishersApi.get);
  	}
}

export default services;