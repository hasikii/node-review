var querystring = require('querystring');
var s = 'name=zs&age=6';

console.log(querystring.stringify(querystring.parse(s)));