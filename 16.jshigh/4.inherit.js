var Person = function() {
	// 私有属性
	this.name = 'zs';
	this.age = 6;
}

// 公有的
Person.prototype.getName = function() {
	console.log(this.name);
}

var p = new Person();

p.getName()

console.log(p.hasOwnProperty('name')); // true
console.log(p.hasOwnProperty('getName')); // false
