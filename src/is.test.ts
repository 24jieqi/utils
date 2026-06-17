import { describe, expect, it } from 'vitest'

import {
  isArray,
  isDef,
  isFunction,
  isLicensePlateNumber,
  isMobile,
  isNullish,
  isObject,
  isPromise,
  isType,
} from './is'

describe('is', () => {
  it('isType', () => {
    const isNumber = isType('Number')
    expect(isNumber(1.25)).toEqual(true)
    expect(isDef(null)).toEqual(false)
    expect(isDef(undefined)).toEqual(false)
    expect(isDef('')).toEqual(true)
    expect(isDef(0)).toEqual(true)
    expect(isArray([])).toEqual(true)
    expect(isArray('[array]' as any)).toEqual(false)
    expect(isObject(null)).toEqual(false)
    expect(isObject({})).toEqual(true)
    expect(isObject('{name: "limoer"}')).toEqual(false)
    const noop = () => {}
    async function a() {
      return 1
    }
    expect(isFunction(noop)).toEqual(true)
    expect(isFunction(a)).toEqual(true)
    const promise = new Promise(() => {})
    expect(isPromise(promise)).toEqual(true)
    const func = () => {}
    // biome-ignore lint/suspicious/noThenProperty: testing isPromise detection
    func.then = () => {}
    func.catch = () => {}
    expect(isPromise(func)).toEqual(true)
    expect(isNullish('')).toEqual(true)
    expect(isNullish(null)).toEqual(true)
    expect(isNullish(undefined)).toEqual(true)
  })
  it('isMobile', () => {
    expect(isMobile('13212345678')).toEqual(true)
    expect(isMobile('+8613212345678')).toEqual(true)
    expect(isMobile('861321234567')).toEqual(false)
    expect(isMobile('渝A 50A52')).toEqual(false)
    expect(isMobile('渝A5OA52')).toEqual(false)
    expect(isMobile('渝A50I52')).toEqual(false)
  })
  it('isLicensePlateNumber', () => {
    expect(isLicensePlateNumber('')).toEqual(false)
    expect(isLicensePlateNumber('渝A50A52')).toEqual(true)
  })
})
