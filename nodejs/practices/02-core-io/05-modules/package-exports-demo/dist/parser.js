export function parseStatus(rawStatus) {
  const status = Number.parseInt(rawStatus, 10);

  if (!Number.isInteger(status)) {
    throw new TypeError('Status must be an integer');
  }

  return status;
}
