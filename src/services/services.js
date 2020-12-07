import appConfig from './../appConfig';
import axios from 'axios';
const services = {
  getBooks: function() {
  	return axios.get(appConfig.httpUrl + appConfig.booksApi.get);
  },
  getNonLendedBooks: function() {
    return axios.get(appConfig.httpUrl + appConfig.bookRequestApi.getNonLended);
  },
  getLendedBooks: function() {
    return axios.get(appConfig.httpUrl + appConfig.bookRequestApi.getLended);
  },
  getUsers: function() {
  	return axios.get(appConfig.httpUrl + appConfig.usersApi.get);
  },
  getAuthors: function() {
  	return axios.get(appConfig.httpUrl + appConfig.authorsApi.get);
  },
  getPublishers: function() {
  	return axios.get(appConfig.httpUrl + appConfig.publishersApi.get);
  },
  getUserInfo: function() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}

export default services;