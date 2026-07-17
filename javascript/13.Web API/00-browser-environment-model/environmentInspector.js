// Goal:
// Inspect important browser host objects.

console.log(window === globalThis);
console.log(document.title);
console.log(location.href);
console.log(typeof navigator.userAgent);
console.log(document.querySelector('#page-title').textContent);
