const appConfig = {
	clearStorage: ['userInfo','isAuth','publishers','authors'],
	bookTypes: [
		{name: 'Novel', value: 'Novel'},
		{name: 'Horror', value: 'Horror'},
		{name: 'Fantasy', value: 'Fantasy'},
		{name: 'Literary', value: 'Literary'},
		{name: 'Classics', value: 'Classics'}
	],
	httpUrl: 'http://localhost:3001',
	booksApi: {
		get: '/books',
		post: '/createBook',
		put: '/updateBook',
		delete: '/deleteBook'
	},
	authorsApi: {
		get: '/authors',
		post: '/createAuthor',
		put: '/updateAuthor',
		delete: '/deleteAuthor'
	},
	publishersApi: {
		get: '/publishers',
		post: '/createPublisher',
		put: '/updatePublisher',
		delete: '/deletePublisher'
	},
	usersApi: {
		get: '/users',
		post: '/createUser',
		put: '/updateUser',
		delete: '/deleteUser'
	},
	loginApi: {
		post: '/login'
	},
	bookRequestApi: {
		getLended: '/lended-books',
		getNonLended: '/non-lended-books',
		post: '/lendbook',
		delete: '/deleterequest'
	},
	adminApprovalApi: {
		approve: '/approve-lend-request',
		reject: '/reject-lend-request'
	},
	dashboardApi: {
		get: '/dashboard-data'
	}
}

export default appConfig;