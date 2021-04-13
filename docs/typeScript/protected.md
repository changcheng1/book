<!--
 * @Author: cc
 * @LastEditTime: 2021-03-26 15:30:56
-->
类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域的变量

类型保护就是能够通过关键词判断出分支的类型

通过typeOf instanceof for in来缩小范围


函数参数的类型判断

```javaScript
function double(input: string | number) {
  if (typeof input === 'string') {
    console.log(input)
  } else {
    console.log(input)
  }
}
```
instanceof

```javaScript
class Animal { }
class Dog extends Animal { }
class Bird extends Animal { }
function getName(animal: Animal) {
  if (animal instanceof Dog) {
    console.log(animal)
  } else if (animal instanceof Bird) {
    console.log(animal)
  }
}
```
null保护

```javaScript
function getStr(str: string | null) {
  //或者
  // str = str || ''
  if (str === null) return '';
  return str.charAt(0)
  // 或者
  // str!.charAt(0)
}
```
链运算符

```javaScript
let a = { b: 2 }
let result = a?.b;
// a === null ?undefined:a.b
```

for in 类型识别

```javaScript
 interface Bird {
    swing: number
  }
  interface Dog {
    leg: number
  }

  function getName(x: Bird | Dog) {
    if ('swing' in x) {
      console.log(x)
    } else if ('leg' in x) {
      console.log(x)
    }
  }
```

自定义的类型保护

```javaScript
  interface Bird {
    swing: number
  }
  interface Dog {
    leg: number
  }
  function getName(x: Bird | Dog) {
    if ('swing' in x) {
      console.log(x)
    } else if ('leg' in x) {
      console.log(x)
    }
  }
```

ant-design源码中Button typeof

```javaScript
const tuple = <T extends string[]>(...args: T) => args
const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];   // default|primary|ghost|dashed|link
```