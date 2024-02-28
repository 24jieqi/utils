import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'

import {
  formatDate,
  formatDuration,
  formatRangeDate,
  getRangeDate,
} from './date'

describe('Date', () => {
  it('should formatDate correct', () => {
    const targetDate = new Date('2023-02-14')
    const targetTimestamp = new Date('2023-02-14').valueOf()
    expect(formatDate(targetDate)).toBe('2023-02-14')
    expect(formatDate(null as any)).toBe('')
    expect(formatDate(targetTimestamp)).toBe('2023-02-14')
    expect(formatDate(targetDate, { mode: 'date-time' })).toBe(
      '2023-02-14 08:00',
    )
    expect(formatDate(targetDate, { template: 'YYYY' })).toBe('2023')
    expect(
      formatDate(targetDate, { mode: 'date-time', template: 'YYYY' }),
    ).toBe('2023')
    expect(formatDate(targetDate, {})).toBe('2023-02-14')
    const currentYear = new Date().getFullYear()
    const currentDate = new Date(`${currentYear}-02-18 13:21:55`)
    expect(formatDate(currentDate, { rule: 'no-current-year' })).toBe('02-18')
    expect(
      formatDate(currentDate, { mode: 'date', rule: 'no-current-year' }),
    ).toBe(`02-18`)
    expect(
      formatDate(currentDate, {
        template: 'YYYY/MM/DD HH:mm',
        rule: (date, template) => {
          const isSameYear = dayjs(date).isSame(dayjs(), 'year')
          if (isSameYear) {
            return template.replace(/^YYYY\//, '')
          }
          return template
        },
      }),
    ).toBe(`02/18 13:21`)
  })
  it('should formatRangeDate correct', () => {
    const targetDate = new Date('2023-02-14')
    const targetTimestamp = new Date('2023-02-18').valueOf()
    expect(formatRangeDate([null, targetTimestamp])).toBe('~至2023-02-18')
    expect(formatRangeDate([targetDate, null])).toBe('2023-02-14至~')
    expect(formatRangeDate([null, undefined])).toBe('')
    expect(formatRangeDate([targetDate, targetTimestamp])).toBe(
      '2023-02-14至2023-02-18',
    )
    expect(
      formatRangeDate([targetDate, targetTimestamp], { mode: 'date-time' }),
    ).toBe('2023-02-14 08:00至2023-02-18 08:00')
    expect(
      formatRangeDate([targetDate, targetTimestamp], { template: 'MM-DD' }),
    ).toBe('02-14至02-18')
    expect(
      formatRangeDate([targetDate, targetTimestamp], {
        template: 'MM-DD',
        mode: 'date',
      }),
    ).toBe('02-14至02-18')
    expect(
      formatRangeDate([null, targetTimestamp], {
        empty: '--',
      }),
    ).toBe('--至2023-02-18')
    expect(
      formatRangeDate([targetDate, targetTimestamp], {
        spliter: ' To ',
      }),
    ).toBe('2023-02-14 To 2023-02-18')
  })
  it('should getRangeDate correct', () => {
    expect(getRangeDate(3, 'minutes')).toEqual([
      dayjs().startOf('minute').toDate(),
      dayjs().add(2, 'minutes').endOf('minute').toDate(),
    ])
    expect(getRangeDate(5, 'month', 'day')).toEqual([
      dayjs().startOf('day').toDate(),
      dayjs().add(5, 'month').subtract(1, 'day').endOf('day').toDate(),
    ])
    expect(getRangeDate(3, 'days')).toEqual([
      dayjs().startOf('day').toDate(),
      dayjs().add(2, 'days').endOf('day').toDate(),
    ])
    expect(getRangeDate(0, 'days', 'day', new Date('2022-02-14'))).toEqual([
      new Date('2022-02-14'),
      new Date('2022-02-14'),
    ])
    expect(getRangeDate(2, 'days', 'day', new Date('2022-02-14'))).toEqual([
      dayjs('2022-02-14').startOf('day').toDate(),
      dayjs('2022-02-15').endOf('day').toDate(),
    ])
    expect(getRangeDate(-2, 'days', 'day', new Date('2022-02-14'))).toEqual([
      dayjs('2022-02-13').startOf('day').toDate(),
      dayjs('2022-02-14').endOf('day').toDate(),
    ])
  })
  it('should formatDuration correct', () => {
    expect(formatDuration(-1)).toBeUndefined()
    expect(formatDuration(NaN)).toBeUndefined()
    expect(formatDuration(0)).toBe('0ms')
    expect(formatDuration(0, { to: 'd' })).toBe('0d')
    expect(formatDuration(0, { from: 'm', to: 'd', locale: true })).toBe('0天')
    expect(formatDuration(1000)).toBe('1s')
    expect(formatDuration(1001)).toBe('1s1ms')
    expect(formatDuration(61, { from: 'm' })).toBe('1h1m')
    expect(formatDuration(61, { from: 'm', locale: true })).toBe('1时1分')
    expect(formatDuration(61, { from: 'h' })).toBe('2d13h')
    expect(formatDuration(61, { from: 'h', locale: true })).toBe('2天13时')
    expect(formatDuration(61, { from: 'd' })).toBe('61d')
    expect(formatDuration(61 * 1000, { to: 's' })).toBe('61s')
    expect(formatDuration(61, { from: 'd', to: 'ms' })).toBe('5270400000ms')
    expect(formatDuration(61, { from: 'd', to: 's' })).toBe('5270400s')
    expect(formatDuration(61, { from: 'd', to: 'm' })).toBe('87840m')
    expect(formatDuration(61, { from: 'd', to: 'h' })).toBe('1464h')
    expect(formatDuration(61, { from: 'd', to: 'h', locale: true })).toBe(
      '1464时',
    )
    expect(formatDuration(975, { locale: true })).toBe('975毫秒')
    expect(formatDuration(975)).toBe('975ms')
  })
})
