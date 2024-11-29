export default function formatDateForDisplay(date) {
  const newDate = new Date(date);
  
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(newDate);
}
