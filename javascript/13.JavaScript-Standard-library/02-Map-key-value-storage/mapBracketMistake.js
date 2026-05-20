const brokenPreferenceMap = new Map();
brokenPreferenceMap ['theme'] = 'dark';

console.log(brokenPreferenceMap.set('dark',1));
console.log(brokenPreferenceMap.get('theme'));
console.log(brokenPreferenceMap.theme);
console.log(brokenPreferenceMap.size);