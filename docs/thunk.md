<!--
 * @Author: cc
 * @LastEditTime: 2020-11-11 14:02:28
-->
# Thunk

## 概述

`"传值调用"`与`"传名调用"`的争论，函数的参数到底何时求值，但是传值调用容易造成性能损失

```javaScript
    var x = 1
    function add(x){
      return x * 4
    }
    add(x+5)
    // 传值调用等同于
    add(6)
    // 传名调用就是传入(x+5)等需要时调用
```

将参数放入到一个临时函数当中，再将这个临时函数传入函数体，这个临时函数就叫做Thunk，这是`传名调用`的一种策略

```javaScript
  function bar (a, b, fn) {
    setTimeout(() => {
      fn(a, b)
    }, 3000)
  }
  // 临时的Thunk函数
  function thunk (cb) {
    bar(1, 2, cb)
  }
  thunk((arg) => {
    console.log(arg)
  })
```

## Thunkify

我们不会给每个函数都写一个自己的thunk函数,再在这个函数中调用原函数，所以需要封装`Thunkify`函数来完成这项工作

```javaScript
 function bar (a, b, fn) {
    console.log(a, b, fn)
    setTimeout(() => {
      fn(a + b)
    }, 3000)
  }

  function thunkify (fn) {
    return function () {
      const args = [...arguments]
      return function (cb) {
        args.push(cb)
        fn(...args)
      }
    }
  }
  const barThunk = thunkify(bar)

  let barTunk = barThunk(1, 2)
  barTunk((sum) => { console.log(sum) })
```



