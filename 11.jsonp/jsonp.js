// 跨域
// 1. 同源策略
// 2. 协议 域名 端口号
// 3. jsonp

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res) {
	var urlObj = url.parse(req.url, true);
	var pathname = urlObj.pathname;
	if (pathname == '/') {
		fs.readFile('./index.html', function(err, data) {
			res.end(data);
		}); 
	} else if(pathname == '/book') {
		var data = urlObj.query.callbackname + "(['js', 'node'])";
		res.end(data);
	}
	
}).listen(8080);