import { fetchAndSaveScheduleFile } from './src/api/fetchAndStart/fetchAndSave'
import { getNextMonday } from './src/api/fetchAndStart/getNextMonday'
import moment from 'moment'
import schedule from 'node-schedule'
import { updateData } from './src/db/postItems'

const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = 1
rule.hour = 0
rule.minute = 0


schedule.scheduleJob(rule, async () => {
  const currentDate = moment()
  const nextMondayDate = getNextMonday(currentDate)

  await fetchAndSaveScheduleFile(
    nextMondayDate,
    getNextMonday(moment(nextMondayDate).add(1, 'weeks')),
  )
  await updateData()
})


