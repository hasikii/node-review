// 导入核心模块http
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var mime = require('mime');
// var mime = {
// 	'.html': 'text/html',
// 	'.js': 'text/javascript',
// 	'.css': 'text/css',
// 	'.ico': ''
// }

var server = http.createServer(function(req, res) {

	var urlObj = url.parse(req.url, true); console.log(urlObj);
	
	res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

	if (urlObj.pathname == '/apple') {
		res.end(urlObj.query.num + '个苹果');
	}
	
});

// 在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');