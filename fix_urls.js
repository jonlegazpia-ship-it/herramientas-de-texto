const fs = require('fs');
const path = require('path');

// Map of wrong URL patterns → correct URL (based on actual filename)
const FIXES = [
  ['/convertidores-de-texto/texto-a-camelcase/',               '/convertidores-de-texto/texto-a-camelcase/'],
  ['/desarrollo-y-codificacion/codificador-base64/',               '/desarrollo-y-codificacion/codificador-base64/'],
  ['/desarrollo-y-codificacion/generador-md5/',             '/desarrollo-y-codificacion/generador-md5/'],
  ['/desarrollo-y-codificacion/generador-md5/',   '/desarrollo-y-codificacion/generador-md5/'],
  ['/redes-sociales/contador-twitter/',                         '/redes-sociales/contador-twitter/'],
  ['/redes-sociales/contador-instagram/',                       '/redes-sociales/contador-instagram/'],
  ['/redes-sociales/generador-hashtags-instagram/',              '/redes-sociales/generador-hashtags-instagram/'],
  ['/redes-sociales/generador-hashtags-instagram/',           '/redes-sociales/generador-hashtags-instagram/'],
  ['/redes-sociales/bio-instagram/',         '/redes-sociales/bio-instagram/'],
  ['/redes-sociales/contador-twitter/',     '/redes-sociales/contador-twitter/'],
  ['/redes-sociales/contador-instagram/',   '/redes-sociales/contador-instagram/'],
];

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git'].includes(entry.name)) continue;
      results.push(...walk(full));
    } else if (['.html', '.js'].includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(__dirname);
let totalFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [wrong, correct] of FIXES) {
    if (content.includes(wrong)) {
      content = content.split(wrong).join(correct);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', path.relative(__dirname, file));
    totalFiles++;
  }
}

console.log(`\nDone. Fixed ${totalFiles} file(s).`);
