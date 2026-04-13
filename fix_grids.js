const fs = require('fs');
const path = require('path');

// ─── REDES SOCIALES ───────────────────────────────────────────────────────────
const redesFile = path.join(__dirname, 'categories', 'redes-sociales.html');
let redesHtml = fs.readFileSync(redesFile, 'utf8');

const redesNewGrid = `    <div class="cc-grid">

      <a href="/redes-sociales/contador-twitter/" class="cc-card cc-card--featured">
        <div class="cc-card-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M14 3.5c-.5.7-1.1 1.2-1.8 1.5C11.6 3.8 10.5 3 9.2 3 7.4 3 6 4.3 6 5.9v.6C3.7 6.4 1.8 5.2.7 3.5c0 0-2 4.5 2 6.5-1 .7-2 1-3 1 1 1 2.2 1.5 3.5 1.5C7.5 12.5 11 10 11 6.3v-.3c.7-.5 1.4-1.2 1.9-2l.1-.5z"/></svg></div>
        <div class="cc-card-body">
          <div class="cc-card-name">Contador de caracteres Twitter / X</div>
          <div class="cc-card-desc">Controla el límite de 280 caracteres con barra de progreso en tiempo real, cálculo de URLs y división automática para hilos.</div>
        </div>
        <span class="cc-card-arrow" aria-hidden="true">›</span>
      </a>

      <a href="/redes-sociales/contador-instagram/" class="cc-card">
        <div class="cc-card-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="2" width="12" height="12" rx="3"/><circle cx="8" cy="8" r="3"/><circle cx="11.5" cy="4.5" r=".6" fill="currentColor"/></svg></div>
        <div class="cc-card-body">
          <div class="cc-card-name">Contador de caracteres Instagram</div>
          <div class="cc-card-desc">Controla los 2.200 caracteres de caption y el límite de 150 para bio.</div>
        </div>
        <span class="cc-card-arrow" aria-hidden="true">›</span>
      </a>

      <a href="/redes-sociales/generador-hashtags-instagram/" class="cc-card">
        <div class="cc-card-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="5" y1="3" x2="4" y2="13"/><line x1="11" y1="3" x2="10" y2="13"/><line x1="2.5" y1="6.5" x2="13.5" y2="6.5"/><line x1="2" y1="9.5" x2="13" y2="9.5"/></svg></div>
        <div class="cc-card-body">
          <div class="cc-card-name">Generador de hashtags</div>
          <div class="cc-card-desc">Genera hashtags relevantes por temática o palabra clave para mayor alcance.</div>
        </div>
        <span class="cc-card-arrow" aria-hidden="true">›</span>
      </a>

      <a href="/redes-sociales/bio-instagram/" class="cc-card">
        <div class="cc-card-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg></div>
        <div class="cc-card-body">
          <div class="cc-card-name">Generador de bio para Instagram</div>
          <div class="cc-card-desc">Crea bios atractivas de 150 caracteres con emojis y llamada a la acción.</div>
        </div>
        <span class="cc-card-arrow" aria-hidden="true">›</span>
      </a>

    </div><!-- /.cc-grid -->`;

redesHtml = redesHtml.replace(
  /<div class="cc-grid">[\s\S]*?<div class="cc-tip"/,
  redesNewGrid + '\n\n    <div class="cc-tip"'
);
fs.writeFileSync(redesFile, redesHtml, 'utf8');
console.log('Done: redes-sociales');


// ─── DESARROLLO Y CODIFICACIÓN ────────────────────────────────────────────────
const devFile = path.join(__dirname, 'categories', 'desarrollo-y-codificacion.html');
let devHtml = fs.readFileSync(devFile, 'utf8');

const devNewGrid = `    <div class="cc-grid">

      <a href="/desarrollo-y-codificacion/formateador-json/" class="cc-card cc-card--featured">
        <div class="cc-card-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M6 6l-1.5 2L6 10M10 6l1.5 2L10 10"/></svg></div>
        <div class="cc-card-body">
          <div class="cc-card-name">Formateador JSON</div>
          <div class="cc-card-desc">Convierte JSON comprimido en código legible con indentación, coloreado de sintaxis y detección de errores en tiempo real.</div>
        </div>
        <span class="cc-card-arrow" aria-hidden="true">›</span>
      </a>

      <a href="/desarrollo-y-codificacion/codificador-base64/" class="cc-card">
        <div class="cc-card-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="5" width="12" height="6" rx="1.5"/><path d="M6 8h4"/></svg></div>
        <div class="cc-card-body">
          <div class="cc-card-name">Codificador Base64</div>
          <div class="cc-card-desc">Convierte texto o datos en cadena Base64 válida para APIs y transmisión segura.</div>
        </div>
        <span class="cc-card-arrow" aria-hidden="true">›</span>
      </a>

      <a href="/desarrollo-y-codificacion/generador-md5/" class="cc-card">
        <div class="cc-card-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 8c0 2.2-1.8 4-4 4S4 10.2 4 8s1.8-4 4-4"/><path d="M14 2l-2 2-2-2"/></svg></div>
        <div class="cc-card-body">
          <div class="cc-card-name">Generador de hash MD5</div>
          <div class="cc-card-desc">Calcula el hash MD5 de 128 bits de cualquier texto para verificación de integridad.</div>
        </div>
        <span class="cc-card-arrow" aria-hidden="true">›</span>
      </a>

      <a href="/desarrollo-y-codificacion/generador-uuid/" class="cc-card">
        <div class="cc-card-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="1" y="4" width="14" height="8" rx="2"/><path d="M5 8h1M8 8h1M11 8h1"/></svg></div>
        <div class="cc-card-body">
          <div class="cc-card-name">Generador UUID / GUID</div>
          <div class="cc-card-desc">Genera identificadores únicos universales v4 seguros para bases de datos y APIs.</div>
        </div>
        <span class="cc-card-arrow" aria-hidden="true">›</span>
      </a>

    </div><!-- /.cc-grid -->`;

devHtml = devHtml.replace(
  /<div class="cc-grid">[\s\S]*?<div class="cc-tip"/,
  devNewGrid + '\n\n    <div class="cc-tip"'
);
fs.writeFileSync(devFile, devHtml, 'utf8');
console.log('Done: desarrollo-y-codificacion');
