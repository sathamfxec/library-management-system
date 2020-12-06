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

const books = [
	{
		id: 1,
		name: 'Book 1',
		category: 'Novel',
		author: 'Satham 1',
		publisher: 'Satham 1'
	},
	{
		id: 2,
		name: 'Book 2',
		category: 'Novel',
		author: 'Satham 2',
		publisher: 'Satham 2'
	},
	{
		id: 3,
		name: 'Book 3',
		category: 'Novel',
		author: 'Satham 3',
		publisher: 'Satham 3'
	},
	{
		id: 4,
		name: 'Book 4',
		category: 'Novel',
		author: 'Satham 4',
		publisher: 'Satham 4'
	}
];

const authors = [
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
		id: 2,
		name: 'Sathish Rajan',
		type: 'author'
	},
	{
		id: 2,
		name: 'Vinoth Kumar',
		type: 'author'
	},
];

const publishers = [
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
		id: 2,
		name: 'Sathish Rajan',
		type: 'publisher'
	},
	{
		id: 2,
		name: 'Vinoth Kumar',
		type: 'publisher'
	},
];

const users = [
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
		id: 2,
		name: 'Sathish Rajan',
		email: 'sathish@gmail.com',
		pwd: 'user'
	},
	{
		id: 2,
		name: 'Vinoth Kumar',
		email: 'vinoth@gmail.com',
		pwd: 'user'
	},
];

/*Books API Start*/
router.get('/books', function(req, res) {
	res.status(200).send({
		data: books
	});
});
/*Books API End*/

/*Authors API Start*/
router.get('/authors', function(req, res) {
	res.status(200).send({
		authors: authors
	});
});
/*Authors API End*/

/*Publishers API Start*/
router.get('/publishers', function(req, res) {
	res.status(200).send({
		publishers: publishers
	});
});
/*Publishers API End*/

/*Users API Start*/
router.get('/users', function(req, res) {
	res.status(200).send({
		data: users
	});
});
/*Users API End*/

module.exports = router;