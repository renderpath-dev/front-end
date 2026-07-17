// Goal:
// Verify why for-in is not a good default for arrays.

const lessons = ['types', 'objects'];
lessons.extra = 'metadata';

for (const key in lessons) {
  console.log(key, lessons[key]);
}

for (const lesson of lessons) {
  console.log('value', lesson);
}
