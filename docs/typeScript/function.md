<!--
 * @Author: cc
 * @LastEditTime: 2021-03-21 16:42:15
-->
函数

```javaScript
type fnType = (x: string) => string
type fnType2 = <T>(x: T) => T

const fnType3: fnType = (a) => {
  return a
}
fnType3('1')

function ajax(url: string, method: string = 'GET'): void { }
ajax('/')

function sum(...num: number[]) {
  return num.reduce((prev, crrent) => prev + crrent, 0)
}
sum(1, 2, 3)
```

函数重载：经典案例redux中的compose

```javaScript
function attr(a: string, b: number): void
function attr(a: number, b: number): void
function attr(val: any): void {
  console.log(val)
}
attr('1', 2)
attr(2, 2)
attr('1', 2)
```