var http = require('http');
var fs = require('fs');
var url = require('url');
var parseBody = require('./bodyParser');
var proxy = require('./proxy');
// var users = [];

var server = http.createServer(function(req, res) {

	var urlObj = url.parse(req.url, true);
	var pathname = urlObj.pathname;

	if (pathname == '/') {
		fs.createReadStream('./cross.html').pipe(res);
	} else if(pathname == '/reg') {
		// 1. 获取请求里的请求体
		// 2. 构建一个指向8080的请求，把请求体传过去
		// 3. 得到8080的响应，再传回客户端
		parseBody(req, function(result) {
			proxy({
				host: 'localhost',
				port: 8080,
				path: '/post',
				method: 'POST'
			}, result, function(response) {
				res.end(response);
			});
		})
	}

}).listen(7070);
