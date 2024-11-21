export default function formatDateForFlatpickr(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-CA"); // "YYYY-MM-DD" format
}
