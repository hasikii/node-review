// 字面量创建
var obj = {name: 'zs'};
// new创建
var obj2 = new Object();

var ary = [1, 2, 3];
var ary2 = new Array(1,2,3);
ary2.age = 5;
ary2[4] = 'xxx';

console.log(ary2);

function fn() {
	console.log('fn');
}
console.dir(fn);
// 函数是一种对象
console.log(fn instanceof Object);
// 判断变量类型的几种方法
// 1. instanceof 原型链判断
// 2. typeof 基本类型和function
// 3. toString.call() 
// 4. !!fn.bind
// 5. constructor
console.log(typeof fn);
console.log(Object.prototype.toString.call(fn));
console.log(!!fn.bind);
console.log(fn.__proto__.constructor == Function);

