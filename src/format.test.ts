import { it, expect } from 'vitest'

import {
  ceilWith,
  floorWith,
  roundWith,
  toDecimalMark,
  abbrNumberFormat,
} from './format'

it('format', () => {
  expect(ceilWith(1.925, 2)).toEqual(1.93)
  let num = undefined as any
  expect(ceilWith(num, 2)).toBeUndefined()
  expect(ceilWith(1.924999, 2)).toEqual(1.93)
  expect(ceilWith(1.924999, 0)).toEqual(2)
  expect(ceilWith(-1.924999, 2)).toEqual(-1.93)
  expect(ceilWith(1.920000001, 2)).toEqual(1.92)
  expect(floorWith(num, 2)).toBeUndefined()
  expect(floorWith(1.2048, 2)).toEqual(1.2)
  expect(floorWith(1.29999, 2)).toEqual(1.29)
  expect(roundWith(num, 2)).toBeUndefined()
  expect(roundWith(1.2048, 2)).toEqual(1.2)
  expect(roundWith(1.29999, 2)).toEqual(1.3)
  expect(toDecimalMark(num, 2)).toBeUndefined()
  expect(toDecimalMark(17479.925)).toEqual('17,479.925')
  expect(toDecimalMark(17479.925, 2)).toEqual('17,479.93')
  expect(toDecimalMark(17479)).toEqual('17,479')
  expect(toDecimalMark(-920.35)).toEqual('-920.35')
  expect(toDecimalMark(-1920)).toEqual('-1,920')
  expect(abbrNumberFormat(12312331.33123, 2).toString()).toEqual('1,231.23万')
  expect(abbrNumberFormat(12111312331.33123, 2).toString()).toEqual('121.11亿')
  expect(abbrNumberFormat(12312331.33123, 2, false).toString()).toEqual(
    '1231.23万',
  )
  expect(abbrNumberFormat(12312331.33123, 2, false).valueOf!()).toEqual(
    '1231.23万',
  )
  expect(abbrNumberFormat('', 2, false).toString()).toEqual('')
})
