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
		id: 1,
		bookName: 'Book 1',
		bookCategory: 'Novel',
		author: 'Satham',
		authorId: 1,
		publisher: 'Satham',
		publisherId: 1,
	},
	{
		id: 2,
		bookName: 'Book 2',
		bookCategory: 'Horror',
		author: 'Karunakaran',
		authorId: 2,
		publisher: 'Karunakaran',
		publisherId: 2,
	},
	{
		id: 3,
		bookName: 'Book 3',
		bookCategory: 'Fantasy',
		author: 'Sathish Rajan',
		authorId: 3,
		publisher: 'Sathish Rajan',
		publisherId: 3,

	},
	{
		id: 4,
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
		id: 1,
		name: 'Satham',
		type: 'author'
	},
	{
		id: 2,
		name: 'Karunakaran',
		type: 'author'
	},
	{
		id: 3,
		name: 'Sathish Rajan',
		type: 'author'
	},
	{
		id: 4,
		name: 'Vinoth Kumar',
		type: 'author'
	},
];

const publishersTable = [
	{
		id: 1,
		name: 'Satham',
		type: 'publisher'
	},
	{
		id: 2,
		name: 'Karunakaran',
		type: 'publisher'
	},
	{
		id: 3,
		name: 'Sathish Rajan',
		type: 'publisher'
	},
	{
		id: 4,
		name: 'Vinoth Kumar',
		type: 'publisher'
	},
];

const usersTable = [
	{
		id: 1,
		name: 'Satham',
		email: 'satham@gmail.com',
		pwd: 'user'
	},
	{
		id: 2,
		name: 'Karunakaran',
		email: 'karuna@gmail.com',
		pwd: 'user'
	},
	{
		id: 3,
		name: 'Sathish Rajan',
		email: 'sathish@gmail.com',
		pwd: 'user'
	},
	{
		id: 4,
		name: 'Vinoth Kumar',
		email: 'vinoth@gmail.com',
		pwd: 'user'
	},
];

/*Books API Start*/

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
			id: booksTable.length + 1,
			bookName: req.body.bookName,
			bookCategory: req.body.bookCategory,
			author: req.body.author,
			authorId: req.body.authorId,
			publisher: req.body.publisher,
			publisherId: req.body.publisherId,
			author: req.body.author,
			publisher: req.body.publisher
		});
		res.status(200).send({
			id: booksTable.length + 1,
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

/*Books API End*/

/*Authors API Start*/
router.get('/authors', function(req, res) {
	res.status(200).send({
		authors: authorsTable
	});
});
/*Authors API End*/

/*Publishers API Start*/
router.get('/publishers', function(req, res) {
	res.status(200).send({
		publishers: publishersTable
	});
});
/*Publishers API End*/

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
			id: usersTable.length + 1,
			name: req.body.name,
			email: req.body.email,
			pwd: req.body.pwd
		});
		res.status(200).send({
			id: usersTable.length + 1,
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