import { stat } from "node:fs/promises";
import path from "node:path";

const reportPath = path.resolve(process.cwd(), "dist/stats.html");

try {
  const reportStat = await stat(reportPath);
  console.log(
    JSON.stringify(
      {
        report: "dist/stats.html",
        sizeBytes: reportStat.size,
        status: "found",
      },
      null,
      2,
    ),
  );
} catch {
  console.log(
    JSON.stringify(
      {
        report: "dist/stats.html",
        status: "missing",
        nextCommand: "npm run build:analyze",
      },
      null,
      2,
    ),
  );
}
