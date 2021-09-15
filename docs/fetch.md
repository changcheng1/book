<!--
 * @Author: changcheng
 * @LastEditTime: 2021-09-15 14:43:00
-->
<!--
 * @Author: changcheng
 * @LastEditTime: 2021-09-15 14:22:25
-->
ajax

open(method,url)：建立一个链接

setRequestHeader(key,value):设置请求头

onreadystatechange():readyState发生变化所调用的函数

```javaScript
  function ajax(obj) {
        let promise = new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest()
            xhr.open(obj.method, obj.url)
            xhr.setRequestHeader('Content-Type', obj.header || "application/x-www-form-urlencoded")
            xhr.onreadystatechange = () => {
                //Http完全被接收
                if (xhr.readyState == 4) {
                    // 状态码为4
                    if (xhr.status == 200) {
                        resolve(xhr.response)
                    } else {
                        reject(new Error(xhr.statusText))
                    }
                }
            }
            xhr.send(obj.data || {})
        })
        return promise
    }
    ajax({
        method: 'GET',
        url: 'data.json'
    }).then((data) => {
        console.log('data1', data)
    }, (err) => {
        console.log('errr', err)
    })
```
fetch(url,options)

```javaScript
    function postData(url, data) {
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
  .then(response => response.json()) // parses response to JSON
}
```
