var express = require('express')
var router = require('./router')
var app = express()
app.use('/',router)
app.listen(3001, function () {
  console.log('App listening on port 3001');
});
// const express = require('express')
// const app = express()
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
 
// app.listen(3000)