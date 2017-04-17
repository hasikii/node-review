var a = 1;

/**
 * 这个函数上下文环境包括：
 * arguments 形参 length callee 类数组
 * 
 * this
 * var 变量声明
 * ...
 */
function fn1() {
	var a = 10;
	function fn2() {
		// 先从当前上下文环境中的VO找var function 和 arguments中有没有
		// 如果没有，从作用域链中找
		console.log(b);
	}
	fn2();
}

fn1();