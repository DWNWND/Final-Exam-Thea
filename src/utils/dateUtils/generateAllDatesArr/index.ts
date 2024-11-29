export function generateAllDatesArr(startDate: string | Date, endDate: string | Date): string[] {
  const dates: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
    dates.push(currentDate.toISOString().split("T")[0]);
  }

  return dates;
}

// export default function generateAllDatesArr(startDate, endDate) {
//   let dates = [];
//   let currentDate = new Date(startDate);
//   while (currentDate <= new Date(endDate)) {
//     dates.push(currentDate.toISOString().split("T")[0]); // Push date as "YYYY-MM-DD"
//     currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
//   }
//   return dates;}
