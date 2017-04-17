// 判断下，可能会出错哦
var a = 10;
function fn() {
	console.log(a);
}

function bar(f) {
	var a = 20;
	f();
}

bar(fn);