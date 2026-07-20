'use strict';

const { mkdir, readFile, rename, rm, writeFile } = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const directoryPath = path.join(os.tmpdir(), 'node-core-io-atomic-write');
const targetPath = path.join(directoryPath, 'summary.json');
const temporaryPath = `${targetPath}.${process.pid}.tmp`;

async function main() {
  await mkdir(directoryPath, { recursive: true });
  await writeFile(temporaryPath, `${JSON.stringify({ status: 'complete' })}\n`, 'utf8');
  await rename(temporaryPath, targetPath);

  console.log(await readFile(targetPath, 'utf8'));
}

main()
  .finally(() => rm(directoryPath, { recursive: true, force: true }))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
