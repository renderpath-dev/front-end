// Goal:
// Parse environment variables explicitly.

import process from 'node:process';

function readPort(defaultPort) {
  const rawPortValue = process.env.PORT;

  if (rawPortValue === undefined) {
    return defaultPort;
  }

  const parsedPortValue = Number(rawPortValue);

  if (!Number.isInteger(parsedPortValue)) {
    throw new Error('PORT must be an integer');
  }

  return parsedPortValue;
}

console.log(readPort(3000));
