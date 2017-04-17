function say(name, word) {
	console.log(arguments);
	console.log(this.name, name, word);
}

var obj = {
	name: 'zs'
}


Function.prototype.bind = function(obj) {
	var self = this;
	var args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var params = Array.prototype.slice.call(arguments, 0);
		self.apply(obj, args.concat(params));
	}
}

var newSay = say.bind(obj, '蛤蛤');
newSay('续一秒');

