<!--
 * @Author: cc
 * @LastEditTime: 2021-03-21 16:30:27
-->
`接口一方面可以在面向编程中表示行为的抽象，另外可以用来表示对象的形状`

`接口就是把一些类中的共有属性和方法抽象出来，可以用来约束实现此接口的类`

`一个类可以继承另一个类并实现多个接口`

`接口像插件一样用来增强类，而抽象类是具体类的抽象`

`一个类可以有实现多个接口，一个接口也可以被多个类实现，但一个类可以有多个子类，但只能有一个父类`

接口合并和继承

```javaScript
  interface SpeakAble {
    name: string;
    speak(): void;
  }
  interface SpeakAble {
    age: number;
  }
  interface EatAble {
    eat(): void;
  }
  // implements：工具 这里是Person类实现这两个接口
  class Person implements SpeakAble, EatAble {
    name: string;
    speak(): void {
      throw new Error("Method not implemented.");
    }
    age: number;
    eat(): void {
      throw new Error("Method not implemented.");
    }
  } 
```
接口的任意属性

```javaScript
interface Person {
    [key: string]: any
  }
  let person: Person = {
    a: 1
  }
```

接口的继承

```javaScript
  interface name {
    name(): void
  }
  interface age extends name {
    age(): void
  }
  class Person implements age {
    age(): void {
      throw new Error("Method not implemented.");
    }
    name(): void {
      throw new Error("Method not implemented.");
    }
  }
```

函数类型接口

```javaScript
  interface Discount {
    (price: number): number
  }
  const discount: Discount = (num: number): number => {
    return num
  }
  // 对象，数组接口
  interface User {
    [string: number]: number
  }
  let arr: User = [1, 2, 3]
  let user = {
    '0': 1,
    '1': 2
  }
```

构造函数类型

```javaScript
 // 构造函数类型
  class Animal {
    constructor(public name: string) {
    }
  }
  // 加上new之后就是构造函数类型就是用来描述类的构造函数
  interface WithNameClass {
    new(name: string): Animal;
  }
  function createAnimal(classes: WithNameClass, name: string) {
    return new classes(name)
  }
  let a = createAnimal(Animal, 'dog')
  console.log(a.name) // dog

  //当我们写一个类型的时候，会得到两个类型
  // 1.构造函数的函数类型
  // 2.类的实例类型
  class Component {
    static myName: string = '静态属性名称';
  }
  let com = Component;
  // Component类名本身表示的是实例的类型
  // ts 一个类类型 一个叫值
  // 冒号后面是类型，后面的是指具体的实现
  // typeof 获取函数的类型
  let c: typeof Component = com
  let f: Component = new Component()

  function FnComponent() {
    this.myName = '实例属性'
  }
  let fn = Component
  let typeoFn: typeof Component = fn;
```

抽象类与接口

`不同类之间公有的属性和方法，可以抽象成一个接口`

`而抽象类是供其他类继承的基类，抽象类不允许被实例化，抽象类中的方法和属性必须在子类中实现`

`抽象类的本身就是一个无法实例化的类，其中能够实现方法和初始化属性，而接口仅用于描述而不提供具体方法的实现，也不为属性一共具体的初始化`

`抽象类可以实现接口`

```javaScript
  abstract class Animal {
    public name: string;
    abstract say(name: string): void
  }
  interface Fly {
    fly(name: string): void
  }
  class Dog extends Animal implements Fly {
    public name: string;
    say(name: string) { }
    fly(name: string) { }
  }
```