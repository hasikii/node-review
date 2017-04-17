// 导入核心模块http
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {

	var url = req.url; console.log(url);

	if (url == '/index.html') {
		// 指定文件的路径，设置编码，得到data就是字符串类型的
		fs.readFile('./index.html', 'utf8', function(err,data) {
			res.setHeader('Content-Type', 'text/html;charset=utf-8')
			res.write(data);
			res.end();
		});
	} else if(url == '/style.css') {
		// 指定文件的路径，设置编码，得到data就是字符串类型的
		fs.readFile('./style.css', 'utf8', function(err,data) {
			res.setHeader('Content-Type', 'text/css;charset=utf-8')
			res.write(data);
			res.end();
		});
	} else if(url == '/index.js') {
		// 指定文件的路径，设置编码，得到data就是字符串类型的
		fs.readFile('./index.js', 'utf8', function(err,data) {
			res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
			res.write(data);
			res.end();
		});
	}
	

	

});

// 在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');