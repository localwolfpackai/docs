#!/usr/bin/env node

/**
 * validate.mjs — All-in-one validation for humanlup docs
 *
 * Checks:
 * 1. Frontmatter: every MDX page has title + description
 * 2. Navigation sync: every page in docs.json exists on disk, and vice versa
 * 3. Internal links: all root-relative links point to real pages
 * 4. Assets: all referenced images exist
 * 5. OpenAPI: spec file is valid JSON and schemas are referenced
 * 6. SEO: title length (≤60), description length (50–160)
 *
 * Usage:
 *   node scripts/validate.mjs          # run all checks
 *   node scripts/validate.mjs --fix    # auto-fix what's possible (future)
 */

import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, resolve, relative, extname } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const DOCS_JSON = join(ROOT, "docs.json");

// ── Helpers ──────────────────────────────────────────────────────────────────

let errors = 0;
let warnings = 0;

function error(check, msg) {
  console.error(`  ✗ [${check}] ${msg}`);
  errors++;
}

function warn(check, msg) {
  console.warn(`  ⚠ [${check}] ${msg}`);
  warnings++;
}

function pass(check, msg) {
  console.log(`  ✓ [${check}] ${msg}`);
}

/** Recursively find all files matching a predicate */
function walk(dir, predicate, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip hidden dirs, node_modules, .git
      if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
        walk(full, predicate, results);
      }
    } else if (predicate(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/** Parse YAML-ish frontmatter from MDX content */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w[\w-]*)\s*:\s*['"]?(.*?)['"]?\s*$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  return fm;
}

/** Extract all pages from docs.json navigation (recursive) */
function extractNavPages(obj) {
  const pages = [];
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === "string") {
        pages.push(item);
      } else {
        pages.push(...extractNavPages(item));
      }
    }
  } else if (obj && typeof obj === "object") {
    if (obj.pages) pages.push(...extractNavPages(obj.pages));
    if (obj.groups) pages.push(...extractNavPages(obj.groups));
    if (obj.tabs) pages.push(...extractNavPages(obj.tabs));
  }
  return pages;
}

/** Strip fenced code blocks and inline code so examples don't trigger false positives */
function stripCodeBlocks(content) {
  // Strip fenced code blocks first, then inline code
  return content.replace(/```[\s\S]*?```/g, "").replace(/`[^`]+`/g, "");
}

/** Extract internal links from MDX content (ignoring code blocks) */
function extractInternalLinks(content) {
  const cleaned = stripCodeBlocks(content);
  const links = [];
  // Markdown links: [text](/path) or [text](/path#anchor)
  const mdLinks = cleaned.matchAll(/\[.*?\]\((\/.+?)\)/g);
  for (const m of mdLinks) {
    links.push(m[1].split("#")[0].split("?")[0]);
  }
  // href="/path" in JSX
  const hrefLinks = cleaned.matchAll(/href=["'](\/.+?)["']/g);
  for (const m of hrefLinks) {
    const href = m[1].split("#")[0].split("?")[0];
    // skip absolute URLs that start with /
    if (!href.includes("://")) links.push(href);
  }
  return [...new Set(links)];
}

/** Extract image paths from MDX content (ignoring code blocks) */
function extractImagePaths(content) {
  const cleaned = stripCodeBlocks(content);
  const images = [];
  // Markdown images: ![alt](/images/foo.png)
  const mdImgs = cleaned.matchAll(/!\[.*?\]\((\/.+?)\)/g);
  for (const m of mdImgs) images.push(m[1]);
  // src="/images/foo.png" in JSX
  const srcImgs = cleaned.matchAll(/src=["'](\/.+?\.(png|jpg|jpeg|gif|svg|webp))["']/gi);
  for (const m of srcImgs) images.push(m[1]);
  return [...new Set(images)];
}

// ── Checks ───────────────────────────────────────────────────────────────────

function checkFrontmatter(mdxFiles) {
  console.log("\n🔍 Frontmatter validation");
  let checked = 0;
  for (const file of mdxFiles) {
    const rel = relative(ROOT, file);
    // Skip snippets — they don't need frontmatter
    if (rel.startsWith("snippets/")) continue;
    checked++;
    const content = readFileSync(file, "utf-8");
    const fm = parseFrontmatter(content);
    if (!fm) {
      error("frontmatter", `${rel} — missing frontmatter block`);
      continue;
    }
    if (!fm.title) {
      error("frontmatter", `${rel} — missing 'title'`);
    }
    if (!fm.description) {
      error("frontmatter", `${rel} — missing 'description'`);
    }
  }
  if (errors === 0) pass("frontmatter", `All ${checked} pages have title + description`);
}

function checkSEO(mdxFiles) {
  console.log("\n🔍 SEO field lengths");
  let issues = 0;
  for (const file of mdxFiles) {
    const rel = relative(ROOT, file);
    if (rel.startsWith("snippets/")) continue;
    const content = readFileSync(file, "utf-8");
    const fm = parseFrontmatter(content);
    if (!fm) continue;
    if (fm.title && fm.title.length > 60) {
      warn("seo", `${rel} — title is ${fm.title.length} chars (recommended ≤60)`);
      issues++;
    }
    if (fm.description) {
      if (fm.description.length < 50) {
        warn("seo", `${rel} — description is ${fm.description.length} chars (recommended ≥50)`);
        issues++;
      }
      if (fm.description.length > 160) {
        warn("seo", `${rel} — description is ${fm.description.length} chars (recommended ≤160)`);
        issues++;
      }
    }
  }
  if (issues === 0) pass("seo", "All titles and descriptions are within recommended lengths");
}

function checkNavSync(mdxFiles, config) {
  console.log("\n🔍 Navigation sync");
  const navPages = extractNavPages(config.navigation);
  const diskPages = mdxFiles
    .map((f) => relative(ROOT, f))
    .filter((r) => !r.startsWith("snippets/"))
    .map((r) => r.replace(/\.mdx$/, ""));

  let syncErrors = 0;

  // Pages in nav but not on disk
  for (const page of navPages) {
    const filePath = join(ROOT, page + ".mdx");
    if (!existsSync(filePath)) {
      error("nav-sync", `"${page}" is in docs.json but file doesn't exist`);
      syncErrors++;
    }
  }

  // Pages on disk but not in nav
  for (const page of diskPages) {
    if (!navPages.includes(page)) {
      warn("nav-sync", `"${page}" exists on disk but is not in docs.json navigation`);
      syncErrors++;
    }
  }

  if (syncErrors === 0) pass("nav-sync", `All ${navPages.length} nav entries match disk files`);
}

