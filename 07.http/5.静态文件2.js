// 导入核心模块http
var http = require('http');
var fs = require('fs');
var path = require('path');

var mime = require('mime');
// var mime = {
// 	'.html': 'text/html',
// 	'.js': 'text/javascript',
// 	'.css': 'text/css',
// 	'.ico': ''
// }

var server = http.createServer(function(req, res) {

	var url = req.url; console.log('url: ' + url);
	
	if (url == '/') {
		url = '/index.html';
	}
	
	res.setHeader('Content-Type', mime.lookup(url) + ';charset=utf-8')
	fs.readFile('.' + url, 'utf8', function(err,data) {
		console.log(data);
		res.write(data);
		res.end();
	});
});

// 在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');