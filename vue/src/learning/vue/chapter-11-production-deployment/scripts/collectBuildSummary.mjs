import { readFile } from "node:fs/promises";
import path from "node:path";

const summaryPath = path.resolve(process.cwd(), "dist/build-summary.json");

try {
  const summary = await readFile(summaryPath, "utf8");
  console.log(summary);
} catch {
  console.log(
    JSON.stringify(
      {
        status: "missing-dist",
        message: "Run npm run build and npm run verify:dist first.",
      },
      null,
      2,
    ),
  );
}
