var express = require('express');
var path = require('path');
var fs = require('fs');
var mime = require('mime');

var app = express();

// app.use(function(req, res, next) {
// 	res.setHeader('Content-Type', mime.lookup(req.url));
// 	fs.createReadStream(__dirname + '/public' + req.url).pipe(res);
// });
app.use(express.static(path.resolve('public'))); // 指定public目录，但地址栏不用谢public，直接在端口号后面/index.css

app.listen(8080);