import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'

import { formatDate, formatRangeDate, getRangeDate } from './date'

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
})
