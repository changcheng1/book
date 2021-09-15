<!--
 * @Author: cc
 * @LastEditTime: 2021-04-15 20:50:25
-->

Partial:将所有的属性变为可选的

```javaScript
interface A {
  name: string,
  age: number
}
interface B {
  nameB: string,
  ageB: number
}
type keys<T> = keyof T; // name|age 可以拿到所有的key
// type Partial_<T> = { [P in keyof T]?: T[P] }
type a = Partial<A>  // 将所有属性变为可选的 type a = {name?: string;age?: number}
// 联合类型
type b = Partial<A & B>  //  {name?: string;age?: number;nameB?: string;ageB?: number;}
```

DeepPartial:递归遍历将所有属性转换为可选

```javaScript
type <T> = {
  [U in keyof T]: T[U] extends object ? DeepPartial<T[U]> : T[U]
}
```

Required:将所有属性都变为必选

```javaScript
//实现原理
//type Required_<T> = { [P in keyof T]-?: T[P] }
type DDD = {
  name?: string,
  age?: number
}
type E = Required<DDD> // {name:string,age:number}
```

ReadOnly:将所有属性都变为只读的

```javaScript
// 实现原理
// type Readonly_<T> = {readonly [U in keyof T]: T[U]}
type EEE = {
  name: string
}
type e = Readonly<EEE>  //  {readonly name: string;}
```

Pick:获取对象的属性构建一个新类型

```javaScript
// 实现原理
// type Pick<T, K extends keyof T> = {[P in K]: T[P];};
interface Person {
  name: string,
  age: number,
  gender: number
}
type pickPerson = Pick<Person, 'name' | 'age'>; 
// type pickPerson = {name: string;age: number;}
```

Pick和Extract的区别

`Pick构建一个新对象,Extract是寻找包含的相同类型`

```javaScript
// Extract实现原理
//type Extract_<T, U> = T extends U ? T : never;
type R5 = Extract<string | number | boolean, number> // number
```

