var o = {};
var data = null;
var handlers = [];

o.watch = function(handler) {
	handlers.push(handler);
}

Object.defineProperty(o, 'data', {
	set: function(v) {
		console.log('set', v);
		data = v;
		handlers.forEach(function(handler, index) {
			handler.call(o, data);
		});
	},
	get: function() {
		console.log('get', data);
		return data;
	}
});


o.watch(function(data) {
	function render(tmpl, data) {
		return tmpl.replace(/\{\{(\w+)\}\}/, function(input, group1) {
			return data[group1];
		});
	}
	console.log(render(tmpl, data));
	document.body.innerHTML = render(tmpl, data);
});




var tmpl = '<h1>{{title}}</h1>';

o.data = {
	title: 'zs'
};

document.body.addEventListener('click', function() {
	o.data = {
		title: 'click'
	}
});
