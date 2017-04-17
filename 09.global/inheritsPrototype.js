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
	Parent.call(this);
	this.name = 'child';
}

// function temp() {
// }
// temp.prototype = Parent.prototype;
// Child.prototype = new temp();

// encapsulation
function inheritsPrototype(ParentPrototype) {
	function Temp(){}
	Temp.prototype = ParentPrototype;
	return new Temp();
}
Child.prototype = inheritsPrototype(Parent.prototype);

// usage
var c = new Child();
c.showName();
