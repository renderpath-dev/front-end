// Goal:
// Sort strings with a locale-aware collator.

const sortedCityNames = ['Zürich', 'Amsterdam', 'Ålesund'].sort(
  new Intl.Collator('de-DE').compare,
);

console.log(sortedCityNames);
