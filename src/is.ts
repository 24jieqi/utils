/**
 * 是否是某种类型
 * @param t
 * @returns
 */
export const isType =
  (
    t:
      | 'Array'
      | 'Object'
      | 'Function'
      | 'AsyncFunction'
      | 'String'
      | 'Number'
      | 'Null'
      | 'Undefined'
      | 'Map'
      | 'Set'
      | 'RegExp',
  ) =>
  (v: any) =>
    Object.prototype.toString.call(v) === `[object ${t}]`
/**
 * 判断是否定义(null、undefined会被识别为未定义)
 * @param val
 * @returns
 */
export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

/**
 * 是否是数组（基于isType的实现）
 * @param v
 * @returns
 */
export const isArray = <T>(v: T[]): v is T[] => isType('Array')(v)

/**
 * 是否是对象（基于isType的实现）
 * @param v
 * @returns
 */
export const isObject = <T>(v: T): v is T => isType('Object')(v)

/**
 * 是否是函数（基于isType的实现）
 * @param v
 * @returns
 */
export const isFunction = (v: any): v is Function =>
  isType('Function')(v) || isType('AsyncFunction')(v)

/**
 * 是否是Promise（鸭子类型判断）
 * @param val
 * @returns
 */
export const isPromise = <T = any>(val: any): val is Promise<T> => {
  return isDef(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 判断是否是手机号码（部分国家和地区）
 * @param value
 * @returns
 */
export function isMobile(value: string): boolean {
  const temp = value.replace(/[^-|\d]/g, '')
  return /^((\+86)|(86))?(1)\d{10}$/.test(temp) || /^0[0-9-]{10,13}$/.test(temp)
}

/**
 * 空判断（相比isDef而言多了对空字符串的判断）
 * @param value
 * @returns
 */
export function isNullish(value: any) {
  return ['', undefined, null].includes(value)
}

/**
 * 车牌号校验（仅支持中国）
 * @param value
 * @returns
 */
export function isLicensePlateNumber(value: string) {
  if (!value) {
    return false
  }
  const reg =
    /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DABCEFGHJK]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
  return reg.test(value)
}
