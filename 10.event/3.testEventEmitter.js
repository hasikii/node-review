var EventEmitter = require('./3.EventEmitter.js');
var util = require('util');

function Girl(name) {
	EventEmitter.call(this);
	this.name = name;
}

util.inherits(Girl, EventEmitter);

var girl = new Girl();

function Boy(name) {
	this.name = name
	this.say = function(words) {
		console.log(this.name, words);
	}
}
var xiaoming = new Boy('小明');
var xiaohua = new Boy('小花');

// 1. addListener: 注册监听 <--> 事件：订阅
// 2. bind: 返回新函数，并且改变this
var cb = xiaoming.say.bind(xiaoming, '看上就买吧');
girl.addListener('look', cb);
// 3. on: addListener一模一样
girl.on('look',xiaohua.say.bind(xiaohua, '喜欢就多看看吧'));
// 4. emit: 事件发射 <--> 事件：发布
girl.emit('look');

// 5. once: 注册的事件只能触发一次
// girl.once('hungry', function() {
// 	console.log('eat!');
// });

// girl.emit('hungry');
// girl.emit('hungry');
// girl.emit('hungry');
// girl.emit('hungry');

// 6. removeListener: 移除监听
console.log("==== removeListener ====");
girl.removeListener('look', cb);
girl.emit('look'); // 	注册的关于小明的事件被移除了，所以小明不说话了

// 7. removeAllListeners
// girl.removeAllListeners('look');
// girl.emit('look'); // 所有事件都被移除，都不说话了