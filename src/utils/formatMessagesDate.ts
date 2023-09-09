
export const formatMessagesDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hoursStart = date.getHours().toString().padStart(2, "0");
  const minutesStart = date.getMinutes().toString().padStart(2, "0");

  date.setMinutes(date.getMinutes() + 90);
  const hoursEnd = date.getHours().toString().padStart(2, "0");
  const minutesEnd = date.getMinutes().toString().padStart(2, "0");

  return `${hoursStart}:${minutesStart} - ${hoursEnd}:${minutesEnd} ${day}.${month}.${year}`;
};