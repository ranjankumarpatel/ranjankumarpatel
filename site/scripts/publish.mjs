// Copies the static export (site/out) into ../docs, which GitHub Pages serves.
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(siteDir, "out");
const docsDir = resolve(siteDir, "..", "docs");

if (!existsSync(outDir)) {
  console.error("No out/ folder found. Run `next build` first.");
  process.exit(1);
}

rmSync(docsDir, { recursive: true, force: true });
cpSync(outDir, docsDir, { recursive: true });
// Without this file GitHub Pages runs Jekyll, which drops the _next folder.
writeFileSync(resolve(docsDir, ".nojekyll"), "");
console.log(`Published ${outDir} -> ${docsDir}`);