function checkInternalLinks(mdxFiles) {
  console.log("\n🔍 Internal link validation");
  let checked = 0;
  let broken = 0;
  for (const file of mdxFiles) {
    const rel = relative(ROOT, file);
    const content = readFileSync(file, "utf-8");
    const links = extractInternalLinks(content);
    for (const link of links) {
      checked++;
      // A link like /essentials/markdown resolves to essentials/markdown.mdx
      const asFile = join(ROOT, link.slice(1) + ".mdx");
      const asDir = join(ROOT, link.slice(1));
      const asAsset = join(ROOT, link.slice(1));
      if (!existsSync(asFile) && !existsSync(asDir) && !existsSync(asAsset)) {
        error("links", `${rel} — broken link: ${link}`);
        broken++;
      }
    }
  }
  if (broken === 0) pass("links", `All ${checked} internal links are valid`);
}

function checkAssets(mdxFiles) {
  console.log("\n🔍 Asset validation");
  let checked = 0;
  let missing = 0;
  for (const file of mdxFiles) {
    const rel = relative(ROOT, file);
    const content = readFileSync(file, "utf-8");
    const images = extractImagePaths(content);
    for (const img of images) {
      checked++;
      const imgPath = join(ROOT, img.slice(1));
      if (!existsSync(imgPath)) {
        error("assets", `${rel} — missing image: ${img}`);
        missing++;
      }
    }
  }

  // Also check docs.json references (logo, favicon)
  const config = JSON.parse(readFileSync(DOCS_JSON, "utf-8"));
  const configAssets = [
    config.favicon,
    config.logo?.light,
    config.logo?.dark,
  ].filter(Boolean);

  for (const asset of configAssets) {
    checked++;
    const assetPath = join(ROOT, asset.slice(1));
    if (!existsSync(assetPath)) {
      error("assets", `docs.json — missing asset: ${asset}`);
      missing++;
    }
  }

  if (missing === 0) pass("assets", `All ${checked} referenced assets exist`);
}

