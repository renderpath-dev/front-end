function getMonthName(month) {
  month--;

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ]
  if (!months[month]) {
    throw new Error('Invalid month code');
  }
  return months[month];
}

function logMyErrors() {
  throw new Error();
}

try {
  monthName = getMonthName(myMonth);
} catch (e) {
  monthName = "Unknown";
  logMyErrors(e);
}