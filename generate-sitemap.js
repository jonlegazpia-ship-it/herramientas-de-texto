const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://herramientasdetexto.com';
const TOOLS_DIR = path.join(__dirname, 'tools');
const OUTPUT = path.join(__dirname, 'sitemap.xml');

const STATIC_URLS = [
  { loc: `${BASE_URL}/`,                                          changefreq: 'weekly',  priority: '1.0' },
  { loc: `${BASE_URL}/contadores-de-texto`,                       changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/convertidores-de-texto`,                    changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/limpiadores-de-texto`,                      changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/manipulacion-de-texto`,                     changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/generadores-de-texto`,                      changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/seo-tools-de-texto`,                        changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/herramientas-para-estudiantes`,             changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/desarrollo-y-codificacion`,                 changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/redes-sociales`,                            changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/utilidades-avanzadas`,                      changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE_URL}/legal/aviso-legal`,                         changefreq: 'yearly',  priority: '0.3' },
  { loc: `${BASE_URL}/legal/politica-de-privacidad`,              changefreq: 'yearly',  priority: '0.3' },
  { loc: `${BASE_URL}/legal/cookies`,                             changefreq: 'yearly',  priority: '0.3' },
  { loc: `${BASE_URL}/legal/sobre-nosotros`,                      changefreq: 'yearly',  priority: '0.4' },
  { loc: `${BASE_URL}/legal/contacto`,                            changefreq: 'yearly',  priority: '0.4' },
];

function findHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function toUrl(filePath) {
  const rel = path.relative(TOOLS_DIR, filePath);
  const parts = rel.split(path.sep);
  const slug = parts[parts.length - 1].replace(/\.html$/, '');
  const category = parts[0];
  return `${BASE_URL}/${category}/${slug}`;
}

function renderUrl({ loc, changefreq, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const today = new Date().toISOString().split('T')[0];

const toolFiles = findHtmlFiles(TOOLS_DIR).sort();
const toolUrls = toolFiles.map(f => ({
  loc: toUrl(f),
  changefreq: 'monthly',
  priority: '0.7',
}));

const allUrls = [...STATIC_URLS, ...toolUrls];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  `<!-- Generated: ${today} — ${allUrls.length} URLs -->`,
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '',
  '  <!-- HOME + CATEGORÍAS -->',
  ...STATIC_URLS.slice(0, 11).map(renderUrl),
  '',
  '  <!-- PÁGINAS LEGALES -->',
  ...STATIC_URLS.slice(11).map(renderUrl),
  '',
  '  <!-- HERRAMIENTAS -->',
  ...toolUrls.map(renderUrl),
  '',
  '</urlset>',
].join('\n');

fs.writeFileSync(OUTPUT, xml, 'utf8');
console.log(`✓ sitemap.xml generado con ${allUrls.length} URLs (${STATIC_URLS.length} estáticas + ${toolUrls.length} herramientas)`);
