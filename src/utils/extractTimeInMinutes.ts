export const extractTimeInMinutes = (dateTimeString: string)=> {
  const match = dateTimeString.match(/(\d{2}):(\d{2})/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours * 60 + minutes;
  }
  return 0;
}