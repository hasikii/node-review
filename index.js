var o = {};
var data = null;
var handlers = [];

o.watch = function(handler) {
	handlers.push(handler);
};

Object.defineProperty(o, 'data', {
	get: function() {
		return data;
	},
	set: function(value) {
		data = value;
		handlers.forEach(function(handler) {
			handler.call(o, data);
		});
	}
});

o.watch(function(data) {
	document.body.innerHTML = data.title
});


o.data = {
	title: 'zs'
}