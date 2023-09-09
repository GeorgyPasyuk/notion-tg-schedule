
export const formatMessages = (results: any[], dayOfWeek?: string) => {
  const messages = results.map((result) => {
    return (
      "---------------------------------------\n"+
      `Предмет: ${result["Name"]}\n` +
      `Дата: ${result["date"]}\n` +
      `Тип: ${result["Тип"]}\n` +
      `Кабинет: ${result["Кабинет"]}\n` +
      `Преподаватель: ${result["Преподаватель"]}\n` +
      `Домашнее задание: ${result["Домашнее задание"] || "Здесь еще нет домашнего задания"}\n` +
      "---------------------------------------"
    );
  });

  if (!dayOfWeek) {
    return `${messages.join("\n\n")}`
  }

  return `${dayOfWeek}\n\n${messages.join("\n\n")}`;
};

export const formatMessage = (result: any, dayOfWeek?: string) => {
  return (
    "---------------------------------------\n" +
    `Предмет: ${result["Name"]}\n` +
    `Дата: ${result["date"]}\n` +
    `Тип: ${result["Тип"]}\n` +
    `Кабинет: ${result["Кабинет"]}\n` +
    `Преподаватель: ${result["Преподаватель"]}\n` +
    `Домашнее задание: ${result["Домашнее задание"] || "Здесь еще нет домашнего задания"}\n` +
    "---------------------------------------"
  );
};
