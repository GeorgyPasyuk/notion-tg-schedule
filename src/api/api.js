const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const schedule = require("node-schedule");
const updateData = require("../db/postItems");

const savePath = "./shared/";

async function fetchAndSaveSchedule(startDate, endDate) {
  const url = `https://ruz.fa.ru/api/schedule/group/111491.ics?start=${startDate}&finish=${endDate}&lng=1`;
  const fileName = `schedule_${startDate}_${endDate}.ics`;

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    if (response.status === 200) {
      fs.writeFileSync(savePath + fileName, response.data);
      console.log(`Файл ${fileName} успешно сохранен.`);
    } else {
      console.error(
        `Не удалось получить файл. Код состояния: ${response.status}`,
      );
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error.message);
  }
}

function getNextMonday(date) {
  const nextMonday = moment(date).startOf("isoWeek").add(7, "days");
  return nextMonday.format("YYYY.MM.DD");
}

module.exports = job = schedule.scheduleJob("0 0 * * 1", async () => {
  const currentDate = moment();
  const nextMondayDate = getNextMonday(currentDate);

  await fetchAndSaveSchedule(
    nextMondayDate,
    getNextMonday(moment(nextMondayDate).add(1, "days")),
  );

  await updateData();
});
