<!--
 * @Author: cc
 * @LastEditTime: 2021-03-21 16:42:23
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