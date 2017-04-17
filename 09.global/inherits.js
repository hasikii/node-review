// encapsulation
function inherits(Child, Parent) {
	function inheritPrototype() {
		function Temp(){}
		Temp.prototype = Parent.prototype;
		return new Temp();
	}
	var p = inheritPrototype();
	p.constractor = Child; // constractor必须指定
	Child.prototype = p;
}


// example
function Parent() {
	this.name = 'father';
	this.age = 50;
	this.say = function() {
		console.log(this.name);
	}
}
Parent.prototype.showName = function() {
	console.log('show', this.name);
}

function Child() {
	// 私有属性用call继承
	Parent.call(this);
	this.name = 'child';
}

// useage
inherits(Child, Parent);
var c = new Child();
c.showName();

console.log(Child.prototype.constractor);