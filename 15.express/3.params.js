var express = require('express');

var app = express();

app.get('/hello', function(req, res, next) {
	console.log(req.hostname);
	console.log(req.path);
	console.log(req.query);
	res.send('hello');
})

app.get('/user/:id/:age', function(req, res, next) {
	console.log(req.hostname);
	console.log(req.path);
	console.log(req.query);
	console.log(req.params);
	res.send('user');
})


app.listen(8080);