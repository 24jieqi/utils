import { add, div, mul, sub } from './decimal'

/**
 * 错误边界判定（最多4位小数支持）
 * @param left
 * @param right
 * @returns
 */
function withinErrorMargin(left: number, right: number) {
  return Math.abs(sub(left, right)!) < Math.pow(0.1, 5) // 最多4位小数支持
}

function isDef(one: any) {
  return typeof one !== 'undefined'
}

/**
 * 向上取小数位
 * @param num 数字
 * @param fractionDigits 小数位（默认为0）
 * @returns
 */
export function ceilWith(num: number, fractionDigits = 0) {
  if (!isDef(num)) {
    return
  }
  if (fractionDigits === 0) {
    return Math.ceil(num)
  }
  const result = Number(num.toFixed(fractionDigits))
  if (withinErrorMargin(result, num)) {
    return result
  } else {
    let temp = num < 0 ? -0.5 : 0.5 // fixed: 如果为负数，需要向下取
    for (let i = 0; i < fractionDigits; i++) {
      temp = temp * 0.1
    }
    return Number(add(num, temp)!.toFixed(fractionDigits))
  }
}

/**
 * 向下取（最多）小数位
 * @param num
 * @param fractionDigits 小数位（默认为0）
 * @returns
 */
export function floorWith(num: number, fractionDigits = 0) {
  if (!isDef(num)) {
    return
  }
  const m = Math.pow(10, fractionDigits)
  return div(Math.floor(mul(num, m)!), m)
}

/**
 * 四舍五入取（最多）小数位
 * @param num 待舍入的数字
 * @param fractionDigits 小数位（默认为0）
 * @returns
 */
export function roundWith(num: number, fractionDigits = 0) {
  if (!isDef(num)) {
    return
  }
  const m = Math.pow(10, fractionDigits)
  return div(Math.round(mul(num, m)!), m)
}

/**
 * 数字千分位格式化
 * @param val 待格式化的数字
 * @param limitDecimals 小数位，传入后将使用四舍五入
 * @returns
 */
export function toDecimalMark(val: number, limitDecimals?: number) {
  if (!isDef(val)) {
    return
  }
  let temp =
    typeof limitDecimals !== 'undefined' ? roundWith(val, limitDecimals)! : val
  const isNegative = temp < 0
  if (isNegative) {
    temp = Math.abs(temp)
  }
  const arr = String(temp).split('.')
  const int = arr[0].split('')
  const fraction = arr[1] || ''
  let r = ''
  int.reverse().forEach(function (v, i) {
    if (i !== 0 && i % 3 === 0) {
      r = v + ',' + r
    } else {
      r = v + r
    }
  })
  return (isNegative ? '-' : '') + r + (fraction ? '.' + fraction : '')
}

/**
 * 数字缩写
 * @param val 待格式化的数字
 * @param limitDecimals 小数位，传入后将使用四舍五入
 * @param useGrouping 是否使用千分位格式化
 * @returns 格式化的数字
 */
export const abbrNumberFormat = (
  val: number | string,
  maximumFractionDigits = 2,
  useGrouping = true,
) => {
  if (!val) {
    return {
      num: 0,
      abbrStr: '',
      toString: () => {
        return ''
      },
    }
  }
  let resNumber: number = typeof val !== 'number' ? Number(val) : val
  let abbr = ''

  if (Math.abs(resNumber) > 100000000) {
    resNumber = div(resNumber, 100000000) || 0
    abbr = '亿'
  } else {
    if (Math.abs(resNumber) > 10000) {
      resNumber = div(resNumber, 10000) || 0
      abbr = '万'
    }
  }
  const num = useGrouping
    ? toDecimalMark(resNumber, maximumFractionDigits)
    : roundWith(resNumber, maximumFractionDigits)
  return {
    num,
    abbrStr: abbr,
    valueOf: function () {
      return this.num + this.abbrStr
    },
    toString: function () {
      return this.num + this.abbrStr
    },
  }
}

type StorageUnit = 'B' | 'kB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'
type StorageUnitIEC =
  | 'B'
  | 'KiB'
  | 'MiB'
  | 'GiB'
  | 'TiB'
  | 'PiB'
  | 'EiB'
  | 'ZiB'
  | 'YiB'
const storageUnit: StorageUnit[] = [
  'B',
  'kB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB',
]
const storageUnitIEC: StorageUnitIEC[] = [
  'B',
  'KiB',
  'MiB',
  'GiB',
  'TiB',
  'PiB',
  'EiB',
  'ZiB',
  'YiB',
]
export interface FormatBytesConfig {
  /**
   * 是否使用IEC单位，默认为`false`，如果指定了`to`则不生效
   */
  iec?: boolean
  /**
   * 当前传入val的单位，默认为`B`
   */
  from?: StorageUnit | StorageUnitIEC
  /**
   * 需要格式化成的单位，如果不指定，则默认格式化为最近的单位
   */
  to?: StorageUnit | StorageUnitIEC
  /**
   * 保留的小数位，默认为`3`
   */
  limitDecimals?: number
}

function toByte(val: number, unit: StorageUnit | StorageUnitIEC) {
  const isIecUnit = storageUnitIEC.includes(unit as StorageUnitIEC)
  const exponent = isIecUnit
    ? storageUnitIEC.indexOf(unit as StorageUnitIEC)
    : storageUnit.indexOf(unit as StorageUnit)
  const ratio = isIecUnit ? 2 ** 10 : 10 ** 3
  return unit === 'B' ? val : val * ratio ** exponent
}

/**
 * 存储大小转换
 * @param val 待格式化的大小
 * @param config 格式化配置
 * @returns
 */
export function convertStorageSize(val: number, config?: FormatBytesConfig) {
  const to = config?.to
  const useIecUnit = to
    ? storageUnitIEC.includes(to as StorageUnitIEC)
    : !!config?.iec
  const ratio = useIecUnit ? 2 ** 10 : 10 ** 3
  const currentUnit: (StorageUnit | StorageUnitIEC)[] = useIecUnit
    ? storageUnitIEC
    : storageUnit
  const from = config?.from || 'B'
  const limitDecimals = config?.limitDecimals || 3
  // 1. 如果小于0或为NaN 直接返回
  if (val < 0 || Number.isNaN(val)) {
    return
  }
  // 将待格式化数据转换为字节
  const numberOfBytes = toByte(val, from)
  // 计算字节单位所在的index
  const exponent = Math.min(
    Math.floor(Math.log(numberOfBytes) / Math.log(ratio)),
    currentUnit.length - 1,
  )
  // 2. 如果前后(转换后的)转换的单位一致，则不需要转换
  if (from === to || (!to && from === currentUnit[exponent])) {
    return {
      value: val,
      unit: from,
    }
  }
  const diff = to ? currentUnit.indexOf(to) : exponent
  // 3. 单位格式化
  const formated = numberOfBytes / ratio ** diff
  return {
    value: roundWith(formated, limitDecimals),
    unit: currentUnit[diff],
  }
}

/**
 * 存储大小格式化
 * @param val 待格式化的大小
 * @param config 格式化配置
 * @returns
 */
export function formatStorageSize(val: number, config?: FormatBytesConfig) {
  const result = convertStorageSize(val, config)
  if (!result) {
    return
  }
  return `${result.value}${result.unit}`
}
