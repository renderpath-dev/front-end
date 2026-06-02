// Goal:
// Distinguish buffer byte length from typed array element length.

const coordinateBuffer = new ArrayBuffer(16);
const coordinateFloatView = new Float32Array(coordinateBuffer);

console.log(coordinateBuffer.byteLength);
console.log(coordinateFloatView.length);
console.log(coordinateFloatView.BYTES_PER_ELEMENT);
