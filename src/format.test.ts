import { it, expect, describe } from 'vitest'

import {
  ceilWith,
  floorWith,
  roundWith,
  toDecimalMark,
  abbrNumberFormat,
  formatStorageSize,
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
    expect(floorWith(1.2048, 0)).toEqual(1)
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
  it('formatStorageSize function correct', () => {
    expect(formatStorageSize(-10)).toBeUndefined()
    expect(formatStorageSize(NaN)).toBeUndefined()
    expect(formatStorageSize(1000)).toBe('1kB')
    expect(formatStorageSize(1024, { iec: true })).toBe('1KiB')
    expect(formatStorageSize(450)).toBe('450B')
    expect(formatStorageSize(1000, { iec: true })).toBe('1000B')
    expect(formatStorageSize(1024 ** 2)).toBe('1.049MB')
    expect(formatStorageSize(1024 ** 2, { iec: true })).toBe('1MiB')
    expect(formatStorageSize(1024, { from: 'MB' })).toBe('1.024GB')
    expect(formatStorageSize(1024, { from: 'MB', iec: true })).toBe(
      '976.563MiB',
    ) // 1024MB = 976.563MiB
    expect(formatStorageSize(1024, { from: 'MB', iec: true, to: 'kB' })).toBe(
      '1024000kB',
    ) // 指定了to后 iec配置失效
    expect(formatStorageSize(1024, { from: 'MB', to: 'kB' })).toBe('1024000kB') // 指定了to后 iec配置失效
    expect(formatStorageSize(1024, { from: 'MB', to: 'KiB' })).toBe(
      '1000000KiB',
    ) // MB => KiB
    expect(formatStorageSize(1024, { from: 'MiB', to: 'GiB' })).toBe('1GiB') // MB => KiB
    expect(formatStorageSize(1024, { from: 'MiB', to: 'GB' })).toBe('1.074GB') // MB => KiB
    expect(
      formatStorageSize(1024, { from: 'MiB', to: 'GB', limitDecimals: 2 }),
    ).toBe('1.07GB') // MB => KiB
  })
})
