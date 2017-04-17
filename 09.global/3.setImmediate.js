setTimeout(function() {
	console.log('a');
}, 0);

/**
 * 在下一个事件环中执行此函数，属于下次任务
 * 效果和setTimeout一样，但效率更高，因为不用读时间
 * @param  {[type]} ) {	console.log('a');} [description]
 * @return {[type]}   [description]
 */
setImmediate(function() {
	console.log('b');
});

// 把函数放在当前的任务的末尾，set类是末尾的后面
process.nextTick(function() {
	console.log('c');
});

console.log('d');

// 附xhr.send()在open时指定是否异步操作，true异步，会到下一个事件环执行 
