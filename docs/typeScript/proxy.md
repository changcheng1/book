<!--
 * @Author: cc
 * @LastEditTime: 2021-04-15 21:01:39
-->
代理模式
```javaScript
type Proxify<T> = {
  [P in keyof T]: {
    get(): T[P];
    set(val: T[P]): void;
  }
}

// 强制断言返回值的类型
function proxify<T>(obj: T) {
  let result: any = <Proxify<T>>{};
  for (const key in obj) {
    return Object.defineProperty(result, key, {
      get: () => {
        return obj[key]
      },
      set(val) {
        obj[key] = val
      },
    })
  }
}
interface PropsType {
  name: string,
  age: number
}
let props = {
  name: 'cc',
  age: 26
}
// 返回代理的新对象
let proxyProps: any = proxify<PropsType>(props)
proxyProps.age = 10
console.log(proxyProps)  //{ age: 10 }
```
取消代理：去掉代理对象的get,set函数

```javaScript
type Proxify<T> = {
  [P in keyof T]: {
    get(): T[P];
    set(val: T[P]): void;
  }
}
function unProxify<T>(t: Proxify<T>): T {
  // 强制定义返回格式
  let result: any = {} as T;
  // 返回对象赋值
  for (let key in t) {
    result[key] = t[key]
  }
  return result;
}
let originProps = unProxify<PropsType>(proxyProps)
console.log(originProps);  //  {age: 10}
```