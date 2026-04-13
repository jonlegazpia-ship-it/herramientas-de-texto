const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const EXTS = ['.html', '.js'];

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git'].includes(entry.name)) continue;
      results.push(...walk(full));
    } else if (EXTS.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(ROOT);
let totalFixed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Replace / with / in URLs (href, src, canonical, JS strings)
  const updated = content.replace(/\/herramientas\//g, '/');
  if (updated !== content) {
    const count = (content.match(/\/herramientas\//g) || []).length;
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Fixed ${count} occurrence(s): ${path.relative(ROOT, file)}`);
    totalFixed += count;
  }
}

console.log(`\nDone. Total replacements: ${totalFixed}`);
