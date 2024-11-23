export function formatDateForDisplay(date: string | Date): string {
  const newDate = new Date(date);

  // Outputs: "Wed, 27 Nov"
  const dateForDisplay = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(newDate); 

  return dateForDisplay;
}
