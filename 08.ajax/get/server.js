// 导入核心模块http
var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	var urlObj = url.parse(req.url, true);
	if (urlObj.pathname == '/') {
		fs.readFile('./index.html', 'utf8', function(err, data) {
			res.end(data.toString());
		});
	} else if (urlObj.pathname == '/books') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		fs.readFile('./books.json', 'utf8', function(err, data) {
			res.end(data.toString());
		});
		
	}
});

// 在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');