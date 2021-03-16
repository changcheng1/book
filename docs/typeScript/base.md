<!--
 * @Author: cc
 * @LastEditTime: 2021-03-16 23:45:57
-->
any类型:如果定义为any，跟js差不多，不进行类型检查

```javaScript
let a: any = document.getElementById('1')
a.style.color = 'black'
```

非空断言:将element排除null和undefined之类的操作

```javaScript
let element: (HTMLElement | null) = document.getElementById('root')
element!.style.color = 'green' 
```

never:返回never的函数无法正常执行

- void和never的区别 void可以被赋值为null和undefined，never不可以
- void的函数可以正常执行,但是返回never的函数无法正常执行

```javaScript
// never:永远到不了的情况
function neverFn(): never {
  throw new Error('123')
}

function neverFn1(): never {
  while (true) { }
}
```

void:代表没有任何类型，函数没有返回值
- typeScipt中strickNullChecks=false null赋值 void就可以，否则不可以

```javaScript
function voidFn(): void {
  console.log(1)
}
```

BigInt

```javaScript
const max = BigInt(Number.MAX_SAFE_INTEGER) // 2**53-1 === 9007199254740991n
console.log(max + BigInt(1) === max + BigInt(2)) // false
console.log(max + 1n === max + 2n) // false  
```

类型推导

```javaScript
let boolean1: boolean = true
let boolean2: boolean = Boolean(true)
let boolean3: boolean = new Boolean(true)  // error:这里是对象类型
```

联合类型:联合类型为赋值之前可以使用两个属性共有的方法

```javaScript
let num1: string | number;
num1!.toString()
num1 = 3
num1.toFixed(2)
num1 = '333'
num1.substr(0, 1) 
```

类型断言

```javaScript
let num2: string | number;
(num2! as number).toFixed();
(num2! as string).length;
(num2! as boolean); // 只能是重叠类型中的某一个
// 双重断言
(num2! as any as boolean);  // 先断言为any再断言为boolean

// 字面量类型
const up: 'up' = 'up' //类型只能是up
let up1: 'up1' | 'up2';
up1 = 'up2';
// 限制函数传入类型，可以实现枚举的效果
type Direction = 'up' | 'down';
function move(direction: Direction) { }
move("down")

type Person = {
  name: 'cc' | 'bb',
  age?: 18
}
let p1: Person = {
  name: 'cc'
}

// 字符串字面量
type string1 = '1' | '2' | '3';
type string2 = string | number | boolean;
const string3: string1 = '1'
const string4: string2 = true
```

