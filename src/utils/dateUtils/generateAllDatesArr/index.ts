export function generateAllDatesArr(startDate: string | Date, endDate: string | Date): string[] {
  const dates: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
    dates.push(currentDate.toISOString().split("T")[0]);
  }

  return dates;
}