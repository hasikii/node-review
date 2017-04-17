var EventEmiiter = require('events');

var e = new EventEmiiter();

a.once();

EventEmiiter.prototype.once = function once(type, listener) {
	function g() {
		this.removeListener(type, g);
		listener.apply(this, arguments);
	}
	this.on(type, g);
}