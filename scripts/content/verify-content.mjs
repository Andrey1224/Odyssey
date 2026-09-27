import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`[FAIL] ${message}`);
}

function pass(message) {
  console.log(`[PASS] ${message}`);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(relativeDir, extensions) {
  const absoluteDir = path.join(root, relativeDir);
  if (!fs.existsSync(absoluteDir)) return [];

  const result = [];
  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(relativePath, extensions));
    } else if (extensions.has(path.extname(entry.name).toLowerCase())) {
      result.push(relativePath);
    }
  }
  return result;
}

function parseSimpleCsv(text) {
  const rows = text.trim().split(/\r?\n/);
  const headers = rows.shift().split(",");
  return rows.filter(Boolean).map((row) => {
    const values = row.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function checkCanonicalOrigin() {
  const site = read("lib/site.ts");
  if (!site.includes('https://odysseybaths.co.uk')) {
    fail("lib/site.ts does not contain the approved canonical origin");
    return;
  }
  if (/SITE_DOMAIN\s*=\s*["']https:\/\/[^"']*vercel\.app/.test(site)) {
    fail("SITE_DOMAIN points to a Vercel hostname");
    return;
  }
  pass("Canonical origin remains on odysseybaths.co.uk");
}

function checkTrackedSecrets() {
  let tracked = [];
  try {
    tracked = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
      .trim()
      .split(/\r?\n/)
      .filter(Boolean);
  } catch (error) {
    fail(`Unable to inspect tracked files: ${error.message}`);
    return;
  }

  const forbidden = tracked.filter((file) => {
    const base = path.basename(file);
    return base.startsWith(".env") && base !== ".env.example";
  });

  if (forbidden.length > 0) {
    fail(`Tracked environment/secret files: ${forbidden.join(", ")}`);
  } else {
    pass("No tracked .env secret files");
  }
}

function checkLocalImageReferences() {
  const sourceDirs = ["app", "components", "data", "lib"];
  const sourceFiles = sourceDirs.flatMap((dir) => walk(dir, new Set([".ts", ".tsx", ".js", ".jsx"])));
  const references = new Map();
  const imagePattern = /["'`](\/images\/[^"'`?#\s)]+)/g;

  for (const file of sourceFiles) {
    const contents = read(file);
    for (const match of contents.matchAll(imagePattern)) {
      const publicPath = match[1];
      const localPath = path.join("public", publicPath);
      const users = references.get(publicPath) ?? [];
      users.push(file);
      references.set(publicPath, users);

      if (!fs.existsSync(path.join(root, localPath))) {
        fail(`${file} references missing local image ${publicPath}`);
      }
    }
  }

  if (references.size === 0) {
    fail("No local image references were detected; validator pattern may be stale");
    return;
  }

  pass(`Resolved ${references.size} distinct local image references`);

  const shared = [...references.entries()].filter(([, users]) => new Set(users).size > 1);
  if (shared.length > 0) {
    console.log(`[INFO] ${shared.length} image paths are shared across multiple source files; review impact before replacing them.`);
  }
}

function checkNestedImageAssets() {
  const imageFiles = walk("public/images", new Set([".webp", ".avif", ".jpg", ".jpeg", ".png", ".svg"]));
  const controlled = imageFiles.filter((file) =>
    file.startsWith(path.join("public", "images", "articles")) ||
    file.startsWith(path.join("public", "images", "products")),
  );

  for (const file of controlled) {
    const name = path.basename(file, path.extname(file));
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
      fail(`${file} must use a lowercase kebab-case filename`);
    }

    const size = fs.statSync(path.join(root, file)).size;
    if (size > 2 * 1024 * 1024) {
      fail(`${file} is ${(size / 1024 / 1024).toFixed(1)} MB; nested web assets must be 2 MB or smaller`);
    }
  }

  pass(`Validated ${controlled.length} product/article-specific image assets`);
}

function checkRecoveredArticles() {
  const queuePath = "docs/seo-recovery/CONTENT_RECOVERY_QUEUE.csv";
  if (!fs.existsSync(path.join(root, queuePath))) {
    fail(`${queuePath} is missing`);
    return;
  }

  const queue = parseSimpleCsv(read(queuePath));
  const restored = queue.filter((row) => row.implementation_status.startsWith("restored_"));
  const sitemap = read("app/sitemap.ts");

  for (const row of restored) {
    const slug = row.old_path.replace(/^\//, "").replace(/\/$/, "");
    const pagePath = `app/${slug}/page.tsx`;
    if (!fs.existsSync(path.join(root, pagePath))) {
      fail(`Restored queue item has no page: ${row.old_path}`);
      continue;
    }

    const page = read(pagePath);
    const requiredSignals = [
      ["SITE_DOMAIN", "SITE_DOMAIN canonical/URL usage"],
      ["alternates", "canonical metadata"],
      ["BlogPosting", "BlogPosting JSON-LD"],
      ["LegacyArticleLayout", "legacy article layout"],
    ];
    for (const [needle, label] of requiredSignals) {
      if (!page.includes(needle)) fail(`${pagePath} is missing ${label}`);
    }
    if (/robots\s*:\s*\{[^}]*index\s*:\s*false/s.test(page)) {
      fail(`${pagePath} explicitly disables indexing`);
    }
    if (!sitemap.includes(`/${slug}`)) {
      fail(`app/sitemap.ts is missing restored article /${slug}`);
    }
  }

  pass(`Checked ${restored.length} restored article queue entries`);
}

function checkRequiredGuides() {
  const required = [
    "CLAUDE.md",
    "docs/paul/PAUL_AND_CLAUDE_WORKFLOW.md",
    "docs/paul/START_HERE_FOR_PAUL.md",
    "docs/paul/IMAGE_WORKFLOW.md",
    "docs/paul/CLAUDE_TASK_TEMPLATES.md",
    "docs/seo-recovery/CONTENT_RECOVERY_RUNBOOK.md",
    "docs/seo-recovery/SOURCE_RECORD_TEMPLATE.md",
  ];

  for (const file of required) {
    if (!fs.existsSync(path.join(root, file))) fail(`Required workflow guide is missing: ${file}`);
  }
  if (failures === 0) pass("Required Paul/Claude workflow guides are present");
}

console.log("Odyssey content safety verification\n");
checkCanonicalOrigin();
checkTrackedSecrets();
checkLocalImageReferences();
checkNestedImageAssets();
checkRecoveredArticles();
checkRequiredGuides();

console.log(`\nCompleted with ${failures} failure(s).`);
if (failures > 0) process.exit(1);
