import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDirectory = process.cwd();
const distDirectory = path.join(rootDirectory, "dist");
const indexPath = path.join(distDirectory, "index.html");
const assetsDirectory = path.join(distDirectory, "assets");

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function hasHashPattern(fileName) {
  return /[.-][A-Za-z0-9_-]{8,}\.(?:js|css|svg|png|jpg|jpeg|webp|woff2?)$/.test(
    fileName,
  );
}

const indexExists = await pathExists(indexPath);
const assetsExists = await pathExists(assetsDirectory);

if (!indexExists) {
  console.error("Missing dist/index.html. Run npm run build first.");
  process.exitCode = 1;
}

if (!assetsExists) {
  console.error("Missing dist/assets. Run npm run build first.");
  process.exitCode = 1;
}

if (process.exitCode === 1) {
  process.exit();
}

const assetFiles = await readdir(assetsDirectory);
const javascriptAssets = assetFiles.filter((fileName) =>
  fileName.endsWith(".js"),
);
const cssAssets = assetFiles.filter((fileName) => fileName.endsWith(".css"));
const hashedAssets = assetFiles.filter(hasHashPattern);

if (javascriptAssets.length === 0) {
  console.error("No JavaScript assets were found in dist/assets.");
  process.exitCode = 1;
}

if (hashedAssets.length === 0) {
  console.warn("No hashed asset pattern was detected in dist/assets.");
}

const summary = {
  generatedAt: new Date().toISOString(),
  indexExists,
  assetsDirectory: "dist/assets",
  javascriptAssets,
  cssAssets,
  hashedAssetCount: hashedAssets.length,
  assetCount: assetFiles.length,
};

await writeFile(
  path.join(distDirectory, "build-summary.json"),
  `${JSON.stringify(summary, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(summary, null, 2));
