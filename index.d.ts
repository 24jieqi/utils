/// <reference path="./node_modules/.pnpm/dayjs@1.11.7/node_modules/dayjs/locale/index.d.ts" />
/**
 * Replace backslash to slash
 *
 * @category String
 */
declare function slash(str: string): string;
/**
 * Ensure prefix of a string
 *
 * @category String
 */
declare function ensurePrefix(prefix: string, str: string): string;
/**
 * Ensure suffix of a string
 *
 * @category String
 */
declare function ensureSuffix(suffix: string, str: string): string;
/**
 * Dead simple template engine, just like Python's `.format()`
 *
 * @category String
 * @example
 * ```
 * const result = template(
 *   'Hello {0}! My name is {1}.',
 *   'Inès',
 *   'Anthony'
 * ) // Hello Inès! My name is Anthony.
 * ```
 */
declare function template(str: string, ...args: any[]): string;
/**
 * Generate a random string
 * @category String
 */
declare function randomStr(size?: number, dict?: string): string;

/**
 * 传入数值计算表达式，计算精确的结果（只支持加减乘除四则运算）
 * @param expression
 * @returns
 */
declare function execute(expression: string): number | undefined;
/**
 * 数值计算加
 * @param params
 * @returns
 */
declare function plus(...params: number[]): number | undefined;
/**
 * 数值计算加（同plus）
 */
declare const add: typeof plus;
/**
 * 数值计算减
 * @param params
 * @returns
 */
declare function sub(...params: number[]): number | undefined;
/**
 * 数值计算减（同sub）
 */
declare const minus: typeof sub;
/**
 * 数值计算乘
 * @param params
 * @returns
 */
declare function mul(...params: number[]): number | undefined;
/**
 * 数值计算乘（同mul）
 */
declare const times: typeof mul;
/**
 * 数值计算除
 * @param params
 * @returns
 */
declare function div(...params: number[]): number | undefined;

/**
 * 向上取小数位
 * @param num 数字
 * @param fractionDigits 小数位（默认为0）
 * @returns
 */
declare function ceilWith(num: number, fractionDigits?: number): number | undefined;
/**
 * 向下取（最多）小数位
 * @param num
 * @param fractionDigits 小数位（默认为0）
 * @returns
 */
declare function floorWith(num: number, fractionDigits?: number): number | undefined;
/**
 * 四舍五入取（最多）小数位
 * @param num 待舍入的数字
 * @param fractionDigits 小数位（默认为0）
 * @returns
 */
declare function roundWith(num: number, fractionDigits?: number): number | undefined;
/**
 * 数字千分位格式化
 * @param val 待格式化的数字
 * @param limitDecimals 小数位，传入后将使用四舍五入
 * @returns
 */
declare function toDecimalMark(val: number, limitDecimals?: number): string | undefined;
/**
 * 数字缩写
 * @param val 待格式化的数字
 * @param limitDecimals 小数位，传入后将使用四舍五入
 * @param useGrouping 是否使用千分位格式化
 * @returns 格式化的数字
 */
declare const abbrNumberFormat: (val: number | string, maximumFractionDigits?: number, useGrouping?: boolean) => {
    num: number;
    abbrStr: string;
    toString: () => string;
    valueOf?: undefined;
} | {
    num: string | number | undefined;
    abbrStr: string;
    valueOf: () => string;
    toString: () => string;
};

/**
 * 是否是某种类型
 * @param t
 * @returns
 */
declare const isType: (t: 'Array' | 'Object' | 'Function' | 'String' | 'Number' | 'Null' | 'Undefined' | 'Map' | 'Set' | 'RegExp') => (v: any) => boolean;
/**
 * 判断是否定义(null、undefined会被识别为未定义)
 * @param val
 * @returns
 */
declare function isDef<T>(val: T): val is NonNullable<T>;
/**
 * 是否是数组（基于isType的实现）
 * @param v
 * @returns
 */
