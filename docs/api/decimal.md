# Decimal

> 基于 [Decimal.js](https://github.com/MikeMcl/decimal.js)封装的基础精度计算工具

## execute

> 传入一个计算表达式字符串，进行一次精度计算*谨慎使用*

```ts
import { execute } from '@fruits-chain/utils'
const expression1 = '(1+2)*3/6'
const expression2 = `${expression1}+1.5`
execute(expression1) // 1.5
execute(expression2) // 3
```

## plus

> 精度计算加，同 `add`

```ts
import { plus, add } from '@fruits-chain/utils'

plus(1, 2, 3, 4, 5) // 15
add(1, 2) // 3
```

## sub

> 精度计算减，同 `minus`

```ts
import { sub, minus } from '@fruits-chain/utils'

sub(10.1, 9, 0.1) // 1
minus(1, 2) // -1
```

## mul

> 精度计算乘，同 `times`

```ts
import { mul, times } from '@fruits-chain/utils'

mul(2.2, 1.98) // 4.356
mul(2.2, 1.98, -1.45) // -6.3162
times(2.2, 1.98) // 4.356
```

## div

> 精度计算除，**第一个参数作为被除数，其余参数作为除数**

```ts
import { div } from '@fruits-chain/utils'

div(9, 1.6) // 5.625
div(9, 1.6, 2) // 2.8125
```
