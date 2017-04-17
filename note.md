# 2017-4-11
sublime快捷键：
删除当前行：ctrl + shift + k
移动下一行：ctrl + enter
移动括号首尾： ctrl + m

## 一、一个普通哦网站访问的过程
 - 浏览器向服务器发出一个http请求
 - 先把域名解析为ip（chrome缓存1分钟（chrome://net-internals/#dns）） -> 搜索操作系统缓存 -> 读取本地host文件 -> 发起DNS系统调用 -> 运营商DNS缓存 -> 找根域 -> com域
 - 客户端通过随机端口向服务器发起TCP三次握手，建立了TCP连接
 - 连接简历后浏览器就可以发送HTTP请求了
 - 服务器接受到HTTP请求，解析请求的路径和参数，经过后台的一些处理，生成完整响应页面

 - 客户端（浏览器）接收到http响应，从请求中得到的http响应体里是html代码，于是对html代码开始解析
 - 解析过程中遇到引用的服务器上的资源（额外的css js代码，图片、音视频、附件等）。再向服务器发送请求
 - 浏览器解析html，用得到的css外观渲染，js也可能对外观处理
 - 当用户与页面交互，js对此反应，添加特效和动画
 - 交互过程中可能需要向服务器索取或提交额外的数据，局部刷新，一般不是跳转就是通过js向服务器发ajax
 - 服务器再把客户端需要的资源返回，客户端用得到的资源来实现动态效果或修改dom结构

## 二、创建服务器之http模块
 - http.createServer()

# 2017-4-12

## 一、node操作http内容

### 获取请求中的数据
 - `req.method` // 请求方法
 - `req.url` // 请求url
 - `req.headers` // 请求头

### 设置响应头
 - `setHeader('Content-Type', 'text/html;charset=utf-8')`
 - `res.statusCode = 404;`
 - `writeHead(200, { 'Content-Type': mime.lookup('.html') + ';charset=utf-8' })`

### 返回响应体
 - `res.write(data);`
 - `res.end(data);` //响应体必须是字符创或者buffer

### 返回静态文件
 - `mime.lookup('xx.html.mp3')` //设置对应响应头
 - `fs.readFile()` //把读到的data返回

### req.url 和 url核心模块
 - `url.parse`
 - `url.parse().pathname` --> '/apple'，问号和端口号中间的部分
 - `url.parse(req.url, true).query` --> 查询字符串

## 二、http知识：

### 请求方法
 - get
 - post
 - delete
 - head
 - put
 -options

### 报文
#### 请求报文
 - 起始行
 	1. url
 	2. HTTP/1.1
 - 请求头
 	1. 通用头
 	2. 请求头
 	3. 实体头
 	4. 扩展头
 - 请求体
	发送的数据
#### 响应报文
 - 起始行
 	1. HTTP/1.1 版本 状态码 状态短语
 - 响应头
 	1. 通用头
 	2. 响应头
 	3. 实体头
 	4. 扩展头
 - 响应体
 	响应的数据

## 三、ajax

### ajax四部曲
	1. `var xhr = new XMLHttpRequest()`
	2. `xhr.open(method, url, true, username, passwd)`
	3. `xhr.onreadystatechange = function(){}`
	4. `xhr.send()`

### readyState的四种状态
 0. 对象建立则0
 1. open则1
 2. send则2
 3. 数据传送中
 4. 数据已接收

### 服务端响应
 - status
 - statusText
 - responesText

### xhr对象的属性

 - onreadystatechange
 - respones // 取决于responseType
 - responesType
	1. ""/text --> response和responseText为字符串
	2. json --> response和responseXML为JSON对象
 - responseText // 必须把responesType设置为""或者text，才能读取这个属性
 - status // 比如 200
 - statusText // 比如 Not Found
 - setRequestHeader 可重复调用以叠加
    这些都不给开发者设置，只有Content-Type、accept、自定义头等可设置
    Accept-Charset
    Accept-Encoding
    Access-Control-Request-Headers
    Access-Control-Request-Method
    Connection
    Content-Length
    Cookie
    Cookie2
    Date
    DNT
    Expect
    Host
    Keep-Alive
    Origin
    Referer
    TE
    Trailer
    Transfer-Encoding
    Upgrade
    User-Agent
    Via

