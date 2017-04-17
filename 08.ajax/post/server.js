// // 导入核心模块http
// var http = require('http');
// var url = require('url');
// var fs = require('fs');

// var server = http.createServer(function(req, res) {
// 	var urlObj = url.parse(req.url, true);
// 	if (urlObj.pathname == '/') {
// 		fs.readFile('./index.html', 'utf8', function(err, data) {
// 			res.end(data.toString());
// 		});
// 	} else if (urlObj.pathname == '/books') {
// 		res.writeHead(200, { 'Content-Type': 'application/json' });
// 		fs.readFile('./books.json', 'utf8', function(err, data) {
// 			res.end(data.toString());
// 		});
		
// 	}
// });

// // 在8080端口上进行监听，主机名是localhost
// server.listen(8080, 'localhost');

var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var mime = require('mime');

var formidable = require('formidable');
var util = require('util');

var server = http.createServer(function(req, res) {
	var urlObj = url.parse(req.url, true);
	if (urlObj.pathname == '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		fs.readFile('./formPost.html', 'utf8', function(err, data) {
			res.end(data);
		});
	} else if (urlObj.pathname == '/reg') {
		var result = '';
		req.on('data', function (data) {
			result += data;
		});
		req.on('end', function(data) {
			var contentType = req.headers['content-type']; // 取出请求头的内容类型
			// 表单序列化 "name=zs&age=6"
			if (contentType == 'application/x-www-from-urlencoded') {
				var obj = querystring.parse(result); console.log(obj);
			// json字符串 "{ "name": "zs", "age": 6 }"
			} else if(contentType == 'application/json') {
				var obj = JSON.parse(result); console.log(obj);
			} else if (contentType == 'multipart/form-data') {
				console.log(data);
			}
			res.end('ok');
		});
	} else if(urlObj.pathname == '/reg2') {
		// 构建一个解析器
		var form = new formidable.IncomingForm();
		// 把解析器解析请求体
		// 把非file的input放在fields里
		// 把文件类型的元素放在files里
		form.parse(req, function(err, fields, files) {

			fs.readFile(files.avatar.path, function(err, data) {
				console.log(data);
				var filename = '/imgs/' + files.avatar.name; console.log(filename);
				fs.writeFile('.' + filename, data, function(err) {
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.end(filename);
				});
			});

		});
	} else {
		fs.exists('.' + urlObj.pathname, function(exists) {
			if (exists) {
				res.setHeader('Content-Type', mime.lookup(urlObj.pathname));
				fs.readFile('.' + urlObj.pathname, function(err, data) {
					res.end(data);
				});
			} else {
				res.statusCode = 404;
				res.end('404');
			}
			
		});
	}
	
	
})

server.listen(8080);