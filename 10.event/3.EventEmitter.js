function EventEmitter() {
	/*
	 * 一种事件可以注册多种回调所以envents长这样：
	 * _events = {
	 *     'look': [ fn1, fn2, ... ]
	 *     'eat': [ fn1, fn2, ... ]
	 * }
	 */
	this._events = {}; // 初始化一个私有属性
}

/**
 * 注册事件
 * @param  {[String]} type     [事件名称]
 * @param  {[Function]} listener [事件回调]
 * @return {[null]}          []
 */
EventEmitter.prototype.on = function(type, listener) {
	if (this._events[type]) {
		this._events[type].push(listener);
	} else {
		this._events[type] = [listener];
	}
}
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.once = function(type, listener) {
	
}

/**
 * 发射事件
 * @param  {[String]} type     [事件名称]
 * @param  {[Function]} listener [事件回调]
 * @return {[null]}          []
 */
EventEmitter.prototype.emit = function(type, listener) {
	if (this._events[type]) {
		this._events[type].forEach(function(listener) {
			listener();
		});
	}
}

/**
 * 移除事件
 * @param  {[String]} type     [事件名称]
 * @param  {[Function]} listener [事件回调]
 * @return {[null]}          []
 */
EventEmitter.prototype.removeListener = function(type, listener) {
	if (this._events[type]) {
		var listeners = this._events[type];
		listeners.forEach(function(lits,index,i) {
			if (lits === listener) { // 这个地方有点小讲究。var a=b={},则a===b
				listeners.splice(i, 1);
				return;
			}
		});
	}
}

EventEmitter.prototype.removeAllListeners = function(type) {
	
}

module.exports = EventEmitter;