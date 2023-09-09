import { parseICalData } from "./icalPars";
import * as fs from "fs/promises";

const sharedFilePath = "src/shared";

export const getParsedData = async () => {
  const currentDate = new Date();
  const currentWeekStartDate = new Date(currentDate);
  currentWeekStartDate.setDate(
    currentDate.getDate() - currentDate.getDay() + 1,
  );

  const currentWeekEndDate = new Date(currentWeekStartDate);
  currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 13);

  const startDateFormatted = formatDate(currentWeekStartDate);
  const endDateFormatted = formatDate(currentWeekEndDate);

  const filePath = `${sharedFilePath}/schedule_${startDateFormatted}_${endDateFormatted}.ics`;
  console.log(filePath);
  try {
    const data = await fs.readFile(filePath, "utf8");
    return parseICalData(data);
  } catch (err) {
    console.error("Error reading the file:", err);
    throw err;
  }
};

function formatDate(date: Date) {
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
}

getParsedData();
