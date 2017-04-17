var http = require('http');	

var options = {
	host: 'localhost',
	port: 8080,
	path: '/post',
	method: 'POST', 
	//headers: {'Content-Type': 'application/json'}
	// headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	headers: {'Content-Type': 'application/zs'}
}

var request = http.request(options, function(res) {
	console.log(res.statusCode);
	console.log(res.headers);

	var result = '';
	res.on('data', function(data) {
		result += data;
	})
	res.on('end', function() {
		var users = JSON.parse(result)
		console.log(users);
	})
})

// request也是一个流

var data1 = '{"name": "zs", ';
var data2 = '"age": 6}';

var dataStr = 'name=zs&age=6';

var datamy = 'name@zs|age@6';

// request.write(data1);
// request.write(data2);

request.write(datamy);

request.end(); // write和end都能发请求