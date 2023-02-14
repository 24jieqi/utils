import { describe, expect, it } from 'vitest'

import { plus, add, div, sub, minus, mul, execute, times } from './decimal'

describe('Decimal', () => {
  it('plus function correct', () => {
    expect(plus(1, 2)).toEqual(3)
    expect(plus()).toBeUndefined()
    expect(plus(1, 2, 4)).toEqual(7)
    expect(add(1, 2)).toEqual(3)
    expect(add()).toBeUndefined()
    expect(add(1, 2, 4)).toEqual(7)
  })
  it('sub function correct', () => {
    expect(sub(99, 21)).toEqual(78)
    expect(sub()).toBeUndefined()
    expect(sub(10)).toEqual(10)
    expect(minus(99, 21)).toEqual(78)
    expect(minus()).toBeUndefined()
    expect(minus(10)).toEqual(10)
  })
  it('mul function correct', () => {
    expect(mul(1, 99)).toEqual(99)
    expect(mul()).toBeUndefined()
    expect(times(1, 99)).toEqual(99)
    expect(times()).toBeUndefined()
  })
  it('div function correct', () => {
    expect(div(10, 2)).toEqual(5)
    expect(div(10)).toEqual(10)
    expect(div()).toBeUndefined()
  })
  it('execute function correct', () => {
    expect(execute('(1+2)*3/6-1')).toEqual(0.5)
    expect(execute(' (1+2)*3/6-1 ')).toEqual(0.5)
    expect(execute('((1+(-2))*3/6-1)')).toEqual(-1.5)
    expect(execute('((1+(-2))*3/6-notanumber)')).toBeUndefined()
    expect(execute('')).toBeUndefined()
  })
})
