import dayjs from 'dayjs'

import { isDef } from './is'

type FormatMode = 'date' | 'time' | 'date-time'
type FormatRule = 'no-current-year'
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
  /**
   * 预定义规则
   */
  rule?: FormatRule | RuleFunc
}

type RuleFunc = (date: TimestampOrDate, template: string) => string

/**
 * 模版规则（如果当前日期等于今年 删除年份展示）
 * @param date
 * @param template
 */
function noCurrentYearRule(date: TimestampOrDate, template: string) {
  const isSameYear = dayjs(date).isSame(dayjs(), 'year')
  if (!isSameYear) {
    return template
  }
  return template.replace(/^YYYY-/, '')
}

const ruleMap: { [key in FormatRule]: RuleFunc } = {
  'no-current-year': noCurrentYearRule,
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
  const { template, mode, rule }: FormatDateOptions = {
    mode: 'date',
    template: '',
    ...option,
  }
  let currentTemplate = template || formatModeTemplateMap[mode!]
  const ruleFunc = typeof rule === 'string' ? ruleMap[rule] : rule
  if (ruleFunc) {
    currentTemplate = ruleFunc(time, currentTemplate)
  }
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
 * @param reviseUnit 修正日期类型（及按怎样的日期类型展示） 默认为unit
 * @param base 基准日期 默认为 dayjs()
 */
// eslint-disable-next-line max-params
export function getRangeDate(
  range: number,
  unit: dayjs.ManipulateType,
  reviseUnit: dayjs.ManipulateType = unit,
  base: TimestampOrDate | dayjs.Dayjs = dayjs(),
): [Date, Date] {
  const baseDayjs = dayjs(base)
  const baseDate = baseDayjs.toDate()
  if (range === 0) {
    return [baseDate, baseDate]
  }
  if (range > 0) {
    return [
      baseDayjs.startOf(reviseUnit).toDate(),
      baseDayjs
        .add(range, unit)
        .subtract(1, reviseUnit)
        .endOf(reviseUnit)
        .toDate(),
    ]
  }
  return [
    baseDayjs
      .subtract(Math.abs(range), unit)
      .add(1, reviseUnit)
      .startOf(reviseUnit)
      .toDate(),
    baseDayjs.endOf(reviseUnit).toDate(),
  ]
}
