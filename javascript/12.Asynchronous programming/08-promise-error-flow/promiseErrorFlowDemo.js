// Goal:
// Verify how errors propagate through a promise chain

const httpStatus = new Promise((resolve) => {
  resolve( {state: 431, Reason:'Request Headers Fields Too Large'} );
});
httpStatus.then(statusRecord => {
  console.log(statusRecord.state);
  throw new Error('Request Headers Fields Too Large');
})
.then((result) => {
  console.log(result);
})
.catch((httpStatusError) => {
  console.error(httpStatusError.message);
  return {state:200, information:'Request Received Successfully'};
})
.then((clientRecord) => {
  console.log(clientRecord.information);
})