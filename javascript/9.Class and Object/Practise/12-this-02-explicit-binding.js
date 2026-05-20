function show(prefix, suffix) {
  return `${prefix}${this.name}${suffix}`;
}

const user = { name: 'Alice' };

console.log(show.call(user, '[', ']')); // "[Alice]"
console.log(show.apply(user, ['<', '>'])); // "<Alice>"

const bound = show.bind(user, '(');
console.log(bound(')')); // "(Alice)"
