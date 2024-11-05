// Utility to calculate all dates between start and end
export default function generateAllTravelDates(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split("T")[0]); // Push date as "YYYY-MM-DD"
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  return dates;}