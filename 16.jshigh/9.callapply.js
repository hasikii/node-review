function say(city, word) {
	console.log(this.name, city, word);
}
//say('zs', 'hello');

var obj = {
	name: 'zs'
}

say.apply(obj, ['hangzhou', 'apply']);

say.call(obj, 'hangzhou', 'call');

var newSay = say.bind(obj, 'hangzhou'); // 应用：绑定事件的回调传参
newSay('bind');


function each() {
	var args = Array.prototype.slice.call(arguments);
	Array.prototype.forEach.call(args, function(item) {
		console.log(item);
	});
}

each(1,2,3,4,5);