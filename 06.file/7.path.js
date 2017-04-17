var fs = require('fs');
var path = require('path');

// 合并 连接路径
console.log(path.join('./book', 'mysql.json')); // book\mysql.json
// 判断是哪种系统的分隔符
console.log(path.sep);

console.log(__filename); // 绝对路径
console.log(__dirname); // 所在目录的绝对路径

// 返回一个路径里的文件名
console.log(path.basename('7.path.js'));
// 返回一个路径里的文件名的名字不带扩展名
console.log(path.basename('7.path.js', '.js'));
// 返回一个路径里的文件的扩展名(带点)
console.log(path.extname('./fda/7.path.js'));

// 从一个相对路径解析出一个绝对路径
console.log(path.resolve());
console.log(path.resolve('book','node.json', '..', 'mysql.json'));

console.log(path.resolve(__dirname, './book'));

