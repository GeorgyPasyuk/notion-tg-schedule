import moment from "moment"

export function getNextMonday(date: moment.MomentInput): string {
  const nextMonday = moment(date).startOf('isoWeek').add(7, 'days')
  return nextMonday.format('YYYY.MM.DD')
}