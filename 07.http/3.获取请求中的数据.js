// 导入核心模块http
var http = require('http');

var server = http.createServer(function(req, res) {
	console.log(req.method); // 请求方法
	console.log(req.url); // 请求url
	console.log(req.headers); // 请求头

	res.setHeader('Content-Type', 'text/html;charset=utf-8'); // 设置响应头——类型
	res.statusCode = 404; // 设置状态码
	res.write('hello'); // 设置响应体
	setTimeout(function() {
		res.write('world');
		res.end('over'); // setTimeout说明了write的时候，服务端已经发了
	}, 1000);
});

// 在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');