/**
 * 对象是函数创建的
 * 用typeof Object是function来证明
 */

var obj = new Object();

var ary = new Array();

console.log(typeof Object); // function
console.log(typeof Array); // function

var obj2 = {};
var ary2 = [,,];

function fn() {

}
console.log(typeof fn);
/**
 * 1.函数名
 * 2.函数参数
 * 3.函数体
 */
var fn2 = new Function('a', 'b', 'console.log(a+b);');
fn2(1, 3)
console.log(typeof fn2);
