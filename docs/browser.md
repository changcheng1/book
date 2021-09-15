<!--
 * @Author: cc
 * @LastEditTime: 2021-09-09 13:38:19
-->
浏览器

透视Http协议

浏览器是方便一般互联网用户通过界面解析和发送Http协议的软件
<br/>
用户代理

```javaScript
  navigator.userAgent
  // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36
```
<br/>

用户代理的作用

1. `判断浏览器类型，采用兼容方案`

2. `判断是否是移动端`

3. `标识H5容器`

4. `要注意userAgent非常容易伪造`

<br/>

浏览器内核定义

可以认为浏览器中负责将表示的页面的字符串变成可视化的图像的模块就是浏览器内核

远程主机响应

请求报文格式

1. `起始行[方法][空格][请求url][空格][HTTP版本][换行符]`

2. `首部[首部名称][:][可选空格][首部内容][换行符]`

3. `首部结束:[换行符]`

4. `实体`

```javaScript
POST /search HTTP/1.1  
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, application/x-silverlight, application/x-shockwave-flash, */*  
Referer: <a href="http://www.google.cn/">http://www.google.cn/</a>  
Accept-Language: zh-cn  
Accept-Encoding: gzip, deflate  
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; TheWorld)  
Host: <a href="http://www.google.cn">www.google.cn</a>  
Connection: Keep-Alive  
Cookie: PREF=ID=80a06da87be9ae3c:U=f7167333e2c3b714:NW=1:TM=1261551909:LM=1261551917:S=ybYcq2wpfefs4V9g; NID=31=ojj8d-IygaEtSxLgaJmqSjVhCspkviJrB6omjamNrSm8lZhKy_yMfO2M4QMRKcH1g0iQv9u-2hfBW7bUFwVh7pGaRUb0RnHcJU37y-FxlRugatx63JLv7CWMD6UB_O_r  

hl=zh-CN&source=hp&q=domety
```
<br/>

相应格式报文

1. `起始行[HTTP版本][空格][状态码][空格][原因短语][换行符]`

2. `首部[首部名称][:][可选空格][首部内容][换行符]`

3. `首部结束:[换行符]`

4. `实体`

5. `换行符/r/n`

```javaScript
// 起始行
HTTP/1.1 200 OK
// 服务器发送时间
Date: Sat, 31 Dec 2005 23:59:59 GMT
// 服务器
Server:Apache
// 网页最后修改时间
last-modified: Sun, 17 May 2018 03:00:00 GMT
// 强验证码，用于缓存策略
Etag:"700abf*********"
// 范围请求
Accept-Ranges:bytes
// 实体长度
Content-Length: 122
// 关闭连接
Connection:close
// 实体类型
Content-Type: text/html;charset=ISO-8859-1
// 实体内容
＜html＞
＜head＞
＜title＞Wrox Homepage＜/title＞
＜/head＞
＜body＞
＜!-- body goes here --＞
＜/body＞
＜/html＞
// 最后/r/n
```

返回的响应报文如何解析？

`Buffer.toString()`

<br/>

网页内容组成

doctype:`提供浏览器html版本信息`

head:`html头部`

+ meta:元数据信息
  
  + charset:`此特性声明当前文档所使用的的字符编码`

  + http-equiv:`客户端行为、如渲染模式，缓存等`

  + name[keywords]:`搜索引擎使用`

  + name[description]:`搜索引擎使用`

  + name[viewPort]:`浏览器视窗使用`

link:`css样式引用地址`

script:`body加载前完成加载或运行的脚本`

body:`html实体`

script:`需要在body解析式运行的脚本`

<br/>

浏览器重要组件

+ HTML解释器：`解释到HTML文本的解释器，HTML文本->DOM树`

+ CSS解释器：`遇到级联样式时，需使用级联样式表解释器。为DOM对象计算出样式信息`

+ JavaScript引擎：`遇到js代码时，需要使用JavaScript解释器，并使得js代码有调用DOM接口和CSSDOM接口的能力`

+ 布局：`结合css，计算出每个DOM对象的大小位置信息`

+ 绘图：`将经过计算的DOM节点绘制成图像`

1.浏览器如何解析外链资源

+ 不同的外链资源,webkit有不同的资源加载器，当浏览器解析到url的时候，调用特定的资源加载器，如果不是特殊资源，加载过程不会阻碍渲染过程

2.css头部,js底部为什么

+ 一般来说css不会阻塞渲染过程，js脚本在旧版放在头部，渲染会暂停，造成白屏，现在浏览器会开一个新线程进行渲染

3.浏览器在渲染之前和之后会做什么

+ 渲染之前加载资源，chrome浏览器会进行资源预扫描，渲染之后在dom和css变化之后，重新进行计算和布局

4.PC端浏览器和移动端浏览器有什么不同

+ 功能基本相同，但运行的操作系统不同，渲染机制有差异

<br/>

webkit内核

![avatar](/images/webkit.png)

<br/>





