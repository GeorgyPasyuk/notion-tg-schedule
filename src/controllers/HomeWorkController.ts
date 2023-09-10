import { HomeWorkApi } from "@api/homework/HomeWorkApi";
import { bot } from "@tg/tgInit";
import { formatMessage } from "@utils/formatMessages";
import { SortResponse } from "@utils/SortResponse";

const sortResponse = new SortResponse();
const homeWorkApi = new HomeWorkApi();

// HomeWorkController.ts

export class HomeWorkController {
  private isEditingHomework = false;

  public async writeHomeworkBySubject(chat_id: number, msg: string, page) {
    if (this.isEditingHomework) {
      return bot.sendMessage(chat_id, 'Извините, дождитесь окончания записи предыдущего домашнего задания, как правило это занимает несколько секунд')
    }

    if (!page) {
      return bot.sendMessage(chat_id, 'Пожалуйста сначала выберите предмет, либо выберете еще раз')
    }

    this.isEditingHomework = true;

    const changedHomeworkResponse = await homeWorkApi.writeHomework(msg, page);

    const homeworkResultArray = sortResponse.sortPage(changedHomeworkResponse);


    await bot.sendMessage(
      chat_id,
      `Вы изменили домашнее задание на \n ${formatMessage(
        homeworkResultArray,
      )}`,
    );

    this.isEditingHomework = false;
  }
}
