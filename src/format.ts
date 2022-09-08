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
  const temp =
    typeof limitDecimals !== 'undefined' ? roundWith(val, limitDecimals) : val
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
  return r + (fraction ? '.' + fraction : '')
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

  if (resNumber > 100000000) {
    resNumber = resNumber / 100000000
    abbr = '亿'
  } else {
    if (resNumber > 10000) {
      resNumber = resNumber / 10000
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
