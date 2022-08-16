import { expect, it } from 'vitest'

import {
  template,
  slash,
  ensurePrefix,
  ensureSuffix,
  randomStr,
} from './string'

it('template', () => {
  expect(template('Hello {0}! My name is {1}.', 'Inès', 'Anthony')).toEqual(
    'Hello Inès! My name is Anthony.',
  )
  expect(template('Hello {xxx}! My name is {1}.', 'Inès', 'Anthony')).toEqual(
    'Hello {xxx}! My name is Anthony.',
  )

  expect(template('{0} + {1} = {2}{3}', 1, '1', { v: 2 }, [2, 3])).toEqual(
    '1 + 1 = [object Object]2,3',
  )

  expect(template('{10}')).toEqual('undefined')

  expect(template('Hi', '')).toEqual('Hi')
})

it('slash', () => {
  expect(slash('\\xx')).toEqual('/xx')
})

it('ensureStr', () => {
  expect(ensurePrefix('case', 'show')).toEqual('caseshow')
  expect(ensurePrefix('case', 'caseshow')).toEqual('caseshow')
  expect(ensureSuffix('case', 'show')).toEqual('showcase')
  expect(ensureSuffix('case', 'showcase')).toEqual('showcase')
})

it('randomStr', () => {
  expect(randomStr(10)).toHaveLength(10)
  const reg = /\d+/
  expect(reg.test(randomStr(10, '1234567890'))).toEqual(true)
})
