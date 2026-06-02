// Goal:
// Verify that numeric Date constructor months are zero-based.

const confusingMonthDate = new Date(2026, 4, 12);

console.log(confusingMonthDate.getMonth()+1);  //getMonth() return monthIndex
console.log(confusingMonthDate.getFullYear());
