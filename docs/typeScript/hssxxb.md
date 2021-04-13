<!--
 * @Author: cc
 * @LastEditTime: 2021-03-26 15:27:27
-->
接口的兼容性

```javaScript
 interface Animal {
    name: string,
    age: number
  }
  interface Dog {
    name: string,
    age: number,
    gender: number
  }
  let person = (a: Animal): string => a.name;
  let a: Dog = {
    name: 'cc',
    age: 1,
    gender: 0
  }
  person(a)
```

基本数据的兼容性

```javaScript
  let a: string | number;
  let b: string = '123';
  a = b;
  b = a;
  // 因为str上面有toString方法
  let num: {
    toString(): string
  }
  let str: string = '1'
  num = str;
}
```

类的兼容性

```javaScript
  class Animal {
    name: string;
    age: number
  }
  class Bird extends Animal { gender: number }
  var a: Animal = {
    name: 'cc',
    age: 18
  };
  var b: Bird = {
    name: 'cc',
    age: 18,
    gender: 0
  };
  a = b;
```
函数的兼容性：考虑类型安全，使用不会报错

`参数逆变父类，返回值协变子类`

`函数参数可以少不能多，返回值可以多不能少`

```javaScript
  type fn = (name: string, age: number) => void;
  let f: fn;
  function fn2(name: string) { }
  f = fn2;
  function fn3(name: string, age: 18, color: 'red') { }
  f = fn3;  // 不可以多传

  type fn = () => { name: string, age: number }
  let f: fn;
  let f1 = () => ({ name: '18', age: 1 })
  f = f1;
  let f2 = () => ({ name: '18' })
  f = f2;  // erro:参数少传age
```
参数可以传自己和自己的父类
返回值可以传自己和自己的子类

```javaScript
  // 基础类型
  type CallBack = (str: string | number) => string | number;
  function exec(callBack: CallBack): void { }

  type A = (str: string) => string;
  let a: A;
  exec(a)  // error

  type C = (str: string | number | boolean) => string | number | boolean;
  let c: C;
  exec(c)  // error

  type B = (str: string | number | boolean) => string;
  let b: B;
  exec(b)  // error
```
泛型在判断兼容性的时候，会先判断具体的类型，然后再进行兼容性判断
为空是没问题的,但是接口内部处理的话就会报错

```javaScript
interface Type<T> {
  // data: T
}
let x: Type<string>;
let y: Type<number>;
x = y  // true
```

