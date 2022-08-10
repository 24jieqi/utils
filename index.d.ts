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

export { div, ensurePrefix, ensureSuffix, execute, mul, plus, randomStr, slash, sub, template };