## 四、请求体和返回体的处理（post请求）
 - `req.on('data', function(data) {}); // data默认是buffer，需要toString`
 - `req.on('end', callback)`

# 2017-4.13

## form知识补
 - form同步提交：  
  `<form method="post" enctype="multipart/form-data"></form>`  
  表单提交时用`<input type="submit" value="提交">`，页面会刷新，且enctype会在请求headers里有所反应  
    1. enctype第一种：apolication/x-www-form-urlencoded
    2. enctype第二种：multipart/form-data
    3. enctype第三种：text/plain
 - form的ajax提交不想用input提交也可以写`<button></button>`，但是需要手动写ajax请求，就涉及到写对请求体和与请求体对应的请求头（详见/node/8.ajax/formPost.html）  
    1. 发送json字符串
    2. 发送formdata格式化表单数据
 - 上传文件用<input type="file" name="avatar">

## 表单ajax提交的数据有三种格式(非input:submit方式刷新页面提交)
 - form表单序列化的字符串
	1. 请求体格式："name=zs&age=6"
	2. 对应请求头：application/x-www-from-urlencoded
 - json字符串 
	1. 请求体格式："{ "name": "zs", "age": 6 }"
	2. 对应的请求头：application/json
 - formData(H5新增)

## 提交图片的正确姿势

 - 浏览器端：千万不要指定head --> `xhr.setRequestHeader('Content-Type', 'multipart/form-data');`

```javascript
var formData = new FormData();// formData是键值对的对象
```

 - 服务端：

```javascript
var form = new formidable.IncomingForm();\
form.parse(req, function(err, fields, files) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('received upload:\n\n');
	// inspect是把对象转成字符串
	console.log(util.inspect({ fields: fields, files: files }));
	res.end(util.inspect({ fields: fields, files: files }));
});
```

## querystring核心模块：对序列化进行obj化
 `querystring.parse()`

## node取请求头
 `req.headers['content-type']`

## 静态服务器

```javascript
fs.exists('.' + urlObj.pathname, function(exists) {
	if (exists) {
		res.setHeader('Content-Type', mime.lookup(urlObj.pathname));
		fs.readFile('.' + urlObj.pathname, function(err, data) {
			res.end(data);
		});
	} else {
		res.statusCode = 404;
		res.end('404');
	}
	
});
```

# 2017-4-14

想法：只要写markdown，然后git上传，就可生成页面和对应地址，并且自动改变博客的目录


# 2017-4-15

## curl -v http://localhost:8080

## http服务器复习

### http.createServer(requestListener(req, res));

 - req是可读流 req.on
 - res是可写流 res.end

### http.IncomingMessage 客户端请求对象，包含以下方法：

 1. method 属于General
 2. url 属于General
 3. headers 属于请求头
 4. httpVersion 

### 常用请求头信息

 - host 请求的服务器主机（http1.1必须包含主机头，否则返回404）例如`www.baidu.com`
 - connection 连接选项 例如`keep-alive`
 - accept 客户端能处理的内容类型和优先级 q=表示权重，用分号;分隔，范围是0-1，不指定默认为1 例如`text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8`
 - accept-encoding 客户端支持的内容编码及其优先级 例如 `gzip, deflate, sdch, br`
 - accept-language 客户端能处理的语言及其优先级 例如 `zh-CN,zh;q=0.8`
 - user-agent 用户代理 是指浏览器，它的信息包括硬件平台、系统软件、应用软件和用户个人偏好 例如 `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36`

