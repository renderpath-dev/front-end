// Goal:
// Format a Date for a specific locale and time zone.

const webinarStartDate = new Date('2026-05-12T15:00:00Z');
const londonDateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Europe/London',
});

console.log(londonDateFormatter.format(webinarStartDate));
