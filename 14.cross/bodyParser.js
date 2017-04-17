function parseBody(req, callback) {
	var result = '';
	req.on('data', function(data) {
		result += data;
	});
	req.on('end', function() {
		typeof callback == 'function' && callback(result);
	})
}

module.exports = parseBody;