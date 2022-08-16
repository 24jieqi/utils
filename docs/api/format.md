# Format

> 数值格式化工具集

## toDecimalMark

> 传入一个数字，进行千分位格式化*如果传入小数位，则四舍五入后再千分位格式化*

```ts
import { toDecimalMark } from '@fruits-chain/utils'

toDecimalMark(17479.925) // '17,479.925'
toDecimalMark(17479.925, 2) // '17,479.93'
```

## ceilWith

> 向上取{num}位小数位

```ts
import { ceilWith } from '@fruits-chain/utils'

ceilWith(1.925, 2) // 1.93
ceilWith(1.924999, 2) // 1.93
```

## roundWith

> 四舍五入取*最多*{num}位小数位

```ts
import { roundWith } from '@fruits-chain/utils'

roundWith(1.2048, 2) // 1.2
roundWith(1.2148, 2) // 1.21
roundWith(1.29999, 2) // 1.3
```

## floorWith

> 向下取*最多*{num}位小数位

```ts
import { floorWith } from '@fruits-chain/utils'

floorWith(1.2048, 2) // 1.2
floorWith(1.29999, 2) // 1.29
```
