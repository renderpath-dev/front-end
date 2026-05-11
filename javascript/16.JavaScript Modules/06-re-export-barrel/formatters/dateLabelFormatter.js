// Goal:
// Export a date label formatter.

export function formatOrderDate(yearValue, monthValue, dayValue) {
  return [yearValue, monthValue, dayValue].join('-');
}
