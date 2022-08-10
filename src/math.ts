/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-params */
export enum BasicOperatorTypeEnum {
  ADD = '+',
  SUB = '-',
  MULTI = '*',
  DIV = '/',
  VALUE = 'VALUE',
}

export interface FormulaNode {
  type: BasicOperatorTypeEnum
  left?: FormulaNode
  right?: FormulaNode
  value?: number
}

class FormulaParser {
  private stock: number[] = []
  private parenthesesPairPosition: Record<string, any> = {}
  private removeBlank(
    expression: string,
    rangeLeft: number,
    rangeRight: number,
  ) {
    const range = [rangeLeft, rangeRight]
    while (expression[range[0]] === ' ') {
      range[0] += 1
    }
    while (expression[range[1]] === ' ') {
      range[1] -= 1
    }
    return {
      rangeLeft: range[0],
      rangeRight: range[1],
    }
  }
  private removeParentheses(params: { rangeLeft: number; rangeRight: number }) {
    const range = [params.rangeLeft, params.rangeRight]
    if (this.parenthesesPairPosition[range[0]] === range[1]) {
      return [++range[0], --range[1]]
    }
    return range
  }
  parse(
    expression: string,
    left = 0,
    right = expression.length - 1,
    skipSearchTimeOrDivide = false,
  ): any {
    let isNumber = true
    let parenthesesDep = 0 // 记录小括号深度
    let firstTimeOrDivideOperator = null // 记录遇到的第一个 * / 运算符
    let firstTimeOrDivideOperatorIdx = null // 记录遇到的第一个 * / 运算符的位置
    let [l, r] = this.removeParentheses(
      this.removeBlank(expression, left, right),
    )
    for (let i = r; i >= l; i--) {
      const v = expression[i]
      if (v === ')') {
        this.stock.push(i)
        parenthesesDep++
      } else if (v === '(') {
        const last = this.stock.pop()
        this.parenthesesPairPosition[i] = last
        parenthesesDep--
      }
      // skipSearchTimeOrDivide 为 true 表示表达式是连续的 * /
      if (skipSearchTimeOrDivide && firstTimeOrDivideOperator) {
        return {
          type: firstTimeOrDivideOperator,
          left: this.parse(
            expression,
            l,
            firstTimeOrDivideOperatorIdx! - 1,
            true,
          ),
          right: this.parse(expression, firstTimeOrDivideOperatorIdx! + 1, r),
        }
      }
      if (i === l) {
        if (isNumber) {
          return {
            type: 'number',
            value: Number(expression.slice(l, r + 1).trim()),
          }
        }
        if (this.parenthesesPairPosition[i] === r) {
          return this.parse(expression, l + 1, r - 1)
        }
        // * / 拆分，需要遍历到最左侧，所里拆分逻辑写这里
        return {
          type: firstTimeOrDivideOperator,
          left: this.parse(
            expression,
            l,
            firstTimeOrDivideOperatorIdx! - 1,
            true,
          ),
          right: this.parse(expression, firstTimeOrDivideOperatorIdx! + 1, r),
        }
      }
      if (/[0-9]/.test(v) || v === ' ') {
        continue
      }
      isNumber = false
      // parenthesesDep === 0 进行表达式分析的时候要确保是同一层级
      if (parenthesesDep === 0 && (v === '+' || v === '-')) {
        return {
          type: v,
          left: this.parse(expression, l, i - 1),
          right: this.parse(expression, i + 1, r),
        }
      }
      if (
        parenthesesDep === 0 &&
        (v === '*' || v === '/') &&
        !firstTimeOrDivideOperator
      ) {
        firstTimeOrDivideOperator = v
        firstTimeOrDivideOperatorIdx = i
      }
    }
  }
}

/**
 * 解析数学表达式
 * @param expression 表达式
 * @returns { FormulaNode }
 */
export function parseFormula(expression: string): FormulaNode {
  const parser = new FormulaParser()
  return parser.parse(expression)
}
