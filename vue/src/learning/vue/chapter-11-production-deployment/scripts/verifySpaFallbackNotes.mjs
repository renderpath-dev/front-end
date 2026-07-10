import { readFile } from "node:fs/promises";
import path from "node:path";

const configPath = path.resolve(process.cwd(), "nginx/vue-spa.conf");
const configContent = await readFile(configPath, "utf8");
const requiredRule = "try_files $uri $uri/ /index.html;";

if (!configContent.includes(requiredRule)) {
  console.error(`Missing SPA fallback rule: ${requiredRule}`);
  process.exitCode = 1;
} else {
  console.log(
    `SPA fallback rule found in ${path.relative(process.cwd(), configPath)}.`,
  );
}
