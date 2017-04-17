// 1. 中间件用法： 路由 next
// 2. 自定义res上的属性：计算一个请求花了多少时间，美化res.end方法 console.time('cose'); console.timeEnd('cost');

var express = require('express');

var app = express();

// 计算一个处理请求一共花了多少时间
/**
 * 开始时间
 */
app.use('/', function(req, res, next) {
	res.start = Date.now();
	var end = res.end;
	res.end(function() {
		end.apply(res, Array.prototype.slice.call(arguments));
		console.log(Date.now() - res.start);
	});
	next();
})
// 中央发放补贴
app.use('/money', function(req, res, next) {
	// 可以定义方法，下面用
	res.toString = function(mny) {
		res.end(''+mny);
	}
	res.mny = 100;
	next();
})
// 省
app.use('/hello', function(req, res, next) {
	res.mny = res.mny - 10;
	next();
})
// 市
app.use('/money', function(req, res, next) {
	res.mny = res.mny - 30;
	next();
})
// 村
app.use(function(req, res, next) {
	res.mny = res.mny - 60;
	res.end('' + res.mny); // 写数字自动转成状态码
})

// app.get('/money', function(req, res) {
// 	res.end(""+res.mny);
// })

app.listen(8080);