function parseLastEventId(value: string | undefined): bigint | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return undefined;
  return BigInt(trimmed);
}

const incomingHeader = "42";
const afterSequence = parseLastEventId(incomingHeader);
console.log({ afterSequence: afterSequence?.toString() });
