import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import type { Stats } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

type FileReport = {
  path: string;
  size: number;
  isFile: boolean;
};

function toFileReport(path: string, stats: Stats): FileReport {
  return {
    path,
    size: stats.size,
    isFile: stats.isFile()
  };
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "type-only-import-"));
const filePath = join(temporaryDirectory, "note.txt");

writeFileSync(filePath, "type-only import boundary\n", "utf8");

const report = toFileReport(filePath, statSync(filePath));
const wrongRuntimeImportExample = 'import { Stats } from "node:fs";';

console.log(report);
console.log(`wrong.example=${wrongRuntimeImportExample}`);

rmSync(temporaryDirectory, { recursive: true, force: true });
