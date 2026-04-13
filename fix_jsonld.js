const fs = require('fs');
const path = require('path');

// ─── REDES SOCIALES ───────────────────────────────────────────────────────────
const redesFile = path.join(__dirname, 'categories', 'redes-sociales.html');
let redesHtml = fs.readFileSync(redesFile, 'utf8');

const redesJsonLd = `  "name": "Herramientas para Redes Sociales Online — 4 Herramientas Gratuitas",
  "description": "Colección de herramientas para optimizar contenido en redes sociales: contadores de caracteres, generadores de hashtags y bios. Gratis, sin registro.",
  "url": "https://herramientasdetexto.com/redes-sociales/",
  "numberOfItems": 4,
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Contador de caracteres Twitter / X","url":"https://herramientasdetexto.com/redes-sociales/contador-twitter/"},
    {"@type":"ListItem","position":2,"name":"Contador de caracteres Instagram","url":"https://herramientasdetexto.com/redes-sociales/contador-instagram/"},
    {"@type":"ListItem","position":3,"name":"Generador de hashtags","url":"https://herramientasdetexto.com/redes-sociales/generador-hashtags-instagram/"},
    {"@type":"ListItem","position":4,"name":"Generador de bio para Instagram","url":"https://herramientasdetexto.com/redes-sociales/bio-instagram/"}
  ]`;

redesHtml = redesHtml.replace(
  /"name": "Herramientas para Redes Sociales[\s\S]*?"itemListElement": \[[\s\S]*?\]/,
  redesJsonLd
);
fs.writeFileSync(redesFile, redesHtml, 'utf8');
console.log('Done: redes-sociales JSON-LD');

// ─── DESARROLLO Y CODIFICACIÓN ────────────────────────────────────────────────
const devFile = path.join(__dirname, 'categories', 'desarrollo-y-codificacion.html');
let devHtml = fs.readFileSync(devFile, 'utf8');

const devJsonLd = `  "name": "Herramientas de Desarrollo y Codificación Online — 4 Herramientas Gratuitas",
  "description": "Herramientas para desarrolladores: formatear JSON, codificar Base64, calcular hashes MD5 y generar UUIDs. Gratis, sin registro.",
  "url": "https://herramientasdetexto.com/desarrollo-y-codificacion/",
  "numberOfItems": 4,
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Formateador JSON","url":"https://herramientasdetexto.com/desarrollo-y-codificacion/formateador-json/"},
    {"@type":"ListItem","position":2,"name":"Codificador Base64","url":"https://herramientasdetexto.com/desarrollo-y-codificacion/codificador-base64/"},
    {"@type":"ListItem","position":3,"name":"Generador de hash MD5","url":"https://herramientasdetexto.com/desarrollo-y-codificacion/generador-md5/"},
    {"@type":"ListItem","position":4,"name":"Generador UUID / GUID","url":"https://herramientasdetexto.com/desarrollo-y-codificacion/generador-uuid/"}
  ]`;

devHtml = devHtml.replace(
  /"name": "Herramientas de Desarrollo[\s\S]*?"itemListElement": \[[\s\S]*?\]/,
  devJsonLd
);
fs.writeFileSync(devFile, devHtml, 'utf8');
console.log('Done: desarrollo-y-codificacion JSON-LD');
