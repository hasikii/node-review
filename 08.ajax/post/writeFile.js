var fs = require('fs');
fs.readFile('./server.js', function(err, data) {
	console.log(data);
	var filename = '/cp.js';
	fs.writeFile('./img' + filename, data, function(err) {
		
	});
});