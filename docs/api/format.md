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

## abbrNumberFormat

> 数字缩写

```ts
import { abbrNumberFormat } from '@fruits-chain/utils'

abbrNumberFormat(12312331.33123, 2) // 1,231.23万
abbrNumberFormat(12312331.33123, 2).num // 1,231.23
abbrNumberFormat(12312331.33123, 2).abbrStr // 万
abbrNumberFormat(12111312331.33123, 2).abbrStr // 亿
abbrNumberFormat(12111312331.33123, 2) // 121.11亿
abbrNumberFormat(12312331.33123, 2, false) // 1231.23万
```

## formatStorageSize

新增于`v1.0.3`
`v1.0.4`增加`convertStorageSize`单独返回数值和单位

> 存储大小格式化

```ts
import { abbrNumberFormat } from '@fruits-chain/utils'

formatStorageSize(1000) // 1kB
formatStorageSize(1024, { iec: true }) // 1KiB
formatStorageSize(450) // 450B
formatStorageSize(1000, { iec: true }) //1000B
formatStorageSize(1024 ** 2) // 1.049MB
formatStorageSize(1024 ** 2, { iec: true }) // 1MiB
formatStorageSize(1024, { from: 'MB' }) // 1.024GB
```
