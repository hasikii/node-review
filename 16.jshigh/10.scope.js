function one() {
	var a = Math.random();
	console.log(a);
	return function() {
		return a;
	}
}

var s = one(); // 入栈出栈

var d = one(); // 入栈出栈

console.log(s(), d());

for (var i = 0; i < 10; i++) {
	
}
console.log(i);

var zs = 100;
if (true) {
	var zs = 10;
}

console.log(zs);
