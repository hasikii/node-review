var Add = new Function('a', 'b', 'return a + b');
// 创建了就送一个add.prototype对象
console.log(Add.prototype);

var o1 = new Object();

console.log(o1.__proto__ === Object.prototype);

var add = new Add();
console.log(add instanceof Add);
console.log(add instanceof Object); // 证明了：所有函数都是对象

console.log(Function instanceof Function); // rua