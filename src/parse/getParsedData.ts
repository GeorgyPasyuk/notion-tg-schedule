import {parseICalData} from "./icalPars";

const fs = require("fs").promises;
const sharedFilePath = "./shared/";

export const getParsedData = async ()=> {
  const currentDate = new Date();
  const currentWeekStartDate = new Date(currentDate);
  currentWeekStartDate.setDate(
    currentDate.getDate() - currentDate.getDay() + 1,
  );

  const currentWeekEndDate = new Date(currentWeekStartDate);
  currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6);

  const startDateFormatted = `${currentWeekStartDate.getFullYear()}.${(
    currentWeekStartDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${currentWeekStartDate
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  const endDateFormatted = `${currentWeekEndDate.getFullYear()}.${(
    currentWeekEndDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${currentWeekEndDate
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  const filePath = `${sharedFilePath}schedule_${startDateFormatted}_${endDateFormatted}.ics`;

  try {
    const data: string = await fs.readFile(filePath, "utf8");
    return parseICalData(data);
  } catch (err) {
    console.error("Error reading the file:", err);
    throw err;
  }
};
