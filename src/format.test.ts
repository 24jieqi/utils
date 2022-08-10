import { it, expect } from 'vitest'

import { ceilWith, floorWith, roundWith, toDecimalMark } from './format'

it('format', () => {
  expect(ceilWith(1.925, 2)).toEqual(1.93)
  expect(ceilWith(1.924999, 2)).toEqual(1.93)
  expect(floorWith(1.2048, 2)).toEqual(1.2)
  expect(floorWith(1.29999, 2)).toEqual(1.29)
  expect(roundWith(1.2048, 2)).toEqual(1.2)
  expect(roundWith(1.29999, 2)).toEqual(1.3)
  expect(toDecimalMark(17479.925)).toEqual('17,479.925')
  expect(toDecimalMark(17479.925, 2)).toEqual('17,479.93')
})
