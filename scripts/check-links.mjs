#!/usr/bin/env node
/**
 * Validates every internal link in content/ against the prerendered site.
 *
 * Checking against .output/public rather than deriving routes from filenames
 * means the theme's own routing rules (_dir.yml redirects, i18n prefixes,
 * index pages) are ground truth — no heuristics to keep in sync.
 *
 * Run after `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";

const CONTENT = "content";
const OUT = ".output/public";

if (!fs.existsSync(OUT)) {
  console.error(`✗ ${OUT} not found — run \`npm run build\` first.`);
  process.exit(1);
}

function walk(dir, filter) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p, filter) : filter(p) ? [p] : [];
  });
}

/** A route resolves if the static host can serve it. */
const routeCache = new Map();
function routeExists(route) {
  if (routeCache.has(route)) return routeCache.get(route);
  const clean = route.replace(/[?#].*$/, "").replace(/\/$/, "");
  const rel = clean === "" ? "index.html" : clean.slice(1);
  const ok =
    fs.existsSync(path.join(OUT, rel, "index.html")) ||
    fs.existsSync(path.join(OUT, `${rel}.html`)) ||
    fs.existsSync(path.join(OUT, rel)); // static assets (images, etc.)
  routeCache.set(route, ok);
  return ok;
}

const files = walk(CONTENT, (p) => p.endsWith(".md"));
const problems = [];
let checked = 0;

for (const file of files) {
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const lines = text.split("\n");

  lines.forEach((line, i) => {
    const targets = [];

    // markdown links: [label](/route)
    for (const m of line.matchAll(/\]\((\/[^)\s]*)\)/g)) targets.push(m[1]);
    // MDC card frontmatter: `to: /route`
    const to = line.match(/^\s*to:\s*(\/\S*)\s*$/);
    if (to) targets.push(to[1]);

    for (const t of targets) {
      checked++;
      if (!routeExists(t)) {
        problems.push({ file, line: i + 1, target: t });
      }
    }
  });
}

// The locale prefix is easy to drop by hand and fails silently: a Russian
// reader is quietly handed the English page instead of a 404.
const localeSlips = [];
const TOP = /^\/(essentials|introduction|developer-guides|languages|use-cases|plugins|community-support)\b/;
for (const file of files.filter((f) => f.split(path.sep).includes("ru"))) {
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  text.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/\]\((\/[^)\s]*)\)/g)) {
      if (TOP.test(m[1])) localeSlips.push({ file, line: i + 1, target: m[1] });
    }
    const to = line.match(/^\s*to:\s*(\/\S*)\s*$/);
    if (to && TOP.test(to[1])) localeSlips.push({ file, line: i + 1, target: to[1] });
  });
}

console.log(`Checked ${checked} internal links across ${files.length} pages.\n`);

if (problems.length) {
  console.log(`✗ ${problems.length} broken link(s):`);
  for (const p of problems) console.log(`  ${p.file}:${p.line}  →  ${p.target}`);
  console.log("");
}

if (localeSlips.length) {
  console.log(`✗ ${localeSlips.length} Russian page(s) linking to English routes (missing /ru prefix):`);
  for (const p of localeSlips) console.log(`  ${p.file}:${p.line}  →  ${p.target}`);
  console.log("");
}

if (!problems.length && !localeSlips.length) {
  console.log("✓ All internal links resolve.");
  process.exit(0);
}
process.exit(1);
