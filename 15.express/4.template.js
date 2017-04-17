/**
 * 模板原理分类
 * 1. 动态内容 当前时间
 * 2. 静态内容 template.html
 * 3. 动静结合 ejs jade
 * 模板原理：
 * String.replace();
 */

var express = require('express');
var app = express();

var path = require('path');

/**
 * 模板渲染原理函数
 * @param  {[type]} tmpl [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
// function render(tmpl, data) {
// 	tmpl.replace(/\{\{(\w+)\}\}/, function(input, group1, index, whole) {
// 		console.log(arguments);
// 		return data[group1];
// 	});
// }

// var result = render('<h1>{{title}}</h1>', {title: '曰..曰'});
// console.log(result);

/**
 * app.set(); // 设置模板引擎
 * app.set(); // 设置模板目录
 * res.render();
 */
app.set('view engine', 'ejs');
// app.set('./views', process.cwd() + './views');
app.set('views', path.resolve('aaa/list'));

app.get('/', function(req, res) {
	res.render('index.ejs', {title: 'home'});
});

app.get('/reg', function(req, res) {
	res.render('index', {title: 'register'});
});

app.listen(8080);