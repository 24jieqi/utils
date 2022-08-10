import { expect, it } from 'vitest'

import { plus, div, sub, mul, execute } from './decimal'

it('decimal', () => {
  expect(execute('(1+2)*3/6')).toEqual(1.5)
  expect(plus(1, 2)).toEqual(3)
  expect(plus(1, 2, 4)).toEqual(7)
  expect(div(10, 2)).toEqual(5)
  expect(sub(99, 21)).toEqual(78)
  expect(mul(1 * 99)).toEqual(99)
})