declare const isArray: <T>(v: T[]) => v is T[];
/**
 * 是否是对象（基于isType的实现）
 * @param v
 * @returns
 */
declare const isObject: <T>(v: T) => v is T;
/**
 * 是否是函数（基于isType的实现）
 * @param v
 * @returns
 */
declare const isFunction: (v: any) => v is Function;
/**
 * 是否是Promise（鸭子类型判断）
 * @param val
 * @returns
 */
declare const isPromise: <T = any>(val: any) => val is Promise<T>;
/**
 * 判断是否是手机号码（部分国家和地区）
 * @param value
 * @returns
 */
declare function isMobile(value: string): boolean;
/**
 * 空判断（相比isDef而言多了对空字符串的判断）
 * @param value
 * @returns
 */
declare function isNullish(value: any): boolean;
/**
 * 车牌号校验（仅支持中国）
 * @param value
 * @returns
 */
declare function isLicensePlateNumber(value: string): boolean;

declare function dayjs (date?: dayjs.ConfigType): dayjs.Dayjs

declare function dayjs (date?: dayjs.ConfigType, format?: dayjs.OptionType, strict?: boolean): dayjs.Dayjs

declare function dayjs (date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean): dayjs.Dayjs

declare namespace dayjs {
  interface ConfigTypeMap {
    default: string | number | Date | Dayjs | null | undefined
  }

  export type ConfigType = ConfigTypeMap[keyof ConfigTypeMap]

  export interface FormatObject { locale?: string, format?: string, utc?: boolean }

  export type OptionType = FormatObject | string | string[]

  export type UnitTypeShort = 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

  export type UnitTypeLong = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date'

  export type UnitTypeLongPlural = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' | 'dates'
  
  export type UnitType = UnitTypeLong | UnitTypeLongPlural | UnitTypeShort;

