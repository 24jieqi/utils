Decimal

基于 `Decimal.js`封装的基础精度计算工具

## execute

> 传入一个计算表达式字符串，进行一次精度计算（谨慎使用）

```ts
import { execute } from '@fruits-chain/utils'
const expression1 = '(1+2)*3/6'
const expression2 = `${expression1}+1.5`
execute(expression1) // 1.5
execute(expression2) // 3
```

## plus sub mul div

> 对于四则运算中的加/减/乘/除

```ts
import { plus, sub, mul, div } from '@fruits-chain/utils'

plus(1, 2, 3, 4, 5) // 15
sub(22, 1) // 21
mul(2.2, 1.98) // 4.356
div(9, 1) // 5.625
```
