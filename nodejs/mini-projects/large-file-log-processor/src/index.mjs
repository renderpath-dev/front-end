import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

import { LineSplitter } from './line-splitter.mjs';
import { LogSummaryTransform } from './log-summary-transform.mjs';

const inputPath = path.resolve(process.argv[2] ?? 'data/application.ndjson');
const outputPath = path.resolve(process.argv[3] ?? 'output/summary.json');
const slowThresholdMs = Number.parseInt(process.argv[4] ?? '500', 10);

if (!Number.isInteger(slowThresholdMs) || slowThresholdMs < 0) {
  throw new RangeError('Slow threshold must be a non-negative integer');
}

await mkdir(path.dirname(outputPath), { recursive: true });
const temporaryPath = `${outputPath}.${process.pid}.tmp`;

try {
  await pipeline(
    createReadStream(inputPath),
    new LineSplitter(),
    new LogSummaryTransform({ slowThresholdMs }),
    createWriteStream(temporaryPath, { encoding: 'utf8' }),
  );

  await rename(temporaryPath, outputPath);
  console.log(`Processed ${inputPath}`);
  console.log(`Wrote ${outputPath}`);
} catch (error) {
  await rm(temporaryPath, { force: true });
  console.error(error);
  process.exitCode = 1;
}
