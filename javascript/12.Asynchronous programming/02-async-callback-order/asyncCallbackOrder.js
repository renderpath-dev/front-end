// Goal:
// Verify that registering a callback is not the same as calling it.

function scheduleReportRender(reportTitle) {
  setTimeout(() => {
    console.log(`render: ${reportTitle}`);
  }, 1000);

  console.log('render scheduled');
}

scheduleReportRender('Revenue');
console.log('script finished');

function scheduleReportRender1(reportTitle) {
  const intervalId = setInterval(() => {
    console.log(`render: ${reportTitle}`);
  }, 1000);

  console.log('render scheduled');

  return intervalId;
}

const reportRenderIntervalId = scheduleReportRender1('Revenue');
console.log('script finished');

setTimeout(() => {
  clearInterval(reportRenderIntervalId);
  console.log('render stopped');
}, 3500);
