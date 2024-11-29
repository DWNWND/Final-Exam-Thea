export function capitalizeWords(str: string): string {
  const newString = str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return newString;
}
