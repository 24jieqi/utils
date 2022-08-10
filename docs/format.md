Format

数字格式化工具集

## toDecimalMark

> 传入一个数字，进行千分位格式化（如果传入小数位，则进行四舍五入）

```ts
import { toDecimalMark } from '@fruits-chain/utils'

toDecimalMark(17479.925) // '17,479.925'
toDecimalMark(17479.925, 2) // '17,479.93'
```

## ceilWith roundWith floorWith

> 对应格式化中的向上取小数位/四舍五入取小数位/向下取小数位

```ts
import { ceilWith, floorWith, roundWith } from '@fruits-chain/utils'

ceilWith(1.925, 2) // 1.93
ceilWith(1.924999, 2) // 1.93

floorWith(1.2048, 2) // 1.2
floorWith(1.29999, 2) // 1.29

roundWith(1.2048, 2) // 1.2
roundWith(1.29999, 2) // 1.3
```