### 服务端获取请求信息：把原始url转成对象 `var urlObj = url.parse('req.url');`
 - href 被转换的原url字符串
 - protocal 请求协议
 - slashes 在协议与路径中间是否使用//分隔符
 - host url字符串中完整的地址及端口号，可能为IP也能为主机名
 - auth 认证部分
 - hostname 主机名或IP
 - port 端口号
 - pathname 路径不包含查询字符串
 - query 查询字符串（parse第二个参数为true则是对象，否则字符串）

### 服务端把查询字符串转为对象

```javascript
var queryObj = queryString.parse(str, [sep], [eq], [options]);
var queryStr = querytString.stringify(obj, [sep], [eq]);
```
 - str 
 - sep 分割字符，默认为&
 - eq 分配字符，默认为=
 - options 为对象参数，可以指定maxKeys属性 指写转换后的属性个数，0为不限定

### http.serverResponse 代表服务器响应对象

```javascript
res.writeHead(statusCode, [reasonPhrase], [headers]);
```

 - `statusCode` 状态码
 - `reasonPhrase` 状态码描述信息
 - `headers` 响应头对象
 	- `content-type` 内容类型
 	- `location` 重定向的url地址
 	- `content-disposition` 下载的文件名
 	- `content-length` 响应体字节数
 	- `set-cookie` 
 	- `content-encoding` 编码
 	- `Cache-Control` 缓存
 	- `Expires` 指定缓存过期时间
 	- `Etag` 服务器响应内容没有变化时不重新下载数据
 	- `connection` 默认是keep-alive保持连接，想断开连接用close

### 设置响应头
 
 - setHeader 单独设置响应头
 ```javascript
 res.setHeader(name, value);
 ```
 - 如果多个可以写数组
 ```javascript
 res.setHeader('Set-Cookie', ['name=zs', 'age=6']);
 ```

### 其他响应设置

 - `getHeader` 获取响应头
 - `removeHeader` 移除响应头
 - `headerSent` 响应头是否已经发送
 - `sendDate` 是否发送响应时间
 - `statusCode` 设置响应码

## node客户端

### http.request 发送请求

```javascript
var options = {
    host: 'localhost',
    port: 8080,
    path: '/post',
    method: 'POST', 
    //headers: {'Content-Type': 'application/json'}
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    headers: {'Content-Type': 'application/zs'}
}

var request = http.request(options, function(res) {
    var result = '';
    res.on('data', function(data) {
        result += data;
    })
    res.on('end', function() {
        var users = JSON.parse(result)
        console.log(users);
    })
})
```

### request.write 发送的数据，可多次调用

```javascript
request.write(chunk, [encoding]); // 数据要么是序列化字符串要么是json字符串
```

 - chunk 要发送的数据，可以是buffer或者字符串
 - encoding 编码，不指定时默认utf8，发送的东西如果是图片，就不能是utf8

### request.end 结束请求

```javascript
request.end(chunk, [encoding]);
```

### 拓展思考
把请求体里的数据保存到文件中去
    - req 可读流：ondata onend pipe
    - res 可读可写流：ondata onend pipe write end

# 2017-4-16

## 跨域资源共享
 - XHR2中浏览器选择允许发送合适的CORS(cross-origin resource sharing，跨域资源共享)
 - 在标准浏览器中依旧使用XMLHttpRequest对象
 
## 设置响应头
 - 当浏览器使用跨域资源共享时，服务器都必须在响应头中设置`Access-Control-Allow-Origin` 
 `res.writeHead(200,{"Access-Control-Allow-Origin": "*"})`    
 - 其中*代码允许任何源请求本服务器，也可以改成固定源。例如：`{"Access-Control-Allow-Origin": "http://localhost:8080"}`

未完待续

# 2017-4-17

## 一、express基本使用 
 1. express 安装和基本使用
 2. app.get app.post app.all
 3. 路由 req res res.send

## 二、中间件
 1. 中间件用法： 路由 next
 2. 自定义res上的属性：计算一个请求花了多少时间，美化res.end方法 console.time('cose'); console.timeEnd('cost');

