// Goal:
// Compare typeof, delete, void, and comma operator results.

const record = { token: "abc", count: 2 };

console.log(typeof record);
console.log(delete record.token);
console.log("token" in record);
console.log(void record.count);
console.log((record.count += 1, record.count += 1, record.count));
