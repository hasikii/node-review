/**
 * 1.内置模块
 * 2.文件模块
 * 3.第三方模块
 */

var gl = require('./2.global.js');

// 一、获取当前模块的文件的绝对路径，不是global下属性
console.log(__filename);
// 二、获取当前模块文件的所在目录的绝对路径
console.log(__dirname);

var a = 1;
console.log(global);
/**
 * 1.global的属性可以不用引用，也不用声明，就可以直接用
 * 2.在node中，能直接用的又两种
 * 		1. 全局对象 global
 * 		2. 初始化模块时传入的参数 __filename __dirname
 */

 // 三、setTimeout
 // 四、setImmediate