export function calculateNights(startDate: string | Date, endDate: string | Date): number {
  const msPerDay = 24 * 60 * 60 * 1000; // Milliseconds per day

  // Ensure the dates are converted to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const diffInMs = end.getTime() - start.getTime();

  // Calculate the difference in days
  const days = Math.floor(diffInMs / msPerDay);

  // Return 0 if the difference is negative or invalid
  const nights = days > 0 ? days : 0;

  return nights;
}
