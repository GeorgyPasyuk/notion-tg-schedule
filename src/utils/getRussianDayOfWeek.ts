export const getRussianDayOfWeek = (isoDate: string) => {
  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const date = new Date(isoDate);
  return daysOfWeek[date.getDay()];
};