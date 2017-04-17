var bodyParser = require('./bodyParser');

module.exports = function(options, data, callback) {
	var http = require('http');	
	// 请求真正服务器
	var request = http.request(options, function(res) {

		bodyParser(res, function(result) {
			callback(result);
		});
	})
	request.end(data); // write和end都能发请求
}