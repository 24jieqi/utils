# Date

> 时间日期相关工具函数

## formatDate

> 时间/日期格式化

```ts
import { formatDate } from '@fruits-chain/utils'

const targetDate = new Date('2023-02-14')
const targetTimestamp = new Date('2023-02-14').valueOf()
formatDate(targetDate) // 2023-02-14
formatDate(targetTimestamp) // 2023-02-14
formatDate(targetDate, { mode: 'date-time' }) // '2023-02-14 08:00'
formatDate(targetDate, { template: 'YYYY-MM' }) // 2023-02
formatDate(targetDate, { mode: 'date-time', template: 'YYYY-MM' }) // 2023-02
formatDate(targetDate, {}) // 2023-02-14
```

## formatRangeDate

> 时间/日期段格式化

```ts
formatRangeDate([null, targetTimestamp]) // ~至2023-02-18
formatRangeDate([targetDate, null]) // 2023-02-14至~
formatRangeDate([null, undefined]) // ''
formatRangeDate([targetDate, targetTimestamp]) // 2023-02-14至2023-02-18

formatRangeDate([targetDate, targetTimestamp], { mode: 'date-time' }) // 2023-02-14 08:00至2023-02-18 08:00
formatRangeDate([targetDate, targetTimestamp], { template: 'MM-DD' }) // 02-14至02-18
formatRangeDate([null, targetTimestamp], {
  empty: '--',
}) // --至2023-02-18
formatRangeDate([targetDate, targetTimestamp], {
  spliter: ' To ',
}) // 2023-02-14 To 2023-02-18
```

## getRangeDate 获取时间/日期段

```ts
const targetRangeDate = getRangeDate(3, 'days')
const targetRangeDate1 = getRangeDate(3, 'months')
const targetRangeDate2 = getRangeDate(3, 'days', 'day', new Date('2022-12-21'))
const targetRangeDate3 = getRangeDate(-3, 'days', 'day', new Date('2022-12-21'))
const targetRangeDate4 = getRangeDate(1, 'month', 'day', new Date('2022-12-21'))
```
