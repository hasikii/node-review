/**
 * 全局代码执行时会产生一个上下文环境对象如下
 * 
 */
{
	this: "上下文对象",
	a: var的变量声明（包括hello: 函数表达式），会预解释，但不赋值
	fn: 函数声明,预解释并且声明
	alert,
	Math
}
var a = 10;
// 函数声明会预解释，会提取到最前面执行
function fn() {}
// 函数表达式，var会提前声明，但不会赋值
var hello = function() {}

console.log(this.a);
console.log(a);
fn();

(function() {
	
})()