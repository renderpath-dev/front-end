const obj = {
  dataProp: 5,

  _value: 10,
  get accessProp() {
    return this._value;
  },
  set accessProp(v) {
    this._value = v;
  },
};

console.log(obj.dataProp); // 5
console.log(obj.accessProp); // 10

obj.dataProp = 20;
obj.accessProp = 30;

console.log(obj.dataProp); // 20
console.log(obj.accessProp); // 30
console.log(obj._value); // 30
