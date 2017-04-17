var fs = require('fs');

function copy(src, target) {
	var rs = fs.createReadStream(src);
	var ws = fs.createWriteStream(target);

	rs.on('data', function (data) {
		var flag = ws.write(data);
		if (!flag) {
			rs.pause();
		}
	});
	ws.on('drain', function () {
		rs.resume();
	});
	rs.on('end', function () {
		ws.end();
	});
}

copy('./1.png', './2.png');