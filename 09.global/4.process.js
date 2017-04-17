// 1.返回当前工作目录
console.log(process.cwd());
// 2.改变当前工作目录
process.chdir('txt');
console.log(process.cwd());
var fs = require('fs');

console.log(fs.readFileSync('index.txt', 'utf8'));