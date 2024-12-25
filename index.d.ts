import dayjs from 'dayjs';

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
declare type StorageUnit = 'B' | 'kB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB';
declare type StorageUnitIEC = 'B' | 'KiB' | 'MiB' | 'GiB' | 'TiB' | 'PiB' | 'EiB' | 'ZiB' | 'YiB';
interface FormatBytesConfig {
    /**
     * 是否使用IEC单位，默认为`false`，如果指定了`to`则不生效
     */
    iec?: boolean;
    /**
     * 当前传入val的单位，默认为`B`
     */
    from?: StorageUnit | StorageUnitIEC;
    /**
     * 需要格式化成的单位，如果不指定，则默认格式化为最近的单位
     */
    to?: StorageUnit | StorageUnitIEC;
    /**
     * 保留的小数位，默认为`3`
     */
    limitDecimals?: number;
}
/**
 * 存储大小转换
 * @param val 待格式化的大小
 * @param config 格式化配置
 * @returns
 */
declare function convertStorageSize(val: number, config?: FormatBytesConfig): {
    value: number | undefined;
    unit: "B" | "kB" | "MB" | "GB" | "TB" | "PB" | "EB" | "ZB" | "YB" | "KiB" | "MiB" | "GiB" | "TiB" | "PiB" | "EiB" | "ZiB" | "YiB";
} | undefined;
/**
 * 存储大小格式化
 * @param val 待格式化的大小
 * @param config 格式化配置
 * @returns
 */
declare function formatStorageSize(val: number, config?: FormatBytesConfig): string | undefined;

/**
 * 是否是某种类型
 * @param t
 * @returns
 */
declare const isType: (t: 'Array' | 'Object' | 'Function' | 'AsyncFunction' | 'String' | 'Number' | 'Null' | 'Undefined' | 'Map' | 'Set' | 'RegExp') => (v: any) => boolean;
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

declare type FormatMode = 'date' | 'time' | 'date-time';
declare type FormatRule = 'no-current-year';
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
    /**
     * 预定义规则
     */
    rule?: FormatRule | RuleFunc;
}
declare type RuleFunc = (date: TimestampOrDate, template: string) => string;
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
 * @param reviseUnit 修正日期类型（及按怎样的日期类型展示） 默认为unit
 * @param base 基准日期 默认为 dayjs()
 */
declare function getRangeDate(range: number, unit: dayjs.ManipulateType, reviseUnit?: dayjs.ManipulateType, base?: TimestampOrDate | dayjs.Dayjs): [Date, Date];
declare type TimeType = 'ms' | 's' | 'm' | 'h' | 'd';
interface FormatDurationConfig {
    /**
     * 原时间类型，默认为`ms`
     */
    from?: TimeType;
    /**
     * 目标时间类型，如果未指定，将会将会自动格式化为最近可读的时间
     */
    to?: TimeType;
    /**
     * 本地化输出，默认为`false`
     */
    locale?: boolean;
}
/**
 * 时长格式化
 * @param val 需要格式化的时长
 * @param config 配置
 * @returns
 */
declare function formatDuration(val: number, config?: FormatDurationConfig): string | undefined;

export { FormatBytesConfig, FormatDurationConfig, abbrNumberFormat, add, ceilWith, convertStorageSize, div, ensurePrefix, ensureSuffix, execute, floorWith, formatDate, formatDuration, formatRangeDate, formatStorageSize, getRangeDate, isArray, isDef, isFunction, isLicensePlateNumber, isMobile, isNullish, isObject, isPromise, isType, minus, mul, plus, randomStr, roundWith, slash, sub, template, times, toDecimalMark };
