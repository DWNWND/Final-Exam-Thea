export function capitalizeWords(str) {
  return str
    .toLowerCase() // Ensure the rest of the word is lowercase
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
