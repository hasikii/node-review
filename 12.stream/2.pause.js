var fs = require('fs');

var rs = fs.createReadStream('./1.txt', {
	flags: 'r',
	encoding: 'utf8',
	highWaterMark: 5
});

rs.on('data', function(data) {
	console.log(data);
	rs.pause(); // 暂停触发data事件
});

rs.on('end', function() {
	console.log('end');
});

rs.on('error', function(err) {
	console.log(err);
});