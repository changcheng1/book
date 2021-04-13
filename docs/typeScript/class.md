<!--
 * @Author: cc
 * @LastEditTime: 2021-03-26 15:17:40
-->
类

```javaScript
class Person {
  name: string;
  getName(): void {
    console.log(this.name)
  }
}
let person = new Person()
person.name = '123'
person.getName()  //123
```

ES5实现类

```javaScript
const Person = (function () {
  function Person() { }
  Person.prototype.getName = function () {
    console.log(this.name)
  }
  return Person
})()
let personResult = new Person()
personResult.name = '123'
personResult.getName()
```

类的存取器

```javaScript
class Person {
  public _name: string;
  get name() {
    return this._name
  }
  set name(val) {
    console.log(val) //4
    this._name = val
  }
}
let person5 = new Person()
person5.name = '4'
```

类的属性

```javaScript
class Father {
  // 类属性，只能Father.name调用
  static fatherName: string = 'father'
  readonly age: number = 33;
  // 类的Public属性,公共属性
  public name: string;
  // 类的私有属性 private
  private address: string = 'shandong'
  // protected:和private比较相似，但是在派生类当中可以继续访问
  // readonly:类的只读属性
  protected readonly color: string = 'red'
  public getName() {
    console.log(this.name)
  }
  private getCurrentName() {
    console.log(Father.fatherName)
  }
}

class Son extends Father {
  getFatherName() {
    console.log(this.age)
  }
}
let cc = new Son()
cc.getFatherName() //33
```

抽象类:只能被继承，不能被实例化

```javaScript
// 抽象类
abstract class Animal {
  constructor(name: string) {
  }
  abstract makeSound(): void;  // 必须在派生类中实现
  move(): void {
    console.log('roaming the earch...');
  }
}
// 继承抽象类
class Dog12 extends Animal {
  constructor() {
    super('Accounting and Auditing');
  }
  makeSound() {

  }
}
let newDog12Class: Animal;
newDog12Class = new Dog12()
```