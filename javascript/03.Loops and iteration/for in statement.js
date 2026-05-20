function dumpProps(obj, objName) {
  let result = '';
  for (const i in obj) {
    result += `${objName}.${i} = ${obj[i]}<br>`;
  }
  result += '<hr>';
  return result;
}
console.log(dumpProps([]))