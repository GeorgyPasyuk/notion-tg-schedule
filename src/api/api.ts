import axios from "axios";
import * as fs from "fs";
import moment from "moment";
import schedule from "node-schedule";
import { updateData } from "@db/postItems";


const savePath = "./src/shared/";

// Проверяем, существует ли папка, и создаем ее, если не существует
if (!fs.existsSync(savePath)) {
  fs.mkdirSync(savePath);
}


async function fetchAndSaveSchedule(startDate, endDate) {
  const url = `https://ruz.fa.ru/api/schedule/group/111491.ics?start=${startDate}&finish=${endDate}&lng=1`;
  const fileName = `schedule_${startDate}_${endDate}.ics`;

  console.log("Запрашиваем URL:", url);

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


// Начальная дата 04.09.2023
const startDate = "2023.09.04";

// Устанавливаем правило выполнения каждые две недели
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 1; // Понедельник
rule.hour = 0; // Час 0 (полночь)
rule.minute = 0; // Минута 0

const job = schedule.scheduleJob(rule, async () => {
  const currentDate = moment();
  const nextMondayDate = getNextMonday(currentDate);

  await fetchAndSaveSchedule(
    nextMondayDate,
    getNextMonday(moment(nextMondayDate).add(1, "weeks")),
  );

  await updateData();
});

