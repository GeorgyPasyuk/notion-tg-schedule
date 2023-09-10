import axios from 'axios'
import fs from 'fs'
import path from 'path'

const savePath = path.join(__dirname, '../../shared/')

if (!fs.existsSync(savePath)) {
  fs.mkdirSync(savePath)
}

export const fetchAndSaveScheduleFile = async (
  startDate: string,
  endDate: string,
) => {
  const url = `https://ruz.fa.ru/api/schedule/group/111491.ics?start=${startDate}&finish=${endDate}&lng=1`
  const fileName = `schedule_${startDate}_${endDate}.ics`

  console.log('Запрашиваем URL:', url)

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    if (response.status === 200) {
      fs.writeFileSync(savePath + fileName, response.data)
      console.log(`Файл ${fileName} успешно сохранен.`)
    } else {
      console.error(
        `Не удалось получить файл. Код состояния: ${response.status}`,
      )
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error.message)
  }
}
