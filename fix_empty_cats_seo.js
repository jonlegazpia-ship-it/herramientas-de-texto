const fs = require('fs');
const path = require('path');

const CATS = [
  'generadores-de-texto',
  'limpiadores-de-texto',
  'herramientas-para-estudiantes',
  'manipulacion-de-texto',
  'utilidades-avanzadas',
];

for (const cat of CATS) {
  const file = path.join(__dirname, 'categories', cat + '.html');
  let html = fs.readFileSync(file, 'utf8');

  // Remove everything inside <main> after the "proximamente" block,
  // i.e. the stray </div>, the ad, the ht-long section and the ht-faq section.
  // Keep only the proximamente div and close <main> cleanly.
  html = html.replace(
    /(<\/div>\s*<\/div>\s*)\s*<div class="cc-ad-mid"[\s\S]*?<\/section>\s*(\s*<\/main>)/,
    '\n  </main>'
  );

  // Also handle case where there's no stray </div> before cc-ad-mid
  html = html.replace(
    /(<\/div>\s*)\s*<div class="cc-ad-mid"[\s\S]*?<\/section>\s*(\s*<\/main>)/,
    '\n  </main>'
  );

  fs.writeFileSync(file, html, 'utf8');
  console.log('Done:', cat);
}
