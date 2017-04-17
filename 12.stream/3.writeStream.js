// 可写流的方法
// write 写入数据
// end 结束写入数据时触发，迫使缓存区中的数据立即写入目标对象，调用后不能再写入

// 1. WriteStream
// fs.createWriteStream(path, [options]);
//  - path 读取的文件路径
//  - options
//  	- flags 对文件采取何种操作，默认为'w'
//  	- encoding 指定编码，默认为null
//  	- start 用整数表示文件开始字节数的写入位置
//  	- highWaterMark 最高水位线，write()开始返回false的缓冲大小。缺省为16k

var fs = require('fs');
var ws = fs.createWriteStream('./1.txt', {
	flags: 'a', // 追加文件并写入，start设置将无效，总是从最后写 a=append w=write r=read
	start: 1,
	highWaterMark: 1
});

// var flag = ws.write('a'); console.log(flag); // 向流中写入数据
// ws.write('b'); // 向流中写入数据
// ws.write('c'); // 向流中写入数据

var max = 10;
var n = 0;
function write() {
	console.log('继续写', n);
	var flag = true;
	while(n<max && flag) {
		var flag = ws.write('0');
		n++;
	}
}

write(); // 第一次写

ws.on('drain', function() {
	console.log('drain');
	write();
});
