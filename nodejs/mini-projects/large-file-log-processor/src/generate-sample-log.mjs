import { once } from 'node:events';
import { mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';

const recordCount = Number.parseInt(process.argv[2] ?? '10000', 10);
const outputPath = path.resolve(process.argv[3] ?? 'data/application.ndjson');

if (!Number.isInteger(recordCount) || recordCount < 1) {
  throw new RangeError('Record count must be a positive integer');
}

await mkdir(path.dirname(outputPath), { recursive: true });

const output = createWriteStream(outputPath, { encoding: 'utf8' });
const statuses = [200, 200, 201, 404, 500];

for (let index = 0; index < recordCount; index += 1) {
  const record = {
    method: index % 3 === 0 ? 'POST' : 'GET',
    path: `/api/items/${index % 100}`,
    status: statuses[index % statuses.length],
    durationMs: (index * 37) % 1000,
  };

  const canContinue = output.write(`${JSON.stringify(record)}\n`);
  if (!canContinue) {
    await once(output, 'drain');
  }
}

output.end();
await once(output, 'finish');
console.log(`Generated ${recordCount} records at ${outputPath}`);
