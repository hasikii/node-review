// 流是一组有序的，有起点和终点的字节数据传输手段
// 不关心文件的整体内容，只关注是否从文件中读到了数据，以及读到数据之后的处理
// 流是一个抽象接口，被Node中的很多对象所实现。比如对一个HTTP服务器的请求对象request就是一个流，stdout也是一个流

// stream.Readable可读流
// 使用实现了stream.Readable接口的对象来将对象数据读取为流数据，在你表明你准备好接受之前，Readable流并不会开始发射数据

// ReadStream文件可读流
// fs.createReadStream(path, [options]);
// path 读取的文件路径
// options
//  - flags 对文件采取何种操作，默认为'r'
//  - encoding 指定编码，默认为null
//  - autoClose 读完数据后是否关闭文件描述符
//  - start 用整数表示文件开始读取的字节数的索引位置
//  - end 用整数表示文件结束读取的字节数的索引位置（包括end位置）
//  - highWaterMark 最高水位线，停止从底层资源读取前内部缓冲区最多能存放的字节数。缺省为64kb


// writeable.write(chunk, [encoding], [callback]);
// 参数
// 	- chunk要写入的数据，buffer或字符串对象，必须指定
// 	- encoding写入编码，chunk为字符串时有用，可选
// 	- callback 回调
// 返回布尔值，系统缓存区定满时为false，未满时为true

// end 方法
// 写入文件时，当不再需要写入数据时可调用该方法关闭文件。迫使系统缓存区的数据立即写入文件中
// writeable.end(chunk. [encoding], [callback]);



var fs = require('fs');

/**
 * 640k
 * 1. 先从文件中读取64k，然后发射rs.emit('data')
 * 2. 再从文件中读取64k，再发射rs.emit('data')
 * 3. ... 直到发送完640k
 */
var rs = fs.createReadStream('./1.txt', {
	flags: 'r',
	encoding: 'utf8', // 得到的数据是buffer对象，如果指定编码，那么是字符串类型的 rs.setEncoding('utf8');
	start: 3, // 读取的字节索引的开始位置 闭合
	end: 5, // 读取的字节索引的开始位置 闭合
	highWaterMark: 1, // 最高水位线，停止从底层资源读取前
});
// 流是EventEmitter的子类
// 1. data事件
rs.on('data', function(data) {
	console.log(data);
});
// 2. end事件
rs.on('end', function() {
	console.log('读完了');
});
// 3. error事件
rs.on('error', function(err) {
	console.log('出错了', err);
});

// 可读流的方法
// 1. setEncoding 指定编码
// 2. pause 通知对象停止触发data事件
// 3. resume 通知对象恢复触发data事件
// 4. pipe 设置管道，将可读流里的内容导入到参数指定的可写流里