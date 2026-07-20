function blockEventLoop(milliseconds: number): void {
  const end = Date.now() + milliseconds;
  while (Date.now() < end) {
    Math.sqrt(Math.random());
  }
}

console.time("blocked");
blockEventLoop(50);
console.timeEnd("blocked");
