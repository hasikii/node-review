// 导入核心模块http
var http = require('http');
var url = require('url');
var fs = require('fs');
var users = [];

var server = http.createServer(function(req, res) {
	var urlObj = url.parse(req.url, true);
	if (urlObj.pathname == '/') {
		res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
		fs.readFile('./8.reg.html', function(err, data) {
			res.end(data);
		})
	} else if(urlObj.pathname == '/reg') {
		var str = '';
		// 每当服务器收到请求数据时，就是触发data事件
		req.on('data', function(data) {
			str += data.toString();// data默认是buffer
		})
		req.on('end', function() {
			// console.log(str);
			users.push(JSON.parse(str));
			res.end(JSON.stringify(users))
		})
	} else if (urlObj.pathname == '/check') {
		var usersChecked = [];
		req.on('data', function(data) { 
			var username = JSON.parse(data.toString()).username;
			var age = JSON.parse(data.toString()).age;
			for (var i = 0; i < users.length; i++) {
				if (users[i].username == username && users[i].age == age) {
					usersChecked = [{
						username: username,
						age: age
					}];
				}
			}
		})
		req.on('end', function() {
			res.end(JSON.stringify(usersChecked));
		})
	}
	
});

// 在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');