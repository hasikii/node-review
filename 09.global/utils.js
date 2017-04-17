var util = require('util');

// 1.util.inherits() 继承
function Parent() {
	this.name = 'father';
	this.age = 50;
	this.say = function() {
		console.log(this.name);
	}
}
Parent.prototype.showName = function() {
	console.log('show', this.name);
}

function Child() {
	Parent.call(this);
	this.name = 'child';
}

util.inherits(Child, Parent);

var c = new Child();
console.log(c);
c.showName();

// 2.util.inspect() 检查 用的略少
/**
 * 将任意一个对象转为字符串
 */
c.hobby = {
	name: 'play',
	price: {
		name: 'price'
	}
}
//console.log(util.inspect(c, { depth: 1 }));

// 3.util.isArray 判断是否为数组 
console.log(util.isArray({}));