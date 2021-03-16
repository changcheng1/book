<!--
 * @Author: cc
 * @LastEditTime: 2021-03-16 23:46:32
-->
类

```javaScript
class Person1 {
  name: string;
  getName(): void {
    console.log(this.name)
  }
}
let person = new Person1()
person.name = '123'
person.getName()
```

ES5实现类

```javaScript
const Person2 = (function () {
  function Person() { }
  Person.prototype.getName = function () {
    console.log(this.name)
  }
  return Person
})()
let personResult = new Person2()
personResult.name = '123'
personResult.getName()
```

类的存取器

```javaScript
class Person4 {
  public _name: string;
  get name() {
    return this._name
  }
  set name(val) {
    console.log('val', val)
    this._name = val
  }
}
let person5 = new Person4()
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
cc.getFatherName()
```

抽象类:只能被继承，不能被实例化

```javaScript
abstract class Animal2 {
  constructor(name: string) {
  }
  abstract makeSound(): void;  // 必须在派生类中实现
  move(): void {
    console.log('roaming the earch...');
  }
}
class Dog12 extends Animal2 {
  constructor() {
    super('Accounting and Auditing');
  }
  makeSound() {

  }
}
let newDog12Class: Animal2;
newDog12Class = new Dog12()
```