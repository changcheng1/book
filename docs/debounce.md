<!--
 * @Author: changcheng
 * @LastEditTime: 2021-09-11 21:51:00
-->

函数防抖

1.短时间多次触发只执行一次(监听浏览器滚动之类的)

2. 缺点：如果事件在规定范围内不断被触发，则调用方法不断被延迟

```javaScript
input.addEventListener('keyup', debounce(handle,3000));
function handle(){
    console.log('触发防抖')
}
function debounce(fn,time){
  var timeOut = null;
  return  ()=>{
      clearTimeout(timeOut)
      timeOut = setTimeout(()=>{
        fn.apply(this,arguments)
      },time)
  }
}
```

函数节流

1.短时间大量触发同一事件，只执行一次(input输入查询)

```javaScript
    input.addEventListener('keyup', throttle(handle1,3000));
    function handle1(){
        console.log('触发节流函数')
    }
    function throttle(fn,time){
        let cancelFlag = true;
        return ()=>{
            if(!cancelFlag) return;
            cancelFlag = false
            setTimeout(()=>{
                fn();
                cancelFlag = true
            },time)
        }
    }
```

2. 时间戳版本

```javaScript
function trorrle(fn,waitTime){
    let previos = 0;
    return ()=>{
        let now = new Date();
        console.log(now-previos)
        console.log(waitTime)
        if(now - previos > waitTime){
            fn();
            previos = now;
        }
    }
 }
```