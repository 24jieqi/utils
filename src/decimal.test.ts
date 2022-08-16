import { expect, it } from 'vitest'

import { plus, div, sub, mul, execute } from './decimal'

it('decimal', () => {
  expect(execute('(1+2)*3/6-1')).toEqual(0.5)
  expect(execute(' (1+2)*3/6-1 ')).toEqual(0.5)
  expect(execute('((1+(-2))*3/6-1)')).toEqual(-1.5)
  expect(execute('((1+(-2))*3/6-dsadasd)')).toBeUndefined()
  expect(execute('')).toBeUndefined()
  expect(plus(1, 2)).toEqual(3)
  expect(plus()).toBeUndefined()
  expect(plus(1, 2, 4)).toEqual(7)
  expect(div(10, 2)).toEqual(5)
  expect(div()).toBeUndefined()
  expect(sub(99, 21)).toEqual(78)
  expect(sub()).toBeUndefined()
  expect(sub(10)).toEqual(10)
  expect(mul(1 * 99)).toEqual(99)
  expect(mul()).toBeUndefined()
})
