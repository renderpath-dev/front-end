function getMonthName(month) {
  month--;

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (month < 0 || month > 11) {
    throw new Error('Invalid month value');
  }

  return monthNames[month];
}

const myMonth = 2;
let monthName;

try {
  monthName = getMonthName(myMonth);
} catch (error) {
  monthName = 'Unknown';
  console.error(error);
}

function checkNetworkStatus(HTTPStatus) {
  const notFound = 404;
  const successfulCode = 200;
  const HTTPStatusCode = [
    '200',
    '401',
    '402',
    '403',
    '404',
    '500',
    '501',
    '502',
    '503',
  ];

  if (HTTPStatus === successfulCode) {
    console.log('Request succeeded with status code: ' + HTTPStatus);
  }

  if (HTTPStatusCode.indexOf(String(HTTPStatus)) !== -1) {
    return notFound;
  }
}

