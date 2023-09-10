import { ByDayApi } from "@api/schedule/ByDayApi";
import { SubjectsApi } from "@api/schedule/SubjectsApi";
import { byDateMarkup, createDatesMarkup, startMarkup } from "@tg/markUp";
import { bot } from "@tg/tgInit";
import { formatMessages } from "@utils/formatMessages";
import { getRussianDayOfWeek } from "@utils/getRussianDayOfWeek";
import { SortResponse } from "@utils/SortResponse";

const byDayController = new ByDayApi();
const sortResponse = new SortResponse();
const subjectsApi = new SubjectsApi();
const byDayApi = new ByDayApi();

export class ScheduleController {
  public datesMarkup: any;
  public async getTodaySchedule(chat_id: number) {
    const todayResponse = await byDayController.getToday();

    const { resultArray: todayResultArray } =
      sortResponse.sortPages(todayResponse);

    await bot.sendMessage(
      chat_id,
      formatMessages(
        todayResultArray,
        getRussianDayOfWeek(new Date().toISOString()),
      ),
      startMarkup,
    );
  }

  public async getTomorrowSchedule(chat_id: number) {
    const nextDayResponse = await byDayController.getNextDay();
    const { resultArray: nextDayResultArray } =
      sortResponse.sortPages(nextDayResponse);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await bot.sendMessage(
      chat_id,
      formatMessages(
        nextDayResultArray,
        getRussianDayOfWeek(tomorrow.toISOString()),
      ),
      startMarkup,
    );
  }

  public async getSubjectDays(chat_id: number, subject: string) {
    const dates = await subjectsApi.getSubjectDates(subject);

    this.datesMarkup = createDatesMarkup(dates);

    if (dates && dates.length > 0) {
      await bot.sendMessage(
        chat_id,
        `Выберите дату предмета ${subject}`,
        this.datesMarkup,
      );
    } else {
      await bot.sendMessage(
        chat_id,
        `По предмету '${subject}' нет доступных дат.`,
      );
    }
  }

  public async getDaysSubject(
    chat_id: number,
    date: string,
    subjectName: string,
  ) {
    const byDateAndNameResponse = await byDayApi.getByDateAndName(
      date,
      subjectName,
    );

    const { resultArray: dateResultArray } = sortResponse.sortPages(
      byDateAndNameResponse,
    );

    const message = formatMessages(dateResultArray);
    if (message) {
      await bot.sendMessage(chat_id, message,
         byDateMarkup,
       );
    }

    return byDateAndNameResponse;
  }
}
