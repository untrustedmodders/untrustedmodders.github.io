#!/usr/bin/env node
/**
 * Reports pages that exist in one locale but not another, plus translations
 * whose structure has drifted from the source (heading and code-block counts).
 *
 * Structural drift is the useful signal here: it catches a translation that
 * silently lost a section or a code sample when the English page grew.
 *
 * Already-untranslated pages are recorded in i18n-baseline.json so this can
 * run as a ratchet: it fails on a *newly* untranslated page without demanding
 * the existing backlog be cleared first. Translate something and the check
 * tells you to drop it from the baseline.
 *
 * Structural drift is a warning only — a translation may legitimately differ
 * in shape.
 */
import fs from "node:fs";
import path from "node:path";

const CONTENT = "content";
const LOCALES = ["ru"];
const BASELINE = path.join("scripts", "i18n-baseline.json");

const baseline = fs.existsSync(BASELINE)
  ? JSON.parse(fs.readFileSync(BASELINE, "utf8"))
  : {};

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const rel = (p) => path.relative(CONTENT, p).split(path.sep).join("/");

const all = walk(CONTENT).filter((f) => f.endsWith(".md")).map(rel);
const base = all.filter((f) => !LOCALES.some((l) => f.startsWith(`${l}/`)));

function counts(file) {
  const t = fs.readFileSync(path.join(CONTENT, file), "utf8").replace(/\r\n/g, "\n");
  const body = t.replace(/^---\n[\s\S]*?\n---\n/, "");
  return {
    headings: (body.match(/^#{1,4} /gm) || []).length,
    fences: (body.match(/^```/gm) || []).length,
  };
}

let newlyMissing = 0;
let stale = 0;
const drift = [];

for (const loc of LOCALES) {
  const have = new Set(all.filter((f) => f.startsWith(`${loc}/`)).map((f) => f.slice(loc.length + 1)));
  const missing = base.filter((f) => !have.has(f));
  const orphan = [...have].filter((f) => !base.includes(f));
  const known = new Set(baseline[loc] ?? []);

  console.log(`── ${loc.toUpperCase()} ──  ${have.size}/${base.length} pages translated`);

  const fresh = missing.filter((f) => !known.has(f));
  const backlog = missing.filter((f) => known.has(f));
  const fixed = [...known].filter((f) => have.has(f));

  if (backlog.length) {
    console.log(`\n  ${backlog.length} known untranslated page(s) (in baseline, not blocking):`);
    for (const f of backlog) console.log(`    ${f}`);
  }

  if (fresh.length) {
    console.log(`\n✗ ${fresh.length} newly untranslated page(s) in ${loc}:`);
    for (const f of fresh) console.log(`  ${f}`);
    console.log(`  → translate them, or add to ${BASELINE} under "${loc}" if that is deliberate.`);
    newlyMissing += fresh.length;
  }

  if (fixed.length) {
    console.log(`\n✗ ${fixed.length} baseline entr(y/ies) now translated — remove from ${BASELINE}:`);
    for (const f of fixed) console.log(`  ${f}`);
    stale += fixed.length;
  }
  if (orphan.length) {
    console.log(`\n! ${orphan.length} page(s) in ${loc} with no source page:`);
    for (const f of orphan) console.log(`  ${loc}/${f}`);
  }

  for (const f of base.filter((f) => have.has(f))) {
    const a = counts(f);
    const b = counts(`${loc}/${f}`);
    if (a.headings !== b.headings || a.fences !== b.fences) {
      drift.push({ f, loc, a, b });
    }
  }
  console.log("");
}

if (drift.length) {
  console.log(`! ${drift.length} translated page(s) structurally drifted from the source:`);
  for (const d of drift) {
    const h = d.a.headings !== d.b.headings ? ` headings ${d.a.headings}→${d.b.headings}` : "";
    const c = d.a.fences !== d.b.fences ? ` code-blocks ${d.a.fences / 2}→${d.b.fences / 2}` : "";
    console.log(`  ${d.loc}/${d.f}${h}${c}`);
  }
  console.log("");
}

if (newlyMissing || stale) {
  process.exit(1);
}
console.log("✓ No new translation gaps.");
