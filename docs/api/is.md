# Is

> **是**校验函数集合

## isDef

> 是否已定义 _是否等于 `null`或者 `undefined`_

```ts
import { isDef } from '@fruits-chain/utils'

console.log(isDef(0)) // true
console.log(isDef('')) // true
let a
console.log(isDef(a)) // false
a = null
console.log(isDef(a)) // false
```

## isArray

> 是否是数组

```ts
import { isArray } from '@fruits-chain/utils'

console.log(isArray([])) // true
console.log(isDef([1, 2])) // true
console.log(isDef('[1,2]')) // false
```

## isObject

> 是否是**狭义**上的对象

```ts
import { isObject } from '@fruits-chain/utils'

console.log(isObject({})) // true
console.log(isObject([])) // false
console.log(isObject(new Map())) // false
```

## isFunction

> 是否是函数

```ts
import { isFunction } from '@fruits-chain/utils'
function a() {}
const b = a
const c = () => {}
console.log(isFunction(a)) // true
console.log(isFunction(b)) // true
console.log(isFunction(c)) // true
```

## isPromise

> 是否是 `Promise`，鸭子类型判断

```ts
import { isPromise } from '@fruits-chain/utils'

const a = Promise.resolve()
function b() {}
b.then = () => {}
b.catch = () => {}
console.log(isPromise(a)) // true
console.log(isPromise(b)) // true
```

## isMobile

> 判断是否是手机号码（仅支持中国大陆）

```ts
import { isMobile } from '@fruits-chain/utils'

console.log(isMobile('13212345678')) // true
console.log(isMobile('+8613212345678')) // true
console.log(isMobile('861321234567')) // false
```

## isNullish

> 空判断（相比 `isDef`而言，多了对空字符串的 `false`判断）

```ts
import { isMobile } from '@fruits-chain/utils'

console.log(isNullish('')) // true
console.log(isNullish(null)) // true
console.log(isNullish(' ')) // false
```

## isLicensePlateNumber

> 车牌号校验

```ts
import { isLicensePlateNumber } from '@fruits-chain/utils'

console.log(isLicensePlateNumber('渝A50A52')) // true
console.log(isLicensePlateNumber('渝A5oA52')) // false
```
