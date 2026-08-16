#!/usr/bin/env node
/**
 * Validates every manifest example embedded in the docs against the real
 * Plugify JSON schemas.
 *
 * Blocks are picked up by their code-group filename, e.g.
 *   ```json [my_plugin.pplugin]
 * so the check follows the docs' existing convention rather than needing
 * annotations. Schemas are fetched from the plugify repo, which means this
 * fails the moment an example drifts from the shipped schema — that drift is
 * exactly what the check exists to catch.
 *
 * Examples are illustrative excerpts, so absent `required` fields are ignored.
 * Wrong types and bad enum values (a misspelled parameter type) are hard
 * errors — those are the ones that mislead readers.
 *
 * KNOWN_SCHEMA_GAPS below records places where the docs are correct and the
 * *schema* is wrong. Delete an entry once the schema is fixed upstream; the
 * check prints them on every run so they don't get forgotten.
 */
import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";

const CONTENT = "content";
const SCHEMA_BASE = "https://raw.githubusercontent.com/untrustedmodders/plugify/main/schemas";
const SCHEMAS = { pplugin: "plugin.schema.json", pmodule: "module.schema.json", pconfig: "config.schema.json" };

const CACHE = path.join(".cache", "plugify-schemas");

/**
 * Docs are correct here; the schema is not. Each entry matches an Ajv error
 * and is downgraded to a printed note instead of a failure.
 */
const KNOWN_SCHEMA_GAPS = [
  {
    id: "$schema-not-allowed",
    why: "Manifests should carry a `$schema` key for editor autocomplete — the docs' own examples do, and so does the .NET module's generated manifest — but the schemas set `additionalProperties: false` without declaring `$schema`.",
    match: (err, data) => err.keyword === "additionalProperties"
      && err.params.additionalProperty === "$schema"
      && Object.hasOwn(data, "$schema"),
  },
  {
    id: "funcName-dotted",
    why: "The .NET module requires `Namespace.Class.Method` (see plugify-module-dotnet/src/module.cpp:67) and `+` for nested classes, but the schema's funcName pattern allows neither.",
    match: (err) => err.keyword === "pattern"
      && err.instancePath.endsWith("/funcName")
      && /^[a-zA-Z_][a-zA-Z0-9_]*([.+][a-zA-Z_][a-zA-Z0-9_]*)+$/.test(err.data ?? ""),
  },
];

async function loadSchema(file) {
  const cached = path.join(CACHE, file);
  if (fs.existsSync(cached) && Date.now() - fs.statSync(cached).mtimeMs < 3600_000) {
    return JSON.parse(fs.readFileSync(cached, "utf8"));
  }
  const res = await fetch(`${SCHEMA_BASE}/${file}`);
  if (!res.ok) throw new Error(`fetch ${file}: HTTP ${res.status}`);
  const text = await res.text();
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(cached, text);
  return JSON.parse(text);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

/** Pull ```json [name.ext] blocks out of a markdown file. */
function extractBlocks(file) {
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const lines = text.split("\n");
  const out = [];
  let open = null;
  lines.forEach((line, i) => {
    const start = line.match(/^\s*```(?:json|jsonc)?\s*\[([^\]]+)\]/);
    if (!open && start) {
      const ext = path.extname(start[1]).slice(1);
      if (SCHEMAS[ext]) open = { ext, name: start[1], startLine: i + 1, body: [] };
      else open = { skip: true };
      return;
    }
    if (open && /^\s*```\s*$/.test(line)) {
      if (!open.skip) out.push({ ...open, body: open.body.join("\n") });
      open = null;
      return;
    }
    if (open && !open.skip) open.body.push(line);
  });
  return out;
}

const ajv = new Ajv({ allErrors: true, strict: false, validateFormats: false, verbose: true });
const validators = {};
for (const [ext, file] of Object.entries(SCHEMAS)) {
  try {
    validators[ext] = ajv.compile(await loadSchema(file));
  } catch (e) {
    console.error(`✗ could not load ${file}: ${e.message}`);
    process.exit(1);
  }
}

const files = walk(CONTENT).filter((f) => f.endsWith(".md"));
const errors = [];
const fragments = [];
const gapHits = new Map();
let n = 0;

for (const file of files) {
  for (const block of extractBlocks(file)) {
    n++;
    const where = `${file}:${block.startLine}  [${block.name}]`;
    let data;
    try {
      data = JSON.parse(block.body);
    } catch {
      // A bare `"key": [...]` excerpt labelled with a manifest filename reads
      // like a complete file. Flag the labelling, not the JSON.
      if (/^\s*"[\w$]+"\s*:/.test(block.body)) fragments.push(where);
      else errors.push(`${where}\n    invalid JSON`);
      continue;
    }
    const validate = validators[block.ext];
    if (validate(data)) continue;
    for (const err of validate.errors) {
      if (err.keyword === "required") continue; // excerpts omit fields by design

      const gap = KNOWN_SCHEMA_GAPS.find((g) => g.match(err, data));
      if (gap) {
        if (!gapHits.has(gap.id)) gapHits.set(gap.id, { gap, count: 0 });
        gapHits.get(gap.id).count++;
        continue;
      }

      const at = err.instancePath || "(root)";
      const allowed = err.params?.allowedValues ? ` — allowed: ${err.params.allowedValues.join(", ")}` : "";
      errors.push(`${where}\n    ${at} ${err.message}${allowed}`);
    }
  }
}

console.log(`Validated ${n} manifest example(s) across ${files.length} pages.\n`);

if (gapHits.size) {
  console.log("known schema gaps (docs are right, schema needs fixing upstream):");
  for (const { gap, count } of gapHits.values()) {
    console.log(`  • ${gap.id} — ${count} example(s)`);
    console.log(`    ${gap.why}`);
  }
  console.log("");
}

if (fragments.length) {
  console.log(`! ${fragments.length} excerpt(s) labelled as a full manifest file:`);
  for (const f of fragments) console.log(`  ${f}`);
  console.log("");
}

if (errors.length) {
  console.log(`✗ ${errors.length} schema violation(s):`);
  for (const e of errors) console.log(`  ${e}`);
  process.exit(1);
}

console.log("✓ All manifest examples match the Plugify schemas.");
