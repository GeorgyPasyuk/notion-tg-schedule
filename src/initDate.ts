import { fetchAndSaveScheduleFile } from "@api/fetchAndStart/fetchAndSave";

const startApp = async () => {
  await fetchAndSaveScheduleFile('2023.09.11', '2023.09.24')
}

startApp()