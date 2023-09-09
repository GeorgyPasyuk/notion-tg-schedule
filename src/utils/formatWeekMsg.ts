import { getRussianDayOfWeek } from "./getRussianDayOfWeek";

export function groupByDayOfWeek(objects) {
  // Шаг 1: Сортировка массива объектов по датам
  objects.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    // @ts-ignore
    return dateA - dateB;
  });

  // Шаг 2: Создание результирующего массива
  const groupedObjects = [];
  let currentDayOfWeek = null;
  let currentGroup = null;

  // Шаг 3: Проход по каждому объекту
  objects.forEach((obj) => {
    const dateMatch = obj.date.match(/(\d{2}:\d{2}) - (\d{2}:\d{2}) (\d{2}.\d{2}.\d{4})/);

    if (!dateMatch || dateMatch.length !== 4) {
      return; // Пропустить некорректные даты
    }

    const dayOfWeek = getRussianDayOfWeek(dateMatch[3]);

    // Шаг 4: Если день недели сменился, создать новую группу
    if (dayOfWeek !== currentDayOfWeek) {
      currentGroup = { dayOfWeek, objects: [] };
      groupedObjects.push(currentGroup);
      currentDayOfWeek = dayOfWeek;
    }

    // Шаг 6: Добавить объект к текущей группе
    currentGroup.objects.push(obj);
  });

  return groupedObjects;
}

export const formatWeekMsg = (results: any[]) => {
  const messages = [];
  const daysOfWeek = {};
  console.log(results);
  results.forEach((result) => {
    const dateMatch = result["date"].match(/(\d{2}:\d{2}) - (\d{2}:\d{2}) (\d{2}.\d{2}.\d{4})/);

    if (!dateMatch || dateMatch.length !== 4) {
      return; // Пропустить некорректные даты
    }

    const time = dateMatch[1] + " - " + dateMatch[2];
    const dayOfWeek = getRussianDayOfWeek(dateMatch[3]);

    if (!daysOfWeek[dayOfWeek]) {
      // Если день недели не встречался, добавляем его в сообщение
      messages.push(`\n==========\n${dayOfWeek}`);
      daysOfWeek[dayOfWeek] = true;
    }

    messages.push(
      "---------------------------------------\n" +
      `Предмет: ${result["Name"]}\n` +
      `Дата: ${time} ${dateMatch[3]}\n` +
      `Тип: ${result["Тип"]}\n` +
      `Кабинет: ${result["Кабинет"]}\n` +
      `Преподаватель: ${result["Преподаватель"]}`
    );
  });

  return messages.join("\n");
};

