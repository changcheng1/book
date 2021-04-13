<!--
 * @Author: cc
 * @LastEditTime: 2021-04-13 22:19:20
-->
条件类型

```javaScript
interface Fish {
  name1: string
}
interface Water {
  name2: string
}
interface Bird {
  name3: string
}
interface Sky {
  name4: string
}

type Condi<T> = T extends Fish ? Water : Sky;
let con: Condi<Fish> = { name2: '2' } // 这z这里是Water的属性
```

条件类型的分发

```javaScript
// 条件类型的分发
// 可以是Fish也可以是Bird
let con1: Condi<Fish | Bird> = { name2: '1' } 
```
分布式条件类型

`条件类型有一个特性，就是【分布式有条件类型】，但是分布式有条件类型是有前提的，条件类型里待检查的必须是make type parameter`

```javaScript
 interface Fish {
    name1: string
  }
  interface Water {
    name2: string
  }
  interface Bird {
    name3: string
  }
  interface Sky {
    name4: string
  }
  // 这里指Fish Water是否是Fish的子类型
  type Condi<T> = [T] extends [Fish] ? Water : Sky;
  let con: Condi<Fish | Water> = { name4: '1' }
```

找出T中不包含U的部分

```javaScript
type diff<T, U> = T extends U ? never : T;
type A = diff<'a' | 'b' | 'c', 'a' | 'b'>  // never|never|'c' 所以A是C

type diff1<T, U> = T extends U ? T : never;

type A1 = diff1<'a' | 'b' | 'c', 'a' | 'b'>  // 'a'|'b'|never 所以A1是'a'|'b'
```

找到不包含类型

```javaScript
type R4 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // 'c'
```

找到相同类型

```javaScript
type R5 = Extract<'a' | 'b' | 'c', 'a' | 'b'> // 'a'|'b'
```
NonNullable:找到不为空的

```javaScript
//实现原理
// type NonNullable_<T> = T extends null |undefined ? never : T
type R6 = NonNullable<'a' | null | undefined>  // 'a'
```

获取函数参数的类型

```javaScript
function getUser(a: string, b: number) {
  return { name: 'cc', age: 18 }
}

type GetUserType = typeof getUser  // (a: string, b: number) => {name: string;age: number;}
```

infer关键词
`最早出现在PR中，表示在extends条件语句中待推断的类型变量，写在哪就代指某一部分`

```javaScript
type inferDemo<T> = T extends { name: infer R } ? R : never;
type inferResult = inferDemo<{ name: string }>   // string
```
ReturnType:获取返回的类型

```javaScript
function getUser(a: string, b: number) {
  return { name: 'cc', age: 18 }
}

type GetUserType = typeof getUser 
// Return Type的原理
// type ReturnType_<T> = T extends (...args:any)=>infer R ? R : T
let Type: ReturnType<GetUserType>; //{name:string,age:number}
```

Parameters：获取函数的参数类型

```javaScript
function getUser(a: string, b: number) {
  return { name: 'cc', age: 18 }
}
type GetUserType = typeof getUser 
// 这里的P就是 = [string,number]
// type Parameters_<T> = T extends (...param: infer P) => any ? P : never;
// 如果T是T extends (param: infer P) => any的子类型，则结果是 (param: infer P) => any 类型中的参数 P，否则返回为never
type param = Parameters<GetUserType>; //所以这里返回P也就是[a:string,b:number]
```
ConstructorParameters:获取类的构造函数的参数，返回元组

```javaScript
//  这里的泛型 T extends new (...args: any) => any直接限制住传入的只能是类
// type ConstructorParameters_<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name
  }
}
let a = new Animal('dog')
type AnimalType = typeof Animal
type Parame = ConstructorParameters<AnimalType> // [name:string]
```
InstanceType:获取实例的类型

```javaScript
// type InstanceType_<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
type instanceType = InstanceType<AnimalType>  // Animal
```

type转Union

```javaScript
type ElementOf<T> = T extends Array<infer E> ? E : never;
type ArrayList = [string, number, boolean];
type ListUnion = ElementOf<ArrayList>  // string|number|boolean
```
联合类型转交叉类型

```javaScript
type T1 = { name: string }
type T2 = { age: number }
type ToIntersection<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T3 = ToIntersection<{ a: (x: T1) => void, b: (x: T2) => void }>  // T1 & T2
// T1 & T2 交叉类型，必须都得有
let t3: T3 = { name: '', age: 1 }
```




