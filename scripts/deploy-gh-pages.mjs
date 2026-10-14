// Builds the static site and publishes ./out to the `gh-pages` branch of the
// repo's `origin` remote, which GitHub Pages serves.
//
//   npm run deploy
//
// It publishes a fresh orphan commit each time, so the branch holds only the
// current build and never grows.

import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const out = (cmd, opts = {}) => execSync(cmd, { encoding: "utf8", ...opts }).trim();

const remote = out("git remote get-url origin");
const name = out("git config user.name") || "portfolio-deploy";
const email = out("git config user.email") || "deploy@users.noreply.github.com";

console.log("› Building static site…");
run("npx next build");

if (!existsSync("out/index.html")) {
  console.error("Build did not produce out/index.html — aborting.");
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "gh-pages-"));
try {
  cpSync("out", dir, { recursive: true });
  // Tell GitHub Pages not to run Jekyll, which would drop the _next/ folder.
  writeFileSync(join(dir, ".nojekyll"), "");

  run("git init -q -b gh-pages", { cwd: dir });
  run("git add -A", { cwd: dir });
  run(`git -c user.name="${name}" -c user.email="${email}" commit -q -m "Deploy site"`, { cwd: dir });

  console.log("› Publishing to gh-pages…");
  run(`git push -f "${remote}" gh-pages`, { cwd: dir });
  console.log("✓ Published. It can take a minute for GitHub Pages to refresh.");
} finally {
  rmSync(dir, { recursive: true, force: true });
}
