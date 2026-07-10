import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const forbiddenVariables = [
  ["VITE", "SECRET", "KEY"],
  ["VITE", "DATABASE", "PASSWORD"],
  ["VITE", "ACCESS", "TOKEN"],
  ["VITE", "PRIVATE", "API", "KEY"],
  ["VITE", "SECRET"],
].map((parts) => parts.join("_"));

const scanRoots = [
  "src",
  ".env.example",
  ".env.production.example",
  "vite.config.ts",
  "package.json",
];

const ignoredDirectories = new Set([
  "node_modules",
  "dist",
  "coverage",
  "playwright-report",
  "test-results",
]);

async function collectFiles(targetPath) {
  const absolutePath = path.resolve(process.cwd(), targetPath);

  try {
    const entryStat = await stat(absolutePath);

    if (entryStat.isFile()) {
      return [absolutePath];
    }

    if (!entryStat.isDirectory()) {
      return [];
    }
  } catch {
    return [];
  }

  const entries = await readdir(absolutePath, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const childPath = path.join(absolutePath, entry.name);

      if (entry.isDirectory()) {
        if (ignoredDirectories.has(entry.name)) {
          return [];
        }

        return collectFiles(childPath);
      }

      if (entry.isFile()) {
        return [childPath];
      }

      return [];
    }),
  );

  return nestedFiles.flat();
}

const files = (await Promise.all(scanRoots.map(collectFiles))).flat();
const findings = [];

for (const filePath of files) {
  const content = await readFile(filePath, "utf8");
  for (const variableName of forbiddenVariables) {
    if (content.includes(variableName)) {
      findings.push({
        file: path.relative(process.cwd(), filePath),
        variableName,
      });
    }
  }
}

if (findings.length > 0) {
  console.error(JSON.stringify({ findings }, null, 2));
  process.exitCode = 1;
} else {
  console.log("No forbidden VITE secret-like variables were found.");
}
