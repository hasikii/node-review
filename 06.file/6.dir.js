// read async all writeFile copy
// 6目录
/**
 * 1. 操作目录
 */
var fs = require('fs');

// mk dir，// 要求父目录必须存在
fs.mkdir('test/t/', function(err) {
	if (err) {
		console.log(err);
		console.log('目录创建失败');
	} else {
		console.log("目录创建成功");
	}
})

/**
 * 创建文件夹，如果父文件夹不存在，则自动创建
 * @param  {[type]}   path     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function makep(path, callback) {
	// 1. 把这个参数转成数组
	// 2. 一次判断这个目录是否存在，如果存在的话，则跳过，如果不存在则创建
	// 3. 创建一个最终的目录
	var tempAry = path.split('/');
	tempAry.forEach(function() {
		
	})
}

// 2. 读取目录下所有文件
fs.readdir('./book', function(err, files) {
	if (err) {
		console.log(err);
	} else {
		console.log(files);
	}
	
})

// 3. 获取一个文件或目录的详情
fs.readdir('./book', function(err, files) {
	files.forEach(function(file) {
		fs.stat('./book/' + file, function(e, state) {
			console.log(state);
			console.log(state.isDirectory());
			console.log(state.isFile());
		});
	})
})

// 4. 判断一个文件(或文件夹)是否存在
fs.exists('./book', function(exists) {
	console.log("===== 4. 判断一个文件是否存在 =====");
	console.log(exists);
})
