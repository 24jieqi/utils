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
 * 数值计算减
 * @param params
 * @returns
 */
declare function sub(...params: number[]): number | undefined;
/**
 * 数值计算乘
 * @param params
 * @returns
 */
declare function mul(...params: number[]): number | undefined;
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

export { ceilWith, div, ensurePrefix, ensureSuffix, execute, floorWith, mul, plus, randomStr, roundWith, slash, sub, template, toDecimalMark };
