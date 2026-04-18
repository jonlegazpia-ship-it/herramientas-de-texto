/**
 * Replace hardcoded category hex colors inside <style> blocks in tool HTML files
 * with var(--cat-color) / var(--cat-bg) so they automatically match the category.
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, 'tools');
const SKIP = new Set(['bio-instagram.html']);

// Hex values that are "category primary" colors (should → var(--cat-color))
const CAT_PRIMARY = new Set([
  '#2563EB', '#7C3AED', '#059669', '#C2185B', '#1D9BF0', '#16A34A', '#CA8A04',
  '#0891B2', '#0D9488', '#C026D3', '#A855F7', '#E1306C', '#F56040', '#0284C7',
  '#38BDF8', '#A78BFA',
]);

// Hex values that are "category background" colors (should → var(--cat-bg))
const CAT_BG = new Set([
  '#EFF6FF', '#F5F3FF', '#ECFDF5', '#FFF0F6', '#F0F9FF', '#F0FDF4',
  '#DDD6FE', '#DBEAFE', '#A7F3D0', '#BBF7D0', '#BAE6FD', '#FBCFE8',
]);

// Category border colors (should → var(--cat-border))
const CAT_BORDER = new Set([
  '#DBEAFE', '#EDE9FE', '#A7F3D0', '#FBCFE8', '#BAE6FD', '#BBF7D0', '#DDD6FE',
]);

function replaceInsideStyleBlocks(text) {
  // Process each <style>...</style> block
  return text.replace(/<style>([\s\S]*?)<\/style>/g, (match, css) => {
    let newCss = css;

    // Replace cat primary colors
    for (const hex of CAT_PRIMARY) {
      const re = new RegExp(hex.replace('#', '#'), 'gi');
      newCss = newCss.replace(re, 'var(--cat-color)');
    }

    // Replace cat background colors — only when next to border-radius or padding
    // to avoid replacing random uses; but in these files it's always safe
    for (const hex of CAT_BG) {
      const re = new RegExp(hex.replace('#', '#'), 'gi');
      newCss = newCss.replace(re, 'var(--cat-bg)');
    }

    return `<style>${newCss}</style>`;
  });
}

function getAllHtmlFiles(dir) {
  const results = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) results.push(...getAllHtmlFiles(full));
    else if (e.name.endsWith('.html')) results.push(full);
  }
  return results;
}

console.log('Patching inline <style> blocks...');
for (const f of getAllHtmlFiles(TOOLS_DIR).sort()) {
  if (SKIP.has(path.basename(f))) continue;

  let text = fs.readFileSync(f, 'utf8');
  const patched = replaceInsideStyleBlocks(text);

  if (patched !== text) {
    fs.writeFileSync(f, patched, 'utf8');
    console.log(`  OK: ${path.basename(f)}`);
  } else {
    console.log(`  -- no change: ${path.basename(f)}`);
  }
}
console.log('Done.');
