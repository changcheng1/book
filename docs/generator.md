<!--
 * @Author: cc
 * @LastEditTime: 2020-12-18 16:42:34
-->
<!--
 * @Author: your name
 * @Date: 2020-03-11 10:51:58
 * @LastEditTime: 2020-12-05 12:12:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/iterator.md
 -->
### 迭代器(Iterable)

#### 概述

 1. 迭代之前需要实现知道如何使用数据结构,不适用于所有的数据结构
 2. 遍历顺序并不是数据结构固有的，不适用于具有隐式顺序的数据结构
 3. 可迭代数据类型`字符串`，`数组`，`映射`，`集合`，`arguments对象`，`NodeList对象`
 4. 实际编写,不需要显式使用`Iterator`，因为`for-of循环`,`数组解构`,`扩展运算符`,`Array.from`,`map/set`，`map`方法等都可以接受的可迭代对象
 5. 迭代器的原理其实是调用Symbol.iterator方法，返回一个可迭代的对象
 
```javaScript
 // it此时为一个迭代器(iterator)
  let arr = [1, 2, 3, 4]
  let it = arr[Symbol.iterator]()
  let current = it.next()
  while (!current.done) {
    console.log(current.value)
    current = it.next()
  }
```
NodeList对象也支持迭代器遍历

```javaScript
    let a = document.getElementsByTagName('div')
    let current = [...a]
```
类数组对象：给对象增加Symbol.iterator方法，因为对象默认不可以遍历，所以借用Array原型链的方法

```javaScript
  let c = {
    0: 'a',
    1: 'c',
    length: 2,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  }

  for (let i of c) {
    console.log(i)  // a c
  }
```
覆盖原生的iterator的行为

- `任意对象的Symbol.iterator的方法，等于该对象的遍历器的生成函数，调用该函数会返回该对象的一个遍历器对象`

- 这里使用new String因为要用引用类型，而不能使用原始类 let str = '123',因为一个是引用类型，一个是原始类型，原始类型存在内存栈当中，引用类型存在内存堆当中

重写生成器

```javaScript
  let str = new String('123')
  console.log([...str])
  str[Symbol.iterator] = function () {
    return {
      next: function () {
        if (this.first) {
          this.first = false
          return {
            value: 'bye',
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      },
      first: true
    }
  }
  console.log([...str]) // bye
```
使对象支持生成器

```javaScript

  let obj = {}
  
  obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  }

  console.log([...obj])  // [1,2,3]

```

Iterator的实现

```javaScript
  function Iterator (arr) {
  let a = 0;
  return {
    next () {
      let result = a < arr.length ? {
        value: arr[a++],
        done: false
      } : {
          value: undefined,
          done: true
        }
      return result
    }
  }
}
let a = Iterator([1, 2, 3, 4])

console.log(a.next().value)  // 1
console.log(a.next().value)  // 2
console.log(a.next().value)  // 3
console.log(a.next().value)  // 4
```

自定义迭代器

```javaScript
   // 通过闭包返回迭代器
  class Counter {
  constructor(limit) {
    this.limit = limit
  }
  [Symbol.iterator] () {
    let count = 1,
      limit = this.limit;
    return {
      next () {
        if (count <= limit) {
          return {
            value: count++,
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}

let counter = new Counter(4)

for (let i of counter) { 
  console.log(i)  // 1 2 3 4
}
```

迭代器终止可以记录状态继续执行

```javaScript

let arr = [1, 2, 3]

let iterator = arr[Symbol.iterator]()

for (let i of iterator) {
  console.log(i)  // 1
  if (i > 1) {
    break
  }
}
for (let i of iterator) {
  console.log(i)  //2 ,3
}
```

### 生成器(generator)

`yield表达式`

1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式，作为返回对象的值

2. 下一次调用next方法，再继续往下执行，直到遇到下一个yield表达式。

3. 如果没有遇到新的yield表达式就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式，作为返回对象的value属性值

4. 如果该函数没有return语句，则返回的对象的value属性值为undefined


- 生成器函数执行后，返回一个遍历器对象，该对象也具有`Symbol.iterator`属性，执行后返回自身

```javaScript
    function* gen () { }

    let g = gen()

    console.log(g[Symbol.iterator]() === g)  //true

```

```javaScript
   // 生成器
   function* generatorFn(){
     console.log(123)
     yield '123'
   }
   let result = generatorFn() // 迭代器
   result.next()   // 这里输出123 同时执行迭代器

   // 产生可迭代对象
  function* Iterato () {
    yield* [1, 2, 3]
    yield* [4, 5, 6]
  }
  let a = Iterato()
  for (let i of a) {
    console.log(i)  // 1,2,3,4,5,6
  }


  // 最有用的递归操作
  function* Times (n) {
    if (n > 0) {
      yield* Times(n - 1)
      yield n - 1
    }
  }

  for (let i of Times(5)) {
    console.log(i)  // 0 1 2 3 4
  }


  // 提前终止生成器
  function* generatorFn () {
    yield '1';
    yield '2';
    yield '3';
  }
  let f = generatorFn()

  console.log(f.next())  // {value:1,done:false}
  console.log(f.return(4))  //  {value:4,done:true}
```
`Generator.prototype.throw()`

throw()方法可以在生成器内部中捕获，也可以在生成器外部捕获，如果内部外部都无try/catch方法则报错

throw()方法抛出的错误要被内部捕获，前提是要执行一次next方法

`执行throw()方法会附带执行下一条yield表达式`

一旦Generator执行过程中抛出错误，且没有内部捕获，Generator就会进入执行完毕的状态

```javaScript
    function* generFn(){
      try {
        yield 123
      } catch (error) {
        console.log('内部捕获',error)  // 内部捕获 a
      }
    }
    let a = generFn()
    a.next()
    a.throw('a') 

```
`Generator.return()`

return()方法可以携带参数，一旦执行生成器进入执行完毕的状态

`yield* 表达式`

在当前的生成器当中执行另一个生成器，类似于解构

```javaScript
  function* foo(){
    yield 1;
    yield 2;
  }

  function* boo(){
    yield 0;
    yield* foo()
  }

  for(let i of boo()){
    console.log(i)  // 0 1 2
  }
```

任何数据只要有Iterator接口就可以被yield* 遍历

```javaScript
  function* foo(){
    yield* [1,2,3]
  }
  for(let i of foo()){
    console.log(i)  // 1 2 3
  }
```
yield* 版本的数组扁平化

```javaScript
  function *foo(array){
    if(Array.isArray(array)){
    for(let i=0;i<array.length;i++){
      let item = array[i]
        if(Array.isArray(item)){
          yield* foo(item)
        }else{
          yield item
        }
    }
    }
  }
  let a = foo([1,[2,3],[4,5,6,7,8]])
  console.log([...a])  // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

生成器实现斐波那锲数列

```javaScript
  function* fibonacci(){
    let [prev,cur] = [0,1]
    for(;;){
      yield cur;
      [prev,cur] = [cur,prev+cur]
    }
  }

  for(let i of fibonacci()){
      if(i > 500) break;
       console.log(i)
  }
```