<!--
 * @Author: cc
 * @LastEditTime: 2020-12-02 15:40:43
-->
## Js的六种继承

一.原型链继承

特点：因为SubType.prototype直接设置为SuperType函数的实例，这样一来，SubType生成实例不仅能获取SuperType实例中的属性，还能与SuperType.prototype挂上钩

缺点：1.新实例无法向父类构造函数传参 
2.继承单一 
3.所有的实例属性和方法都是通用的,无法实现属性和方法的私有

```javaScript

function SuperType() { 
 this.colors = ["red", "blue", "green"]; 
} 
function SubType() {} 
// 继承 SuperType 
SubType.prototype = new SuperType(); 

let instance1 = new SubType(); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 

let instance2 = new SubType(); 
console.log(instance2.colors); // "red,blue,green,black"
    
 ```

 二.借用构造函数继承

特点：可以向父类构造函数传参，用call或者apply将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））,可以实现属性的私有

缺点：无法继承原型链属性

 ```javaScript
function SuperType() { 
 this.colors = ["red", "blue", "green"]; 
} 
function SubType() { 
  // 继承 SuperType 
  SuperType.call(this); 
} 
let instance1 = new SubType(); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
let instance2 = new SubType(); 
console.log(instance2.colors); // "red,blue,green"
 ```

 三.组合继承(原型继承+借用构造函数继承)

 特点：结合了两种的优点，可以实现属性的私有化

 缺点：但是调用了两次父类构造函数，一次是创建子类原型，一次是在子类构造函数调用
 
```javaScript
    function SuperType(name){ 
        this.name = name; 
        this.colors = ["red", "blue", "green"]; 
    } 
    SuperType.prototype.sayName = function() { 
        console.log(this.name); 
    }; 
    function SubType(name, age){ 
        // 继承属性
        SuperType.call(this, name); 
        this.age = age; 
    } 
    //这里会导致SubType.prototype.constructor是SuperType
    SubType.prototype = new SuperType(); 
    SubType.prototype.sayAge = function() { 
        console.log(this.age); 
    }; 

    let instance1 = new SubType("Nicholas", 29); 
    instance1.colors.push("black"); 
    console.log(instance1.colors); // "red,blue,green,black" 
    instance1.sayName(); // "Nicholas"; 
    instance1.sayAge(); // 29 

    let instance2 = new SubType("Greg", 27); 
    console.log(instance2.colors); // "red,blue,green" 
    instance2.sayName(); // "Greg"; 
    instance2.sayAge(); // 27
```

四.原型式继承

特点：不定义类型也能通过原型实现对象之间的信息共享，创建临时函数，将传入的对象，赋值函数的原型对象，返回一个新对象

缺点：没有构造函数的场景

```javaScript
function object (o) {
  function F () { }
  F.prototype = o;
  return new F();
}
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"

// 只有一个参数时，Object.create()方法与object方法效果是一样的
let obj = Object.create(person)
console.log(obj.name)  // "Nicholas"
```

五、寄生式继承

特点：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象，实际上是在原型式继承的基础上可以对返回的新对象可以进行操作

缺点：没有构造函数场景

```javaScript
// 返回一个对象
function object (o) {
  function F () { }
  F.prototype = o;
  return new F();
}

// 寄生继承函数
function createAnother (original) {
  let clone = object(original)
  clone.say = function () {
    console.log('Hi')
  }
  return clone
}

let Person = {
  name: 'person'
}
let anotherPerson = createAnother(Person)
anotherPerson.say()  // Hi
console.log(anotherPerson.name)  // Person

```

六、寄生组合式继承

特点：解决组合继承的两次调用问题

1. 传入子类构造函数和父类构造函数
2. 创建父类原型的一个副本
3. 给返回的副本设置正确的constructor属性
4. 将副本赋值给子类的原型

```javaScript
// 唯一的核心，相对于组合继承，不用再调用SuperType()而是直接创建父的原型对象的新对象，直接关联父的原型对象
function inheritPrototype(subType, superType) { 
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 赋值对象
}

function SuperType(name) { 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 
function SubType(name, age) { 
 // 这里拷贝父函数的私有属性
 SuperType.call(this, name);
 this.age = age; 
} 
inheritPrototype(SubType, SuperType); 
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
};
```