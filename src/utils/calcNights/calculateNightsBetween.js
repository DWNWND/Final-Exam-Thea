export default function calculateNightsBetween(startDate, endDate) {
  const msPerDay = 24 * 60 * 60 * 1000; // Milliseconds per day
  const diffInMs = new Date(endDate) - new Date(startDate); // Difference in milliseconds
  const days = Math.floor(diffInMs / msPerDay);
  return days > 0 ? days : 0; // Return 0 if the dates are the same or invalid
}
