// Goal:
// Create a binary message header and read it back.

function createMessageHeader(versionNumber, statusCodeNumber) {
  const headerStorage = new ArrayBuffer(4);
  const headerWriter = new DataView(headerStorage);

  headerWriter.setUint8(0, versionNumber);
  headerWriter.setUint16(1, statusCodeNumber, false);

  return headerStorage;
}

const responseHeaderBuffer = createMessageHeader(2, 201);
const responseHeaderReader = new DataView(responseHeaderBuffer);

console.log(responseHeaderReader.getUint8(0));
console.log(responseHeaderReader.getUint16(1, false));
console.log(responseHeaderBuffer.byteLength);
