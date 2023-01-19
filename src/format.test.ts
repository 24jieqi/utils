import { it, expect, describe } from 'vitest'

import {
  ceilWith,
  floorWith,
  roundWith,
  toDecimalMark,
  abbrNumberFormat,
} from './format'

describe('Format', () => {
  it('ceilWith function correct', () => {
    expect(ceilWith(1.925, 2)).toEqual(1.93)
    expect(ceilWith(1.924999)).toEqual(2)
    expect(ceilWith(1.924999, 2)).toEqual(1.93)
    expect(ceilWith(-1.924999, 2)).toEqual(-1.93)
    expect(ceilWith(1.920000001, 2)).toEqual(1.92)
  })
  it('floorWith function correct', () => {
    expect(floorWith(1.2048, 2)).toEqual(1.2)
    expect(floorWith(1.2048, 0)).toEqual(1.2)
    expect(floorWith(1.29999, 2)).toEqual(1.29)
    expect(floorWith(-1.29999, 2)).toEqual(-1.3)
  })
  it('roundWith function correct', () => {
    expect(roundWith(1.2048, 2)).toEqual(1.2)
    expect(roundWith(1.2048)).toEqual(1)
    expect(roundWith(1.29999, 2)).toEqual(1.3)
    expect(roundWith(-1.2048, 2)).toEqual(-1.2)
  })
  it('toDecimalMark function correct', () => {
    expect(toDecimalMark(100)).toEqual('100')
    expect(toDecimalMark(99.74)).toEqual('99.74')
    expect(toDecimalMark(17479.925)).toEqual('17,479.925')
    expect(toDecimalMark(17479.925, 2)).toEqual('17,479.93')
    expect(toDecimalMark(17479)).toEqual('17,479')
    expect(toDecimalMark(-920.35)).toEqual('-920.35')
    expect(toDecimalMark(-1920)).toEqual('-1,920')
  })
  it('abbrNumberFormat function correct', () => {
    expect(abbrNumberFormat(12312331.33123, 2).toString()).toEqual('1,231.23万')
    expect(abbrNumberFormat(12111312331.33123, 2).toString()).toEqual(
      '121.11亿',
    )
    expect(abbrNumberFormat(12312331.33123, 2, false).toString()).toEqual(
      '1231.23万',
    )
    expect(abbrNumberFormat(12312331.33123, 2, false).valueOf!()).toEqual(
      '1231.23万',
    )
    expect(abbrNumberFormat('', 2, false).toString()).toEqual('')
  })
})
