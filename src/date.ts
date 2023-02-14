import dayjs from 'dayjs'

import { isDef } from './is'

type FormatMode = 'date' | 'time' | 'date-time'
type TimestampOrDate = number | Date

interface FormatDateOptions {
  /**
   * 格式化模式
   */
  mode?: FormatMode
  /**
   * 自定义格式化模版
   */
  template?: string
}

const formatModeTemplateMap: {
  [key in FormatMode]: string
} = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
  'date-time': 'YYYY-MM-DD HH:mm',
}

/**
 * 时间日期格式化
 * @param time Date类型对象或者时间戳
 * @param option 格式化选项
 * @returns { string }
 */
export function formatDate(
  time: TimestampOrDate,
  option: FormatDateOptions = {},
): string {
  if (!isDef(time)) {
    return ''
  }
  const { template, mode }: FormatDateOptions = {
    mode: 'date',
    template: '',
    ...option,
  }
  const currentTemplate = template || formatModeTemplateMap[mode!]
  return dayjs(time).format(currentTemplate)
}

interface FormatRangeDateOptions extends FormatDateOptions {
  /**
   * 日期为空时的占位符
   * @default '~'
   */
  empty?: string
  /**
   * 日期范围连接符
   * @default '至'
   */
  spliter?: string
}

type RangeDate = TimestampOrDate | null | undefined

/**
 * 日期范围选择器格式化
 * @param rangeDateList Date
 * @param format string 格式
 * @returns string
 */
export function formatRangeDate(
  rangeDateList: [RangeDate, RangeDate],
  option: FormatRangeDateOptions = {},
) {
  if (!rangeDateList || rangeDateList.filter(Boolean).length === 0) {
    return ''
  }
  const { mode, template, empty, spliter }: FormatRangeDateOptions = {
    mode: 'date',
    template: '',
    empty: '~',
    spliter: '至',
    ...option,
  }
  const startTime = rangeDateList[0]
    ? formatDate(rangeDateList[0], {
        mode,
        template,
      })
    : empty
  const endTime = rangeDateList[1]
    ? formatDate(rangeDateList[1], {
        mode,
        template,
      })
    : '~'
  return `${startTime}${spliter}${endTime}`
}

/**
 * 获取时间段日期
 * @param range 时间段偏移（负数为基准日期向前偏移）
 * @param unit 偏移日期类型
 * @param base 基准日期 默认为 dayjs()
 */
export function getRangeDate(
  range: number,
  unit: dayjs.ManipulateType,
  base: TimestampOrDate | dayjs.Dayjs = dayjs(),
): [Date, Date] {
  const baseDayjs = dayjs(base)
  const baseDate = baseDayjs.toDate()
  if (range === 0) {
    return [baseDate, baseDate]
  }
  if (range > 0) {
    return [
      baseDayjs.startOf(unit).toDate(),
      baseDayjs
        .add(range - 1, unit)
        .endOf(unit)
        .toDate(),
    ]
  }
  return [
    baseDayjs
      .subtract(Math.abs(range) - 1, unit)
      .startOf(unit)
      .toDate(),
    baseDayjs.endOf(unit).toDate(),
  ]
}
