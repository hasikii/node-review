console.log('b1');
// 在require a的时候返回一个临时的引用，未初始化完成的对象。要等a.js都执行完才算完成
var a = require('./a.js');
console.log(a.num);
console.log('b2');