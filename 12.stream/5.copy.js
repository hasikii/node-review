// pipe 方法
// 流，尤其是pipi()方法的初衷，是将数据的滞留量限制到一个可接受的水平。以使得不同速度的来源和目标不会淹没可用内存、
// readStream.pipe(writeStream, [options]);
// 	- readStream 可读流对象
// 	- writeStream 可写流对象

var fs = require('fs');
var rs = fs.createReadStream('./1.png');
var ws = fs.createWriteStream('./2.png');

rs.pipe(ws);

// fs.createReadStream('./1.png').pipe(response)