  export type OpUnitType = UnitType | "week" | "weeks" | 'w';
  export type QUnitType = UnitType | "quarter" | "quarters" | 'Q';
  export type ManipulateType = Exclude<OpUnitType, 'date' | 'dates'>;
  class Dayjs {
    constructor (config?: ConfigType)
    /**
     * All Day.js objects are immutable. Still, `dayjs#clone` can create a clone of the current object if you need one.
     * ```
     * dayjs().clone()// => Dayjs
     * dayjs(dayjs('2019-01-25')) // passing a Dayjs object to a constructor will also clone it
     * ```
     * Docs: https://day.js.org/docs/en/parse/dayjs-clone
     */
    clone(): Dayjs
    /**
     * This returns a `boolean` indicating whether the Day.js object contains a valid date or not.
     * ```
     * dayjs().isValid()// => boolean
     * ```
     * Docs: https://day.js.org/docs/en/parse/is-valid
     */
    isValid(): boolean
    /**
     * Get the year.
     * ```
     * dayjs().year()// => 2020
     * ```
     * Docs: https://day.js.org/docs/en/get-set/year
     */
    year(): number
    /**
     * Set the year.
     * ```
     * dayjs().year(2000)// => Dayjs
     * ```
     * Docs: https://day.js.org/docs/en/get-set/year
     */
    year(value: number): Dayjs
    /**
     * Get the month.
     *
     * Months are zero indexed, so January is month 0.
     * ```
     * dayjs().month()// => 0-11
     * ```
     * Docs: https://day.js.org/docs/en/get-set/month
     */
    month(): number
    /**
     * Set the month.
     *
     * Months are zero indexed, so January is month 0.
     *
     * Accepts numbers from 0 to 11. If the range is exceeded, it will bubble up to the next year.
     * ```
     * dayjs().month(0)// => Dayjs
     * ```
     * Docs: https://day.js.org/docs/en/get-set/month
     */
    month(value: number): Dayjs
    /**
     * Get the date of the month.
     * ```
     * dayjs().date()// => 1-31
     * ```
     * Docs: https://day.js.org/docs/en/get-set/date
     */
    date(): number
    /**
     * Set the date of the month.
     *
     * Accepts numbers from 1 to 31. If the range is exceeded, it will bubble up to the next months.
     * ```
     * dayjs().date(1)// => Dayjs
     * ```
     * Docs: https://day.js.org/docs/en/get-set/date
     */
    date(value: number): Dayjs
    /**
     * Get the day of the week.
     *
     * Returns numbers from 0 (Sunday) to 6 (Saturday).
     * ```
     * dayjs().day()// 0-6
     * ```
     * Docs: https://day.js.org/docs/en/get-set/day
     */
    day(): number
    /**
     * Set the day of the week.
     *
     * Accepts numbers from 0 (Sunday) to 6 (Saturday). If the range is exceeded, it will bubble up to next weeks.
     * ```
     * dayjs().day(0)// => Dayjs
     * ```
     * Docs: https://day.js.org/docs/en/get-set/day
     */
    day(value: number): Dayjs
    /**
     * Get the hour.
     * ```
     * dayjs().hour()// => 0-23
     * ```
     * Docs: https://day.js.org/docs/en/get-set/hour
     */
    hour(): number
    /**
     * Set the hour.
     *
     * Accepts numbers from 0 to 23. If the range is exceeded, it will bubble up to the next day.
     * ```
     * dayjs().hour(12)// => Dayjs
     * ```
     * Docs: https://day.js.org/docs/en/get-set/hour
     */
    hour(value: number): Dayjs
    /**
     * Get the minutes.
     * ```
     * dayjs().minute()// => 0-59
     * ```
     * Docs: https://day.js.org/docs/en/get-set/minute
     */
    minute(): number
    /**
     * Set the minutes.
     *
     * Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the next hour.
     * ```
     * dayjs().minute(59)// => Dayjs
     * ```
     * Docs: https://day.js.org/docs/en/get-set/minute
     */
    minute(value: number): Dayjs
    /**
     * Get the seconds.
     * ```
     * dayjs().second()// => 0-59
     * ```
     * Docs: https://day.js.org/docs/en/get-set/second
     */
    second(): number
    /**
     * Set the seconds.
     *
     * Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the next minutes.
     * ```
     * dayjs().second(1)// Dayjs
     * ```
     */
    second(value: number): Dayjs
    /**
     * Get the milliseconds.
     * ```
     * dayjs().millisecond()// => 0-999
     * ```
     * Docs: https://day.js.org/docs/en/get-set/millisecond
     */
    millisecond(): number
    /**
     * Set the milliseconds.
     *
     * Accepts numbers from 0 to 999. If the range is exceeded, it will bubble up to the next seconds.
     * ```
     * dayjs().millisecond(1)// => Dayjs
     * ```
     * Docs: https://day.js.org/docs/en/get-set/millisecond
     */
    millisecond(value: number): Dayjs
    /**
     * Generic setter, accepting unit as first argument, and value as second, returns a new instance with the applied changes.
     *
     * In general:
     * ```
     * dayjs().set(unit, value) === dayjs()[unit](value)
     * ```
     * Units are case insensitive, and support plural and short forms.
     * ```
     * dayjs().set('date', 1)
     * dayjs().set('month', 3) // April
     * dayjs().set('second', 30)
     * ```
     * Docs: https://day.js.org/docs/en/get-set/set
     */
    set(unit: UnitType, value: number): Dayjs
    /**
     * String getter, returns the corresponding information getting from Day.js object.
     *
     * In general:
     * ```
     * dayjs().get(unit) === dayjs()[unit]()
     * ```
     * Units are case insensitive, and support plural and short forms.
     * ```
     * dayjs().get('year')
     * dayjs().get('month') // start 0
     * dayjs().get('date')
     * ```
     * Docs: https://day.js.org/docs/en/get-set/get
     */
    get(unit: UnitType): number
    /**
     * Returns a cloned Day.js object with a specified amount of time added.
     * ```
     * dayjs().add(7, 'day')// => Dayjs
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/manipulate/add
     */
    add(value: number, unit?: ManipulateType): Dayjs
    /**
     * Returns a cloned Day.js object with a specified amount of time subtracted.
     * ```
     * dayjs().subtract(7, 'year')// => Dayjs
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/manipulate/subtract
     */
    subtract(value: number, unit?: ManipulateType): Dayjs
    /**
     * Returns a cloned Day.js object and set it to the start of a unit of time.
     * ```
     * dayjs().startOf('year')// => Dayjs
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/manipulate/start-of
     */
    startOf(unit: OpUnitType): Dayjs
    /**
     * Returns a cloned Day.js object and set it to the end of a unit of time.
     * ```
     * dayjs().endOf('month')// => Dayjs
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/manipulate/end-of
     */
    endOf(unit: OpUnitType): Dayjs
    /**
     * Get the formatted date according to the string of tokens passed in.
     *
     * To escape characters, wrap them in square brackets (e.g. [MM]).
     * ```
     * dayjs().format()// => current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
     * dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')// 'YYYYescape 2019-01-25T00:00:00-02:00Z'
     * dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
     * ```
     * Docs: https://day.js.org/docs/en/display/format
     */
    format(template?: string): string
    /**
     * This indicates the difference between two date-time in the specified unit.
     *
     * To get the difference in milliseconds, use `dayjs#diff`
     * ```
     * const date1 = dayjs('2019-01-25')
     * const date2 = dayjs('2018-06-05')
     * date1.diff(date2) // 20214000000 default milliseconds
     * date1.diff() // milliseconds to current time
     * ```
     *
     * To get the difference in another unit of measurement, pass that measurement as the second argument.
     * ```
     * const date1 = dayjs('2019-01-25')
     * date1.diff('2018-06-05', 'month') // 7
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/display/difference
     */
    diff(date?: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number
    /**
     * This returns the number of **milliseconds** since the Unix Epoch of the Day.js object.
     * ```
     * dayjs('2019-01-25').valueOf() // 1548381600000
     * +dayjs(1548381600000) // 1548381600000
     * ```
     * To get a Unix timestamp (the number of seconds since the epoch) from a Day.js object, you should use Unix Timestamp `dayjs#unix()`.
     *
     * Docs: https://day.js.org/docs/en/display/unix-timestamp-milliseconds
     */
    valueOf(): number
    /**
     * This returns the Unix timestamp (the number of **seconds** since the Unix Epoch) of the Day.js object.
     * ```
     * dayjs('2019-01-25').unix() // 1548381600
     * ```
     * This value is floored to the nearest second, and does not include a milliseconds component.
     *
     * Docs: https://day.js.org/docs/en/display/unix-timestamp
     */
    unix(): number
    /**
     * Get the number of days in the current month.
     * ```
     * dayjs('2019-01-25').daysInMonth() // 31
     * ```
     * Docs: https://day.js.org/docs/en/display/days-in-month
     */
    daysInMonth(): number
    /**
     * To get a copy of the native `Date` object parsed from the Day.js object use `dayjs#toDate`.
     * ```
     * dayjs('2019-01-25').toDate()// => Date
     * ```
     */
    toDate(): Date
    /**
     * To serialize as an ISO 8601 string.
     * ```
     * dayjs('2019-01-25').toJSON() // '2019-01-25T02:00:00.000Z'
     * ```
     * Docs: https://day.js.org/docs/en/display/as-json
     */
    toJSON(): string
    /**
     * To format as an ISO 8601 string.
     * ```
     * dayjs('2019-01-25').toISOString() // '2019-01-25T02:00:00.000Z'
     * ```
     * Docs: https://day.js.org/docs/en/display/as-iso-string
     */
    toISOString(): string
    /**
     * Returns a string representation of the date.
     * ```
     * dayjs('2019-01-25').toString() // 'Fri, 25 Jan 2019 02:00:00 GMT'
     * ```
     * Docs: https://day.js.org/docs/en/display/as-string
     */
    toString(): string
    /**
     * Get the UTC offset in minutes.
     * ```
     * dayjs().utcOffset()
     * ```
     * Docs: https://day.js.org/docs/en/manipulate/utc-offset
     */
    utcOffset(): number
    /**
     * This indicates whether the Day.js object is before the other supplied date-time.
     * ```
     * dayjs().isBefore(dayjs('2011-01-01')) // default milliseconds
     * ```
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * ```
     * dayjs().isBefore('2011-01-01', 'year')// => boolean
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/query/is-before
     */
    isBefore(date: ConfigType, unit?: OpUnitType): boolean
    /**
     * This indicates whether the Day.js object is the same as the other supplied date-time.
     * ```
     * dayjs().isSame(dayjs('2011-01-01')) // default milliseconds
     * ```
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * ```
     * dayjs().isSame('2011-01-01', 'year')// => boolean
     * ```
     * Docs: https://day.js.org/docs/en/query/is-same
     */
    isSame(date: ConfigType, unit?: OpUnitType): boolean
    /**
     * This indicates whether the Day.js object is after the other supplied date-time.
     * ```
     * dayjs().isAfter(dayjs('2011-01-01')) // default milliseconds
     * ```
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * ```
     * dayjs().isAfter('2011-01-01', 'year')// => boolean
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/query/is-after
     */
    isAfter(date: ConfigType, unit?: OpUnitType): boolean

    locale(): string

    locale(preset: string | ILocale, object?: Partial<ILocale>): Dayjs
  }

