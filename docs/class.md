<!--
 * @Author: cc
 * @LastEditTime: 2020-12-14 18:52:53
-->
## 类

new的实现原理

1.在内存当中创建一个新对象

2.这个新对象的内部的prototype被赋值为构造函数的prototype

3.构造函数内部的this被赋值为这个新对象

4.执行构造函数内部的代码，给新对象添加属性

5.如果构造函数返回非空对象，则返回该对象，否则返回刚创建的新对象

```javaScript
  function create (fn) {
    let proto = new Object()
    proto.__proto__ = Object.create(fn.prototype)
    fn.call(proto)
    return proto
  }
```

理解原型

```javaScript
  function Person(){}
  let peson1 = new Person()
  let person2 = new Person()
  Person.prototype.__proto__ === Object.prototype; // true 
  Person.prototype.__proto__.constructor === Object; // true 
  Person.prototype.__proto__.__proto__ === null; // true
  // 同一个构造函数生成的两个实例，共享一个原型对象
  person1.__proto__ === person2.__proto__; // true
  console.log(Person.prototype.__proto__)
  // { 
  //   constructor: f Object(), 
  //   toString: ... 
  //   hasOwnProperty: ... 
  //   isPrototypeOf: ... 
  //   ... 
  // }
```

`Object.prototype.isPrototypeOf()`:测试一个对象是否存在于另一个对象的原型链上

```javaScript
  function Bar(){}
  let bar = new Bar()
  Bar.prototype.isPrototypeOf(bar)  //true
```
`Object.getPrototypeOf()`:返回参数的prototype的值

```javaScript
    function Bar () { }
    Bar.prototype.name = '213'
    let bar = new Bar()
   Object.getPrototypeOf(bar)  // {name:'213'}
```

`setPrototypeOf(obj,prototype)`:向实例的私有对象prototype写入一个新值

Object.setPrototypeOf()修改继承关系影响深远，会涉及所有访问那些改过prototype对象的代码，可以通过Object.create()创建一个新对象的原型对象来降低影响

```javaScript
    
  let obj = {
    name: 123
  }

  let stay = {
    name: 123,
    c: 'ddd'
  }
  stay.__proto__.sayName = function(){
    console.log('name')
  }
  // 影响深远，因为会延着原型链向上查找
  Object.setPrototypeOf(obj, stay)
  // 通过Object.create()创建一个新对象，并且为其指定原型
  let person = Object.create(stay)
  person.c  //'ddd'
  person.sayName() // 'name'
```

`Object.isPrototypeOf`:是否包含这个原型

```javaScript
    function SuberType () { }
    let instance = new SuberType()
    console.log(Object.prototype.isPrototypeOf(instance)) // true
```

## Es6类

Es6类没有函数声明提升，Es5函数作为定义可以

函数受作用域限制，类受块作用域限制

Es6类包括`构造函数方法`,`实例方法`，`获取函数`，`设置函数`，`静态类方法`

### 实例化

new的操作过程

1.在内存中创建一个新对象。

2.这个新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性。

3.构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。

4.执行构造函数内部的代码（给新对象添加属性）。

5.如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

```javaScript
class Person {
  // 私有属性
  constructor(age) {
    this.age = age
  }
  // 原型链方法
  sayAage () {
    console.log(this.age)
  }
  // 类的私有方法
  static setAge () {
    return new Person(Math.random())
  }
}

let a = Person.setAge()
```
### 类的默认迭代器

```javaScript
class Person { 
 constructor() { 
  this.nicknames = ['Jack', 'Jake', 'J-Dog']; 
 } 
 // 将Person改变为一个可迭代对象
  *[Symbol.iterator]() { 
    yield *this.nicknames.entries(); 
  } 
} 
let p = new Person(); 
for (let [idx, nickname] of p) { 
 console.log(nickname); 
}
```

### 类的继承

继生类中可以通过super继承引用父类的原型，在构造函数当中使用super可以调用父类的构造函数，在ES5中相当于call()之类的方法，改变this指针，继承父类构造函数当中的方法和属性

super只能在派生类构造函数和静态方法中使用

不能单独引用super关键词，要用它调用构造函数，要么用它引用静态方法

调用super()会调用父类构造函数，并将返回的实例赋值给this

super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入

如果没有定义类构造函数，在实例化派生类时调用super()，而且会传入所有传给派生类的参数

在类构造函数中，不能调用super()之前引用this

如果在派生类中显式的定义了构造函数，要么必须在其中调用super，要么必须在其中返回一个对象

```javaScript

 class SuperType {
  constructor() {
    this.name = '123'
  }
  sayName () {
    console.log('SuperType')
  }
}

class Suber extends SuperType {
  constructor() {
    super()
  }
  getName () {
    super.sayName()
  }
}

let instance = new Suber()
instance.getName()
```



