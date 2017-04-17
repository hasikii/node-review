var http = require('http')
var users = []
/**
 * 1. 客户端吧一个和用户信息发送给服务器
 * 2. 服务器接收到后追加到users数组中
 * 3. 服务器返回users数组，在客户端那里打印出来
 */
http.createServer(function(req, res) {
	console.log(req.url);
	console.log(req.method);
	console.log(req.headers);
	console.log(req.httpVersion);

	req.setEncoding('utf8') // 设置编码

	var contentType = req.headers['content-type'];

	var result = '';
	req.on('data', function(data) {

		console.log('data: ', data);
		result += data; // 拼一下，因为可能不是完整的json
	})
	req.on('end', function() {
		var user = '';
		if (contentType === 'application/json') {
			user = JSON.parse(result)
		} else if (contentType === 'application/x-www-form-urlencoded') {
			user = require('querystring').parse(result)
		} else if (contentType === 'application/zs') {
			// name@zs|age@6
			user = require('querystring').parse(result, '|', '@')
		}
		users.push(user)
		// res.setHeader('name', 'zs') // 自定义头
		res.end(JSON.stringify(users))
	})
}).listen(8080)