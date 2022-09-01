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
 * 传入数值计算表达式，计算精确的结果
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

export { abbrNumberFormat, add, ceilWith, div, ensurePrefix, ensureSuffix, execute, floorWith, isArray, isDef, isFunction, isLicensePlateNumber, isMobile, isNullish, isObject, isPromise, isType, minus, mul, plus, randomStr, roundWith, slash, sub, template, times, toDecimalMark };
