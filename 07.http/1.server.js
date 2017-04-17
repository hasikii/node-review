// 导入核心模块http
var http = require('http');

/**
 * 1. 能在特定的ip 特定的端口上监听 客户端的请求
 * 2. 当请求到来的时候能执行监听函数，并返回响应
 * @param  {[type]} req  客户端的请求，可以从中获取请求过来的信息
 * @param  {[type]} res) 服务端的响应
 * @return {[type]}      [description]
 */
var server = http.createServer(function(req, res) {
	res.write('hello'); // 参数必须是字符串或者buffer
	res.write('world'); // write方法可反复调用，止于end
	res.write(new Date().toLocaleString()); // write方法可反复调用，止于end
	res.end();
});

// 在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');