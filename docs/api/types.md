# Types

> 常用的`Typescript`类型定义集合

## Awaitable<T>

> `PromiseLike<T>`或者`T`

```ts
import { Awaitable } from '@fruit-chain/utils'

const str: Awaitable<string> = 'str'
console.log(str.length)

const promise: Awaitable<string> = Promise.resolve('str')
promise.then(res => {
  console.log(typeof res === 'string')
})
```

## Nullable<T>

> `T`或者`null`/`undefined`

```ts
import { Nullable, isDef } from '@fruit-chain/utils'

const str: Nullable<string> = 'str'
console.log(str.length) // 3

let foo: Nullable<string>
console.log(isDef(foo)) // false
```

## Arrayable<T>

> `Array<T>`或者`T`

```ts
const arr: Arrayable<string> = ['str']
const arr1: Arrayable<string> = [1] // error!!
const str: Arrayable<string> = 'str'
```

## Fn<T = void>

> 函数类型`() => T`

```ts
const fn: Fn<string> = () => 1 // error!

const fn1: Fn = () => {
  console.log('fn1')
}

function fn2(): Fn<string> {
  return () => 'str'
}
```
