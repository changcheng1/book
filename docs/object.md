<!--
 * @Author: cc
 * @LastEditTime: 2020-12-10 11:27:43
-->
## 对象

`object.defineProperty`：设置对象的数据属性和访问器属性，隐式的给对象添加属性

##### 数据属性

`configurable`:默认false，属性不可以被删除

`Enumerable`:默认false，属性不可以被遍历

`writable`:默认false，属性的值不可以被重写

`value`:默认undefined，属性的值

```javaScript
  var obj = {}
  Object.defineProperty(obj, 'a', {
    value: '3',
    configurable: false,
    enumerable: false,
    writable: false
  })
```

##### 访问器属性

`get()`：获取对象属性的值

`set()`：设置对象属性的值

```javaScript

  var obj = {
    _a: 123
  }
  Object.defineProperty(obj, 'a', {
    get () {
      return this._a
    },
    set (newVal) {
      this._a = newVal
    }
  })
  obj.a  // 123

```

`Object.defineProperties`：一个对象上添加设置多个属性

```javaScript
  let obj = {}
  Object.defineProperties(obj, {
    year: {
      value: 123
    },
    name: {
      get () {
        return '常成'
      }
    }
  })
  obj.year // 123
  obj.name // 常成
```

`Object.getOwnPropertyDescriPtor()`：获取指定属性的属性描述符

```javaScript
   let objDesc = Object.getOwnPropertyDescriptor(obj, 'year')
    { 
      value: 123,
      writable: false,
      enumerable: false,
      configurable: false
    }
```
`Object.getOwnPropertyDescriptions()`：返回指定对象全部的属性描述符

```javaScript
  let objDesc = Object.getOwnPropertyDescriptions(obj)
   { 
   year:{ 
     value: 123,
     writable: false,
     enumerable: false,
     configurable: false
   },
   name:{ 
     get: [Function: get],
     set: undefined,
     enumerable: false,
     configurable: false } 
  }
```
`Object.assign()`：对象的浅复制合并,接收一个对象或者多个对象

```javaScript
  let a = { name: 'a' }
  let b = { name: 'cc' }
  let result = Object.assign(a, b) // {name:'cc'}
  result === a // true
  result === b // false
```

`Object.is()`：对象的相等判定，解决NaN不相等以及+0，-0的问题

```javScript
   +0 == -0  //true
   Object.is(+0, -0) //false
   Object.is(NaN,NaN)  //true
```

`解构赋值`

```javaScript
  let { name: personName, age: personAage } = obj
  personName // cc
  personAage // 26
```
`Object.hasOwnProperty()`：方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）

```javaScript

  Object.hasOwnProperty('name') //true Object本身就有name属性

  function Create () { }
  Create.prototype.say = 'name'
  let a = new Create()
  a.name = 'cc'
  a.hasOwnProperty('name') // ture 实例a本身就有name属性
  a.hasOwnProperty('say') // false say方法是从原型链上获得，所以为false

  for (let i in a) {
    if (a.hasOwnProperty(i)) {
         console.log(i)   // 这里只打印name而不打印say
    }
  }
```
`Object.keys()`:方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

```javaScript

  function Create () { }
  Create.prototype.say = 'name'
  let a = new Create()
  a.name = 'cc'
  Object.keys(a) // ['name']

```

`Object.getOwnPropertyNames()`:方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组

```javaScript

  function Create () { }
  Create.prototype.say = 'name'
  let a = new Create()
  a.name = 'cc'
  console.log(Object.getOwnPropertyNames(Create.prototype)) // [ 'constructor', 'say' ]
```

`Object.getOwnPropertySymbols()`:方法返回一个给定对象自身的所有 Symbol 属性的数组。

```javaScript
    let a = Symbol('k1')
    let b = Symbol('k1')

    let obj = {
      [a]: 1,
      [b]: 2
    }
    console.log(Object.getOwnPropertySymbols(obj))  // [ Symbol(k1), Symbol(k1) ]
```
`Object.values()`:方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

`Object.entries()`:方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

```javaScript
    let obj = {
      a: 1,
      b: 2,
      c: 3
    }
    console.log(Object.keys(obj))  // [ 'a', 'b', 'c' ]
    console.log(Object.entries(obj)) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
```