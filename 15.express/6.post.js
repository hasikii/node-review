var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));

// 请求content-type为application/x-www-form-urlencoded，则用此中间件把请求体放到req.body中，否则不放
app.use(bodyParser.urlencoded({extended: true})); // extended为true时，用querystring，为false，会用自己的转换方法
// 请求content-type为application/json，则用此中间件把请求体放到req.body中，否则不放
app.use(bodyParser.json());
app.post('/reg', function(req, res) {
	console.log(req.body);
	res.end('reg');
});

app.listen(8080);