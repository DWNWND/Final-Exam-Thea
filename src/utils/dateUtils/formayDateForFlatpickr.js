export default function getFormattedDate(date) {
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}