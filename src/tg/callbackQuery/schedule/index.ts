import { byDayQuery } from "@tg/callbackQuery/schedule/byDayQuery/byDayQuery";
import { bySubjectQuery } from "@tg/callbackQuery/schedule/bySubjectQuery/bySubjectQuery";

export const connectCallbackQueries = ()=> {
  bySubjectQuery()
  byDayQuery()

}