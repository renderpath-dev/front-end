async function handleReportButtonClick() {
  const reportModule = await import('./heavyReportFormatter.js');

  console.log(reportModule.createHeavyReportText('Quarterly Revenue'));
}

await handleReportButtonClick();
