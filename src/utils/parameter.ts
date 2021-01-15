import moment, { } from 'moment'

export const dateFormat = 'YYYY/MM/DD';
export const dateFormatList = [ 'YYYY/MM/DD', 'YYYY/MM/DD' ];

/**
 * RangePicker
 * 格式：["YYYY-MM-DD HH-MM-SS","YYYY-MM-DD HH-MM-SS"]转换成"YYYY/MM/DD~YYYY/MM/DD"
 */

export const rangePickerArrFormat = (range: any[]): string => {
  return `${moment(range[ 0 ].split(' ')[ 0 ]).format(dateFormat)  }~${  moment(range[ 1 ].split(' ')[ 0 ]).format(dateFormat)}`
}