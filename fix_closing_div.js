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

  // Fix: ensure the proximamente div is properly closed before </main>
  html = html.replace(
    /(Las estamos creando[^<]*<\/p>)\s*\n\s*<\/main>/,
    '$1\n    </div>\n\n  </main>'
  );

  fs.writeFileSync(file, html, 'utf8');
  console.log('Fixed:', cat);
}
