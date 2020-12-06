var express = require('express');
var router = express();
router.use(express.json());
router.use(function(req,res,next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

const booksTable = [
	{
		id: 1001,
		bookName: 'Book 1',
		bookCategory: 'Novel',
		author: 'Satham',
		authorId: 1,
		publisher: 'Satham',
		publisherId: 1,
	},
	{
		id: 1002,
		bookName: 'Book 2',
		bookCategory: 'Horror',
		author: 'Karunakaran',
		authorId: 2,
		publisher: 'Karunakaran',
		publisherId: 2,
	},
	{
		id: 1003,
		bookName: 'Book 3',
		bookCategory: 'Fantasy',
		author: 'Sathish Rajan',
		authorId: 3,
		publisher: 'Sathish Rajan',
		publisherId: 3,

	},
	{
		id: 1004,
		bookName: 'Book 4',
		bookCategory: 'Literary',
		author: 'Vinoth Kumar',
		authorId: 4,
		publisher: 'Vinoth Kumar',
		publisherId: 4,
	}
];

const authorsTable = [
	{
		id: 1001,
		name: 'Satham',
		email: 'satham@gmail.com',
		type: 'author'
	},
	{
		id: 1002,
		name: 'Karunakaran',
		email: 'karuna@gmail.com',
		type: 'author'
	},
	{
		id: 1003,
		name: 'Sathish Rajan',
		email: 'sathish@gmail.com',
		type: 'author'
	},
	{
		id: 1004,
		name: 'Vinoth Kumar',
		email: 'vinoth@gmail.com',
		type: 'author'
	}
];

const publishersTable = [
	{
		id: 1001,
		name: 'Satham',
		email: 'satham@gmail.com',
		type: 'publisher'
	},
	{
		id: 1002,
		name: 'Karunakaran',
		email: 'karuna@gmail.com',
		type: 'publisher'
	},
	{
		id: 1003,
		name: 'Sathish Rajan',
		email: 'sathish@gmail.com',
		type: 'publisher'
	},
	{
		id: 1004,
		name: 'Vinoth Kumar',
		email: 'vinoth@gmail.com',
		type: 'publisher'
	}
];

const usersTable = [
	{
		id: 1001,
		name: 'Satham',
		email: 'satham@gmail.com',
		pwd: 'user',
		userType: 'user'
	},
	{
		id: 1002,
		name: 'Karunakaran',
		email: 'karuna@gmail.com',
		pwd: 'user',
		userType: 'user'
	},
	{
		id: 1003,
		name: 'Sathish Rajan',
		email: 'sathish@gmail.com',
		pwd: 'user',
		userType: 'user'
	},
	{
		id: 1004,
		name: 'Vinoth Kumar',
		email: 'vinoth@gmail.com',
		pwd: 'user',
		userType: 'user'
	},
	{
		id: 1005,
		name: 'Admin',
		email: 'admin@gmail.com',
		pwd: 'admin',
		userType: 'admin'
	},
];

/*--Login API Start--*/
router.post('/login', function(req, res) {
	let chkDupliRec = usersTable.filter(val => {
		return val.email == req.body.email && val.pwd == req.body.pwd;
	});
	if(chkDupliRec.length === 0) {
		res.status(401).send({
			data: 'Unauthorized'
		});
	} else {
		res.status(200).send({
			data: chkDupliRec[0]
		});
	}
});
/*--Login API Ends*/

/*--Books API Start--*/

//API - To get all books
router.get('/books', function(req, res) {
	res.status(200).send({
		data: booksTable
	});
});

//API - To create the book
router.post('/createBook', function(req, res) {
	let chkDupliRec = booksTable.filter(val => {
		return val.bookName === req.body.bookName && val.bookCategory === req.body.bookCategory;
	});
	if(chkDupliRec.length === 0) {
		booksTable.push({
			id: Math.floor(Math.random() * 1000),
			bookName: req.body.bookName.trim(),
			bookCategory: req.body.bookCategory,
			author: req.body.author,
			authorId: req.body.authorId,
			publisher: req.body.publisher,
			publisherId: req.body.publisherId,
			author: req.body.author,
			publisher: req.body.publisher
		});
		res.status(200).send({
			id: Math.floor(Math.random() * 1000),
			bookList: booksTable,
			message: 'Book created successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Book name already used.'
		});
	}
});

//API - To update the book
router.put('/updateBook/:id', function(req, res) {
	let updFlg = false;
	booksTable.filter((val, index, array) => {
		if(val.id == req.params.id) {
			booksTable.splice(index,1,req.body);
			updFlg = true;
		}
	});
	if(updFlg === true) {
		res.status(200).send({
			id: req.params.id,
			bookList: booksTable,
			message: 'Book update successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Something went wrong please check it.'
		});
	}
});

//API - To delete the book
router.delete('/deleteBook/:id', function(req, res) {
	let delFlg = false;
	booksTable.filter((val, index, array) => {
		if(val.id == req.params.id) {
			booksTable.splice(index,1);
			delFlg = true;
		}
	});
	if(delFlg === true) {
		res.status(200).send({
			id: req.params.id,
			bookList: booksTable,
			message: 'Book deleted successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Something went wrong please check it.'
		});
	}
});

/*--Books API End--*/

/*--Authors API Start--*/
//API - To get all authors
router.get('/authors', function(req, res) {
	res.status(200).send({
		data: authorsTable
	});
});

//API - To create the author
router.post('/createAuthor', function(req, res) {
	let chkDupliRec = authorsTable.filter(val => {
		return val.email === req.body.email;
	});
	if(chkDupliRec.length === 0) {
		authorsTable.push({
			id: Math.floor(Math.random() * 1000),
			name: req.body.name.trim(),
			email: req.body.email,
			type: req.body.type
		});
		res.status(200).send({
			id: Math.floor(Math.random() * 1000),
			authorList: authorsTable,
			message: 'Author added successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Email already used.'
		});
	}
});

//API - To update the author
router.put('/updateAuthor/:id', function(req, res) {
	let updFlg = false;
	authorsTable.filter((val, index, array) => {
		if(val.id == req.params.id) {
			authorsTable.splice(index,1,req.body);
			updFlg = true;
		}
	});
	if(updFlg === true) {
		res.status(200).send({
			id: req.params.id,
			authorList: authorsTable,
			message: 'Author update successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Something went wrong please check it.'
		});
	}
});

//API - To delete the author
router.delete('/deleteAuthor/:id', function(req, res) {
	let delFlg = false;
	authorsTable.filter((val, index, array) => {
		if(val.id == req.params.id) {
			authorsTable.splice(index,1);
			delFlg = true;
		}
	});
	if(delFlg === true) {
		res.status(200).send({
			id: req.params.id,
			authorList: authorsTable,
			message: 'Author deleted successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Something went wrong please check it.'
		});
	}
});
/*--Authors API End--*/

/*--Publishers API Start--*/
router.get('/publishers', function(req, res) {
	res.status(200).send({
		data: publishersTable
	});
});

//API - To create the publisher
router.post('/createPublisher', function(req, res) {
	let chkDupliRec = publishersTable.filter(val => {
		return val.email === req.body.email;
	});
	if(chkDupliRec.length === 0) {
		publishersTable.push({
			id: Math.floor(Math.random() * 1000),
			name: req.body.name.trim(),
			email: req.body.email,
			type: req.body.type
		});
		res.status(200).send({
			id: Math.floor(Math.random() * 1000),
			publisherList: publishersTable,
			message: 'Publisher added successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Email already used.'
		});
	}
});

//API - To update the publisher
router.put('/updatePublisher/:id', function(req, res) {
	let updFlg = false;
	publishersTable.filter((val, index, array) => {
		if(val.id == req.params.id && val.email == req.body.email) {
			publishersTable.splice(index,1,req.body);
			updFlg = true;
		}
	});
	if(updFlg === true) {
		res.status(200).send({
			id: req.params.id,
			publisherList: publishersTable,
			message: 'Publisher update successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Something went wrong please check it.'
		});
	}
});

//API - To delete the publisher
router.delete('/deletePublisher/:id', function(req, res) {
	let delFlg = false;
	publishersTable.filter((val, index, array) => {
		if(val.id == req.params.id) {
			publishersTable.splice(index,1);
			delFlg = true;
		}
	});
	if(delFlg === true) {
		res.status(200).send({
			id: req.params.id,
			publisherList: publishersTable,
			message: 'Publisher deleted successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Something went wrong please check it.'
		});
	}
});
/*--Publishers API End--*/

/*Users API Start*/
//API - To create the users
router.get('/users', function(req, res) {
	res.status(200).send({
		data: usersTable
	});
});

//API - To create the user
router.post('/createUser', function(req, res) {
	let chkDupliRec = usersTable.filter(val => {
		return val.email === req.body.email;
	});
	if(chkDupliRec.length === 0) {
		usersTable.push({
			id: Math.floor(Math.random() * 1000),
			name: req.body.name.trim(),
			email: req.body.email,
			pwd: req.body.pwd
		});
		res.status(200).send({
			id: Math.floor(Math.random() * 1000),
			userList: usersTable,
			message: 'User added successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Email already used.'
		});
	}
});

//API - To update the book
router.put('/updateUser/:id', function(req, res) {
	let updFlg = false;
	usersTable.filter((val, index, array) => {
		if(val.id == req.params.id && val.email === req.body.email) {
			usersTable.splice(index,1,req.body);
			updFlg = true;
		}
	});
	if(updFlg === true) {
		res.status(200).send({
			id: req.params.id,
			userList: usersTable,
			message: 'User updated successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Something went wrong please check it.'
		});
	}
});

//API - To delete the user
router.delete('/deleteUser/:id', function(req, res) {
	let delFlg = false;
	usersTable.filter((val, index, array) => {
		if(val.id == req.params.id) {
			usersTable.splice(index,1);
			delFlg = true;
		}
	});
	if(delFlg === true) {
		res.status(200).send({
			id: req.params.id,
			userList: usersTable,
			message: 'User deleted successfully.'
		});
	} else {
		res.status(200).send({
			id: 0,
			message: 'Something went wrong please check it.'
		});
	}
});

/*Users API End*/

module.exports = router;