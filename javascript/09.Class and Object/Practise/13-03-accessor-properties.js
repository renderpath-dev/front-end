const counter = {
  _n: 0,

  get next() {
    return this._n++;
  },

  set next(v) {
    if (v > this._n) {
      this._n = v;
    }
  },
};

counter.next = 10;
console.log(counter.next); // 10
console.log(counter.next); // 11
console.log(counter._n); // 12
