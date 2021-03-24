<!--
 * @Author: cc
 * @LastEditTime: 2021-03-18 21:21:04
-->
装饰器以及工厂

```javaScript
//给类的原型链上添加属性
function addNameFactory(name: string) {
  return function addName(x: Function) {
    x.prototype.name = name
  }
}
// 传入参数
@addNameFactory('cc')

class Person {
  name: string;
  constructor() { }
}

let p: Person = new Person();
console.log(p.name) // cc
```

方法装饰器

```javaScript
// 属性装饰器：将传入的参数进行处理，全部改成大写
function upperCase(target: any, key: string) {
  console.log(target) //Person {}
  console.log(key)  //name
  let value: string = target[key]
  let get = () => value
  let set = (newVal: string) => {
    value = newVal.toUpperCase()
  }
  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get,
      set,
      enumerable: true,
      configurable: true
    })
  }
}
// 静态属性装饰器：如果装饰的是静态属性的话，target是构造函数本身
function staticPropertyDeactor(target: any, key: string) {
  console.log(target) //Person { name: [Getter/Setter] }
  console.log(key) //age
}
// 方法装饰器：可以重写方法
function toNumber(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(target) //Person { name: [Getter/Setter] }
  console.log(key)  //sum
  console.log(descriptor) //{ value: [Function: sum],writable: true,enumerable: false,configurable: true }
  let oldMethod = descriptor.value // 获取class类的sum方法
  descriptor.value = function (...args: any[]) {
    args = args.map(item => parseFloat(item))
    return oldMethod.apply(this, args)
  }
}
class Person {
  @upperCase
  name: string;
  @staticPropertyDeactor
  age: number = 10;
  getName() {
    console.log(this.name)
  }
  @toNumber
  sum(...args: any[]) {
    return args.reduce((prev: number, current: number) => prev + current, 0)
  }
}
let person = new Person()
person.name = 'cc'
console.log(person.sum('1', '2', '3')) // 6
```

参数装饰器

```javaScript
function addAge(target: any, methodName, paramIndex: number) {
  console.log(target) //Person{}
  console.log(methodName) // login
  console.log(paramIndex) //0
  target.age = 10
}
class Person {
  age: number;
  // 这里传入的装饰器Index就是0
  login(@addAge userName: string, passWord: string) {
    console.log(this.age, userName, passWord)
  }
}
let person = new Person()
person.login('cc', '123')  // 10 'cc' '123'
```

装饰器的执行顺序

```javaScript
   // 类装饰器
  function ClassDecorator1() {
    return function (target) {
      console.log('ClassDecorator1')
    }
  }
  function ClassDecorator2() {
    return function (target) {
      console.log('ClassDecorator2')
    }
  }
  // 属性装饰器
  function propertyDecorator1(name: string) {
    return function (target, propertyName) {
      console.log('propertyDecorator1')
    }
  }
  function propertyDecorator2(name: string) {
    return function (target, propertyName) {
      console.log('propertyDecorator2')
    }
  }
  // 函数装饰器
  function FnDecorator1(target, key, description) {
    console.log('FnDecorator1')
  }
  // 参数装饰器
  function paramDecorator1(target, methodName, index) {
    console.log('paramDecorator1')
  }
  // 参数装饰器2
  function paramDecorator2(target, methodName, index) {
    console.log('paramDecorator2')
  }

  @ClassDecorator1()
  @ClassDecorator2()
  class Person {
    @propertyDecorator1('cc')
    @propertyDecorator2('cc')
    name: string = '';
    age: number = 10;
    @FnDecorator1
    hello(@paramDecorator1 p1: string, @paramDecorator2 p2: string) {

    }
  }
  let person = new Person()
  // 类装饰器->函数装饰器->参数装饰器->属性装饰器
  // 1、属性装饰器 propertyDecorator2 propertyDecorator1
  // 2、参数装饰器 paramDecorator2 paramDecorator1
  // 3、函数装饰器 FnDecorator1
  // 3、类装饰器  ClassDecorator2 ClassDecorator1
```