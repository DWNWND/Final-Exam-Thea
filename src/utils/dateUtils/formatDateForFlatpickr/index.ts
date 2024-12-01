export function formatDateForFlatpickr(date: string | Date): string {
  const newDate = new Date(date);

  const YYYYMMDD = newDate.toLocaleDateString("en-CA");

  return YYYYMMDD;
}