## 三、获取请求参数
 1. req.hostname 返回请求头的取的主机名（不包含端口号） 127.0.0.1
 2. req.path 返回请求的url的路径名 /user/zs/6
 3. req.query 查询字符串转为对象，默认{} { name: 'zs', age: '6' }
 4. req.params 路径参数对象 { id: '1', num: '6' }
 5. req.body 请求体

## 四、send
send方法想浏览器发送响应，并可以智能处理不同类型的数据。并输出响应时会自动进行一些设置，比如header信息、http缓存支持等
 1. String 返回的Content-Type默认为"text/html"
 2. Array/Object 返回JSON
 3. 不能使用数字，若要返回状态码需要用res.sendStatus方法

## 五、模板
 1. 模板原理
    ```javascript
    function render(tmpl, data) {
        tmpl.replace(/\{\{(\w+)\}\}/, function(input, group1, index, whole) {
            console.log(arguments);
            return data[group1];
        });
    }

    var result = render('<h1>{{title}}</h1>', {title: '曰..曰'});
    ```
 2. 指定渲染模板引擎
    ```javascript
    app.set('view engine', 'ejs');
    ```
 3. 指定模板所在目录
    ```javascript
    app.set('views', path.resolve('dirname'));
    ```
 4. res.render()
    ```javascript
    res.render('index.ejs', {title: 'home'});
    ```
 5. ejs
    ```ejs
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
    <%= title %>
    <% for (var i = 0; i < 10; i++) { %>
        <h1><%= i %></h1>
    <% } %>
    <% if (true) { %>
        <%= 'if' %>
    <% } %>
    </body>
    </html>
    ```
## 六、静态文件服务中间件
 1. 写法
    ```javascript
    app.use(express.static(path.resolve('public')));// 把public作为静态文件根目录
    ```
 2. 大致原理，这里没有处理响应头
    ```javascript
    app.use(function(req, res, next) {
        fs.createReadStream(__dirname + '/public' + req.url).pipe(res);
    });
    ```

## 七、post方法
 1. bodyParser模块：接受请求体内容，并解析
    ```javascript
    // 请求content-type为application/x-www-form-urlencoded，则用此中间件把请求体放到req.body中，否则不放
    app.use(bodyParser.urlencoded({extended: true})); // extended为true时，用querystring转为对象，为false，会用自己的转换方法
    // 请求content-type为application/json，则用此中间件把请求体放到req.body中，否则不放
    app.use(bodyParser.json());
    ```
 2. `req.body`
 3. `app.post()`


# js复习
## 对象是属性的集合
 1. js中对象可以任意的扩展属性
 2. 函数和数组也可以定义属性

## 函数和对象的关系
 1. 判断变量类型的几种方法
    - instanceof 原型链判断
    - typeof 基本类型和function
    - toString.call() 
    - !!fn.bind
    - constructor
 2. 函数是对象的一种: `fn instanceof Object`
 3. 对象都是通过函数创建的 `typeof Object`

## prototype
 1. 每个函数都有一个属性叫做prototype，创建即送，买一送一
 2. prototype，prototype是个对象，通过__proto__指向Object的prototype，其中有自己的属性和方法
    - constructor
    - hasOwnProperty
    - isPrototypeOf
    - proertyIsEnumerable
    - tolocaleString
    - toString
    - valueOf
 3. **每个对象都有一个__proto__，可称为隐式原型，proto指向创建该对象的函数的prototype**
    `fn.__proto__`  ->  `Function.prototype`
                        `Function.prototype.__proto__`  ->  `Object.prototype`
                                        `obj.__proto__` ->  `Object.prototype` 
                                                            `Object.prototype.__proto__` -> `null`
    - Object.prototype是个特例，它的__proto__指向的是null
 4. 总结规则：看它是谁new出来的，指向new它的人的prototype

