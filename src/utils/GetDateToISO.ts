export class GetDateToISO {
  today = new Date();

  public getToday = () => {
    return this.today.toISOString().split("T")[0];
  };

  public getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(this.today.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };


  public getDate = (inputDate: string) => {
    const parts = inputDate.split(".");
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
    throw new Error("Invalid date format");
  }

}
