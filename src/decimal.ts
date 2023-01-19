import { Decimal } from 'decimal.js-light'

import type { FormulaNode } from './math'
import { BasicOperatorTypeEnum, parseFormula } from './math'

function recursion(ast: FormulaNode): Decimal {
  switch (ast.type) {
    case BasicOperatorTypeEnum.ADD:
      return recursion(ast.left!).plus(recursion(ast.right!))
    case BasicOperatorTypeEnum.SUB:
      return recursion(ast.left!).sub(recursion(ast.right!))
    case BasicOperatorTypeEnum.MULTI:
      return recursion(ast.left!).mul(recursion(ast.right!))
    case BasicOperatorTypeEnum.DIV:
      return recursion(ast.left!).div(recursion(ast.right!))
    default:
      return new Decimal(ast.value!)
  }
}

/**
 * 传入数值计算表达式，计算精确的结果（只支持加减乘除四则运算）
 * @param expression
 * @returns
 */
export function execute(expression: string) {
  if (!expression) {
    return
  }
  try {
    const ast = parseFormula(expression)
    return recursion(ast).toNumber()
  } catch {}
}

/**
 * 数值计算加
 * @param params
 * @returns
 */
export function plus(...params: number[]) {
  if (!params || !params.length) {
    return
  }
  let result = new Decimal(0)
  params.forEach(num => {
    result = result.plus(new Decimal(num))
  })
  return result.toNumber()
}

/**
 * 数值计算加（同plus）
 */
export const add = plus

/**
 * 数值计算减
 * @param params
 * @returns
 */
export function sub(...params: number[]) {
  if (!params || !params.length) {
    return
  }
  let result = new Decimal(params[0])
  for (let i = 1; i <= params.length - 1; i += 1) {
    result = result.sub(new Decimal(params[i]))
  }
  return result.toNumber()
}

/**
 * 数值计算减（同sub）
 */
export const minus = sub

/**
 * 数值计算乘
 * @param params
 * @returns
 */
export function mul(...params: number[]) {
  if (!params || !params.length) {
    return
  }
  let result = new Decimal(1)
  params.forEach(num => {
    result = result.mul(new Decimal(num))
  })
  return result.toNumber()
}

/**
 * 数值计算乘（同mul）
 */
export const times = mul

/**
 * 数值计算除
 * @param params
 * @returns
 */
export function div(...params: number[]) {
  if (!params || !params.length) {
    return
  }
  let result = new Decimal(params[0])
  for (let i = 1; i <= params.length - 1; i += 1) {
    result = result.div(new Decimal(params[i]))
  }
  return result.toNumber()
}
