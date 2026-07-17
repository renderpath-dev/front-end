// Goal:
// Append and stream log records.

import { mkdir, appendFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';

const dataDirectory = 'data';
const logFilePath = path.join(dataDirectory, 'events.log');

export async function appendLogRecord(logText) {
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(logFilePath, `${logText}\n`, 'utf8');
}

export function createLogReadStream() {
  return createReadStream(logFilePath, { encoding: 'utf8' });
}
