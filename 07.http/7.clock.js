// 导入核心模块http
var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	var urlObj = url.parse(req.url, true);
	if (urlObj.pathname == '/') {
		res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
		fs.readFile('./clock.html', function(err, data) {
			res.end(data);
		})
	} else if(urlObj.pathname == '/clock') {
		res.end(new Date().toLocaleString());
	}
});

// 在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');