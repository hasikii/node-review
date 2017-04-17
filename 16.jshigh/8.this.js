function say() {
	//console.log(this);
}

say();

function Person() {
	this.name = 'zs';
	console.log(this);
}

var p = new Person();

function Animal() {
	this.name = 'miaomiao';
	console.log(this);
	// return 3; // return一个非对象类型，也返回this
	// return {age: 6}; // return一个对象，返回对象
}

var cat = new Animal();
console.log(cat);

Person.prototype.getName = function() {
	console.log(this);
}
p.getName();
// function myNew() {
// 	var obj = new Object();
// 	obj.name = 'zs';
// 	return obj;
// }

// var mynew = myNew(); console.log(mynew);

