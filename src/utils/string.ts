export function capitalizeFirstLetter(str: string) {
  // Check if the string is empty or null
  if (!str) return str

  // Uppercase the first letter and concatenate with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1)
}