  export type PluginFunc<T = unknown> = (option: T, c: typeof Dayjs, d: typeof dayjs) => void

  export function extend<T = unknown>(plugin: PluginFunc<T>, option?: T): Dayjs

  export function locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string

  export function isDayjs(d: any): d is Dayjs

  export function unix(t: number): Dayjs

  const Ls : { [key: string] :  ILocale }
}

declare type FormatMode = 'date' | 'time' | 'date-time';
declare type TimestampOrDate = number | Date;
interface FormatDateOptions {
    /**
     * 格式化模式
     */
    mode?: FormatMode;
    /**
     * 自定义格式化模版
     */
    template?: string;
}
/**
 * 时间日期格式化
 * @param time Date类型对象或者时间戳
 * @param option 格式化选项
 * @returns { string }
 */
declare function formatDate(time: TimestampOrDate, option?: FormatDateOptions): string;
interface FormatRangeDateOptions extends FormatDateOptions {
    /**
     * 日期为空时的占位符
     * @default '~'
     */
    empty?: string;
    /**
     * 日期范围连接符
     * @default '至'
     */
    spliter?: string;
}
declare type RangeDate = TimestampOrDate | null | undefined;
/**
 * 日期范围选择器格式化
 * @param rangeDateList Date
 * @param format string 格式
 * @returns string
 */
declare function formatRangeDate(rangeDateList: [RangeDate, RangeDate], option?: FormatRangeDateOptions): string;
/**
 * 获取时间段日期
 * @param range 时间段偏移（负数为基准日期向前偏移）
 * @param unit 偏移日期类型
 * @param base 基准日期 默认为 dayjs()
 */
declare function getRangeDate(range: number, unit: dayjs.ManipulateType, base?: TimestampOrDate | dayjs.Dayjs): [Date, Date];

export { abbrNumberFormat, add, ceilWith, div, ensurePrefix, ensureSuffix, execute, floorWith, formatDate, formatRangeDate, getRangeDate, isArray, isDef, isFunction, isLicensePlateNumber, isMobile, isNullish, isObject, isPromise, isType, minus, mul, plus, randomStr, roundWith, slash, sub, template, times, toDecimalMark };
