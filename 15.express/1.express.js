// 1. express 安装和基本使用
// 2. app.get app.post app.all
// 3. 路由 req res res.send

var express = require('express');

var app = express();

app.get('/hello', function(req, res) {
	res.send('get'); //　自动转换相应信息，并且自动设置content-type
});

app.post('/hello', function(req, res) {
	res.send('post'); //　自动转换相应信息，并且自动设置content-type
});

app.all('/world', function(req, res) {
	res.send('all'); //　自动转换相应信息，并且自动设置content-type
});

app.listen(3000);