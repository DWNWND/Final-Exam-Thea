export function formatDateForFlatpickr(date: string | Date): string {
  const newDate = new Date(date);

  // Format the date in "YYYY-MM-DD" format
  const YYYYMMDD = newDate.toLocaleDateString("en-CA");

  return YYYYMMDD;
}
