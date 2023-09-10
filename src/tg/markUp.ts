import { subjects } from "@shared/tg/constants/subjects";

export const startMarkup = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Расписание", callback_data: "schedule" }],
      [{ text: "Домашнее задание", callback_data: "write-homework" }],
    ],
  },
};

export const scheduleMarkup = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Сегодня", callback_data: "today" }, { text: "Завтра", callback_data: "next-day" }],
      [{ text: "Предмет", callback_data: "subject" }],
      [{ text: "Назад", callback_data: "start" }],
    ],
  },
};

export const byDateMarkup = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Выбрать другую дату", callback_data: "another-date" }],
      [{ text: "Выбрать другой предмет", callback_data: "subject" }],
      [{ text: "Записать домашнее задание", callback_data: "write-homework-by-subject" }],
      [{ text: "Назад", callback_data: "schedule" }],
    ],
  },
};

export const subjectsMarkup = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: subjects[0], callback_data: "get-subject-0" },
        { text: subjects[1], callback_data: "get-subject-1" },
      ],
      [{ text: subjects[2], callback_data: "get-subject-2" }],
      [{ text: subjects[3], callback_data: "get-subject-3" }],
      [
        { text: subjects[4], callback_data: "get-subject-4" },
        { text: subjects[5], callback_data: "get-subject-5" },
      ],
      [
        { text: subjects[6], callback_data: "get-subject-6" },
        { text: subjects[7], callback_data: "get-subject-7" },
      ],
      [
        { text: subjects[8], callback_data: "get-subject-8" },
        { text: subjects[9], callback_data: "get-subject-9" },
      ],
      [{ text: "Назад", callback_data: "schedule" }],
    ],
  },
};

export const createDatesMarkup = (dates: Date[]) => {
  const dateButtons = dates.map(
    (date: { toLocaleDateString: (arg0: string) => string }) => ({
      text: date.toLocaleDateString("ru-RU"),
      callback_data: `selected-date-${date.toLocaleDateString("ru-RU")}`,
    }),
  );

  const rows = [];
  while (dateButtons.length > 0) {
    rows.push(dateButtons.splice(0, 2));
  }

  rows.push([{ text: "Назад", callback_data: "schedule" }]);

  return {
    reply_markup: {
      inline_keyboard: rows,
    },
  };
};
