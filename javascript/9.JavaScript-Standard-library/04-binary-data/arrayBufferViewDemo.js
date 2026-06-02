// Goal:
// Verify that one buffer can be interpreted through different views.

const packetBuffer = new ArrayBuffer(8);
const packetBytesView = new Uint8Array(packetBuffer);
const packetNumberView = new DataView(packetBuffer);

packetBytesView[0] = 255;
packetBytesView[1] = 16;
packetNumberView.setUint16(2, 4096, false);

console.log(packetBytesView[0]);
console.log(packetBytesView[1]);
console.log(packetNumberView.getUint16(2, false));
console.log(packetBuffer.byteLength);
