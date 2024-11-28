export function calculateNights(startDate: string | Date, endDate: string | Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMs = end.getTime() - start.getTime();
  const days = Math.floor(diffInMs / msPerDay);
  const nights = days > 0 ? days : 0;

  return nights;
}