function checkOpenAPI() {
  console.log("\n🔍 OpenAPI spec validation");
  const specPath = join(ROOT, "api-reference", "openapi.json");
  if (!existsSync(specPath)) {
    error("openapi", "api-reference/openapi.json not found");
    return;
  }

  let spec;
  try {
    spec = JSON.parse(readFileSync(specPath, "utf-8"));
  } catch (e) {
    error("openapi", `Invalid JSON: ${e.message}`);
    return;
  }

  // Check required fields
  if (!spec.openapi) error("openapi", "Missing 'openapi' version field");
  if (!spec.info?.title) error("openapi", "Missing 'info.title'");
  if (!spec.info?.version) error("openapi", "Missing 'info.version'");
  if (!spec.paths || Object.keys(spec.paths).length === 0) {
    error("openapi", "No paths defined");
  }

  // Check that all $ref targets exist
  const refs = JSON.stringify(spec).matchAll(/"\$ref"\s*:\s*"#\/components\/schemas\/(\w+)"/g);
  const schemaNames = Object.keys(spec.components?.schemas || {});
  for (const ref of refs) {
    if (!schemaNames.includes(ref[1])) {
      error("openapi", `Schema reference "${ref[1]}" not found in components/schemas`);
    }
  }

  // Check that security scheme is defined
  if (spec.security) {
    for (const req of spec.security) {
      for (const scheme of Object.keys(req)) {
        if (!spec.components?.securitySchemes?.[scheme]) {
          error("openapi", `Security scheme "${scheme}" referenced but not defined`);
        }
      }
    }
  }

  // Check that all endpoints have summaries and operationIds
  let endpointCount = 0;
  for (const [path, methods] of Object.entries(spec.paths || {})) {
    for (const [method, op] of Object.entries(methods)) {
      if (typeof op !== "object") continue;
      endpointCount++;
      if (!op.summary) warn("openapi", `${method.toUpperCase()} ${path} — missing summary`);
      if (!op.operationId) warn("openapi", `${method.toUpperCase()} ${path} — missing operationId`);
    }
  }

  pass("openapi", `Spec is valid JSON with ${endpointCount} endpoints and ${schemaNames.length} schemas`);
}

function checkEndpointSync() {
  console.log("\n🔍 Endpoint MDX ↔ OpenAPI sync");
  const specPath = join(ROOT, "api-reference", "openapi.json");
  if (!existsSync(specPath)) return;

  const spec = JSON.parse(readFileSync(specPath, "utf-8"));
  const endpointDir = join(ROOT, "api-reference", "endpoint");
  if (!existsSync(endpointDir)) return;

  const endpointFiles = readdirSync(endpointDir).filter((f) => f.endsWith(".mdx"));
  let issues = 0;

  for (const file of endpointFiles) {
    const content = readFileSync(join(endpointDir, file), "utf-8");
    const fm = parseFrontmatter(content);
    if (!fm?.openapi) continue;

    // Parse "GET /plants" or "WEBHOOK /plant/webhook" style
    const match = fm.openapi.match(/^(\w+)\s+(\/\S+)$/);
    if (!match) {
      warn("endpoint-sync", `${file} — can't parse openapi field: "${fm.openapi}"`);
      issues++;
      continue;
    }

    const [, method, path] = match;

    // Webhooks are stored under spec.webhooks, not spec.paths
    if (method.toUpperCase() === "WEBHOOK") {
      const webhookObj = spec.webhooks?.[path];
      if (!webhookObj) {
        error("endpoint-sync", `${file} — webhook "${path}" not found in OpenAPI spec`);
        issues++;
      }
      continue;
    }

    const pathObj = spec.paths?.[path];
    if (!pathObj) {
      error("endpoint-sync", `${file} — path "${path}" not found in OpenAPI spec`);
      issues++;
      continue;
    }

    if (!pathObj[method.toLowerCase()]) {
      error("endpoint-sync", `${file} — method ${method} not defined for "${path}" in spec`);
      issues++;
    }
  }

  if (issues === 0) pass("endpoint-sync", `All ${endpointFiles.length} endpoint MDX files match the OpenAPI spec`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  humanlup docs — validation suite");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

const mdxFiles = walk(ROOT, (name) => name.endsWith(".mdx"));
const config = JSON.parse(readFileSync(DOCS_JSON, "utf-8"));

console.log(`\n  Found ${mdxFiles.length} MDX files\n`);

checkFrontmatter(mdxFiles);
checkSEO(mdxFiles);
checkNavSync(mdxFiles, config);
checkInternalLinks(mdxFiles);
checkAssets(mdxFiles);
checkOpenAPI();
checkEndpointSync();

// ── Summary ──────────────────────────────────────────────────────────────────

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
if (errors > 0) {
  console.log(`  ✗ ${errors} error(s), ${warnings} warning(s)`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  process.exit(1);
} else if (warnings > 0) {
  console.log(`  ✓ Passed with ${warnings} warning(s)`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  process.exit(0);
} else {
  console.log("  ✓ All checks passed — zero issues");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  process.exit(0);
}
