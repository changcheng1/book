
默认泛型

```javaScript
  function logger<T extends number[]>(arg: T) {
    console.log(arg.length)  //3
  }
  logger([1, 2, 3])
  
  function CreateArray<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let k = 0; k < length; k++) {
      result.push(value)
    }
    return result;
  }
  // 这里确定传入的类型
  CreateArray(3, 'x')  // [x,x,x]
```

泛型类

```javaScript
 class MyArray<T>{
    private array: T[] = []
    pushArray<T>(arg) {
      this.array.push(arg)
    }
    getArray(): T {
      return this.array[0]
    }
  }

  let arr = new MyArray<number>()
  arr.pushArray(1)
  console.log(arr.getArray())  // 1

  // 泛型与new
  function newClass<T>(classes: { new(): T }): T {
    return new classes()
  }
  class Person { }
  let p = newClass(Person)
```

泛型接口

```javaScript
  interface Calculate {
    <T extends (number | string)>(num: T, b: T)
  }

  let num: Calculate = <T extends (number | string)>(a: T, b: T): any => {
  }
  num('1', '2')

  interface type<T = number> {
    <T>(a: T): T
  }
  let a: type = (param) => param
  console.log(a(1))
```

泛型约束:extends其实只看形状，有没有对应的属性

```javaScript
  // 如果类中都是空对象，那泛型中传入grandFather也可以
  class GrandFather {
    grandFather: string
  }
  class Father {
    father: string
  }
  class Child extends Father {
    child: string
  }
  function getFather<T extends Father>() {
  }
  getFather()
```

泛型的数组校验

```javaScript
 function demo1<T>(arg: String[]) { }
  demo1<string>(['1'])

  interface ArrayType {
    [key: number]: {
      type: string,
      num: number
    }
  }
  function demo<ArrayType>(arg: ArrayType) {
    return arg[0]
  }
  demo([{ type: '1', num: 1 }])  // { type: '1', num: 1 }

  interface ListType<T> {
    list: T[]
  }
  const getType: ListType<{ name: string, age: number }> = { list: [{ name: 'cc', age: 10 }] }
```
泛型的类型别名

```javaScript
  type ArrayType = {
    name: string,
    age: number
  }
  type Cart<T = number> = { list: Array<ArrayType> } | T[]
  let cart: Cart = { list: [{ name: 'cc', age: 1 }] }
  let cart1: Cart = [1, 2, 3];
```