## instanceof
 1. instanceof运算符的第一个变量是一个对象，暂时称为A，第二个变量一般是一个函数，暂未B
 2. 判断规则：沿着A的__proto__找，若找到B.prototype，则返回true
 3. 左侧是对象实例，右侧是构造函数，不能是null

## 继承和原型链
 1. js中继承是通过原型链来体现的
 2. 访问一个对象的属性时，现在自身属性中找，没有。再沿着__proto__这条链向上找，这就是原型链
 3. hasOwnProperty区分一个属性是自己的，还是从原型中继承的
 
## 执行上下文
 1. 执行全局代码时，会产生一个全局执行上下文环境，每次调用函数都又会产生函数执行上下文环境
 2. 当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。
 3. 其实是一个压栈出栈过程——执行上下文环境。解释：压栈就是进入函数上下文，出栈就是函数调用完成
 4. 执行上下文对象组成：
    - **变量对象**( Variable Object, VO )
        - var 
        - function 
        - arguments
    - **作用域链**( Scope chain ) 
        1.在作用域链中取值的变量叫做**自由变量** 
        2.作用域链在函数定义的时候决定
    - **this** this在函数执行时决定
        1. 全局&调用普通函数 -> window
        2. 函数作为对象的一个属性 -> 执行主体
        3. 实例 -> 构造函数
        4. prototype -> 构造函数
        5. call apply bind -> 
    - **系统预置变量**，可以直接通过window过global调用

## 作用域
在定义时确定，自由变量从哪个作用域中取值在定义时决定
 - javascript除了全局作用域外，只有函数可以创建作用域
 - 作用域有上下级的关系，上下级关系的确定就看函数是在哪个作用域下创建的
 - 作用域最大的用处就是**隔离变量**，不同作用域下同名变量不会有冲突
 - 作用域类似一个地盘，其中没有变量，要通过作用域对应的执行上下文环境来获取变量的值
 - 同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值
    - 不同的执行环境可同时存在，比如闭包使得某个作用域没有被销毁
 - 如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值
 - 取自由变量的值时要到创建fn函数的那个作用域中取，找不到要上创建此作用域的作用域中找，一直向上找到全局作用域
 - ES5中没有块级作用域

## 作用域和执行上下文
 - 除了全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了。**写代码的时候就有了**
 - 上下文环境是在函数调用时创建的无法直接访问的抽象对象 **代码执行的时候才有**
 - 只有函数才能创建作用域 
 - 一个作用域下可能包含若干个上下文环境，有可能从来没有过上下文环境（函数从来没有被调用过）；有可能有过，现在函数被调用完毕后，上下文环境销毁了；有可能同时存在一个或多个（闭包）
 - 问题：作用域链在什么时候生成？

## 闭包
 - 函数作为返回值
 - 函数作为参数传递
 - 指一个函数（return的function）与一个引用环境(one执行时的上下文环境)**绑定**在一起，这个引用环境是一个存储该函数的非局部变量（或者说自由变量）的表（Value Object）
 - 解释上述意思即：闭包有两个条件，他是js的特性，只要满足以下两个条件就会产生闭包
    1. 一个函数被引用了（return function和one绑定在一起）
    2. 这个函数中的自由变量 在 创建此函数的函数的作用域中被找到。或者说被保存到了这个函数被引用的环境中（return function中的自由变量 被存储在one中）
 ```javascript
 function one() {
    var a = Math.random();
    return function() {
        return a;
    }
 }
 var s = one();
 s()
 ```
 - 解释上述代码：
    1. 全局下声明函数one
    2. one执行，产生一个one作用域的上下文执行环境，即产生了Variable Object包括var的a和return的function，在声明变量对象的变量时，便意味着return function的作用域已经生成。
    3. 当return function时，这个function被引用了。此时闭包阻止了one执行上下文的销毁
    4. 执行s方法，return的function的自由变量a通过作用域链找到one执行上下文的变量对象中的a。


