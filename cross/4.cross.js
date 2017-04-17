var http = require('http');
var fs = require('fs');
var url = require('url');
// var users = [];

var server = http.createServer(function(req, res) {

	// var urlObj = url.parse(req.url, true);
	// var pathname = urlObj.pathname;

	// if (pathname == '/') {
	// 	console.log(123);
	// 	fs.readFile('./cross.html', 'utf8', function(err, data) {
	// 		res.end(data);
	// 	});
	// }

	fs.createReadStream('./cross.html').pipe(res);

}).listen(7070);