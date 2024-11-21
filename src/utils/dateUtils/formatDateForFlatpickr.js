export default function formatDateForFlatpickr(date) {
  const newDate = new Date(date);
  return newDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
}
