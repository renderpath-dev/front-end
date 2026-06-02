// Goal:
// Show why assigning exports directly does not replace module.exports.

exports = function createBrokenReportTitle() {
  return 'Broken Report';
};
