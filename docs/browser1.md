<!--
 * @Author: cc
 * @LastEditTime: 2021-05-22 15:12:44
-->

浏览器资源加载机制

+  特定资源加载器：针对每种资源类型的特定加载器，仅加载某一种资源。对应设计模式中的单例模式

+ 缓存资源加载器：与常规的缓存逻辑相同，特定加载器先通过缓存资源加载器来查找是否有缓存资源。如果在资源缓存池中存在缓存资源，则取出以便使用，若不存在，发送请求给网络模块

+ 通用资源加载器：由于加载资源大多属于网络请求，而网络请求的逻辑可以被特定资源加载器所共享，所以通用资源加载器只负责通过网络获得目标资源的数据，但不负责进一步解析


资源缓存
  
+ Page Cache:页面缓存

+ Memory Cache:内存缓存

+ Dish Cache:磁盘缓存

预先加载

+  DNS预取

域名预解析是浏览器视图在用户访问链接之前解析域名，这是计算机的正常的dns解析机制

```javaScript
<meta charset="UTF-8"> 
// off就是禁止隐式的DNS prefetch
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="//www.zhix.net">
```

1、用meta信息来告知浏览器, 当前页面要做DNS预解析:<meta http-equiv="x-dns-prefetch-control" content="on" />

2、在页面header中使用link标签来强制对DNS预解析: <link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />

<br/>

网络如何提高页面加载速度

`DNS预获取`

`1.合并请求：nginx模块，sprite雪碧图`

`2.缓存：from cache(memory disk),localstorage，本地缓存策略，Http头（结合业务）`

`3.tcp网络连接优化：tcp调优，HTTP/2,Keep-alive`

`4.硬件：加大宽带，使用cdn（对象存储）`

`5.资源大小：gzip,webp，image压缩，cookie体积`

`6.预加载：多个cdn域名，dns预获取，异步读取js`

<br/>

memoryCache和DishCahe的区别

`memory cache一般存储脚本、字体、图片，disk cache一般存储css等`

