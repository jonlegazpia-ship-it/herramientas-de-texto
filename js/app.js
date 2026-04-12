/* ============================================================
   HerramientasDeTexto.com — app.js
   Lógica de la home: tema, menú mobile, búsqueda
   ============================================================ */

/* ── Tema claro / oscuro ─────────────────────────────── */
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', function () {

  // Aplicar iconos según tema actual
  const root      = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const iconSun   = document.getElementById('iconSun');
  const iconMoon  = document.getElementById('iconMoon');

  function applyThemeIcons(theme) {
    if (theme === 'dark') {
      iconSun.style.display  = 'block';
      iconMoon.style.display = 'none';
    } else {
      iconSun.style.display  = 'none';
      iconMoon.style.display = 'block';
    }
  }

  applyThemeIcons(root.getAttribute('data-theme'));

  toggleBtn.addEventListener('click', function () {
    const current = root.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyThemeIcons(next);
  });


  /* ── Menú mobile ────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const mainNav   = document.getElementById('mainNav');

  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', function (e) {
    if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });


  /* ── Mini-registro de herramientas para la búsqueda ── */
  // Solo los datos necesarios en home (nombre, icono, url)
  // El registro completo vive en js/registry.js (se carga en páginas de tools)
  const TOOLS = [
    // Contadores
    { n: 'Contador de palabras',           i: '🔢', u: 'herramientas/contadores-de-texto/contador-de-palabras' },
    { n: 'Contador de caracteres',          i: '🔤', u: 'herramientas/contadores-de-texto/contador-de-caracteres' },
    { n: 'Contador de frases',              i: '💬', u: 'herramientas/contadores-de-texto/contador-de-frases' },
    { n: 'Contador de párrafos',            i: '📄', u: 'herramientas/contadores-de-texto/contador-de-parrafos' },
    { n: 'Contador de líneas',              i: '↕️', u: 'herramientas/contadores-de-texto/contador-de-lineas' },
    { n: 'Contador de emojis',              i: '😊', u: 'herramientas/contadores-de-texto/contador-de-emojis' },
    { n: 'Contador de hashtags',            i: '#️⃣', u: 'herramientas/contadores-de-texto/contador-de-hashtags' },
    { n: 'Contador de sílabas',             i: '🗣️', u: 'herramientas/contadores-de-texto/contador-de-silabas' },
    { n: 'Contador de palabras únicas',     i: '✨', u: 'herramientas/contadores-de-texto/palabras-unicas' },
    { n: 'Tiempo de lectura',               i: '⏱️', u: 'herramientas/contadores-de-texto/tiempo-de-lectura' },
    { n: 'Tiempo de habla',                 i: '🎤', u: 'herramientas/contadores-de-texto/tiempo-de-habla' },
    { n: 'Densidad de palabras',            i: '📊', u: 'herramientas/contadores-de-texto/densidad-de-palabras' },
    { n: 'Analizador completo de texto',    i: '🔍', u: 'herramientas/contadores-de-texto/analizador-completo' },
    // Convertidores
    { n: 'Convertir a mayúsculas',          i: '🔠', u: 'herramientas/convertidores-de-texto/mayusculas' },
    { n: 'Convertir a minúsculas',          i: '🔡', u: 'herramientas/convertidores-de-texto/minusculas' },
    { n: 'Convertir a formato título',      i: '🅰️', u: 'herramientas/convertidores-de-texto/titulo' },
    { n: 'Convertir a formato oración',     i: '📝', u: 'herramientas/convertidores-de-texto/oracion' },
    { n: 'Texto a camelCase',               i: '🐪', u: 'herramientas/convertidores-de-texto/camelcase' },
    { n: 'Texto a snake_case',              i: '🐍', u: 'herramientas/convertidores-de-texto/snake-case' },
    { n: 'Texto a kebab-case',              i: '🍢', u: 'herramientas/convertidores-de-texto/kebab-case' },
    { n: 'Texto a PascalCase',              i: '🅿️', u: 'herramientas/convertidores-de-texto/pascal-case' },
    { n: 'Texto a slug URL',                i: '🔗', u: 'herramientas/convertidores-de-texto/slug' },
    { n: 'Texto a HTML',                    i: '🌐', u: 'herramientas/convertidores-de-texto/texto-a-html' },
    { n: 'HTML a texto',                    i: '📃', u: 'herramientas/convertidores-de-texto/html-a-texto' },
    { n: 'Texto a Markdown',                i: '⬇️', u: 'herramientas/convertidores-de-texto/texto-a-markdown' },
    { n: 'Markdown a HTML',                 i: '🔀', u: 'herramientas/convertidores-de-texto/markdown-a-html' },
    { n: 'Texto a binario',                 i: '01', u: 'herramientas/convertidores-de-texto/binario' },
    { n: 'Binario a texto',                 i: '🔤', u: 'herramientas/convertidores-de-texto/binario-a-texto' },
    { n: 'Texto a ASCII',                   i: '🔣', u: 'herramientas/convertidores-de-texto/ascii' },
    { n: 'Texto a JSON',                    i: '{}',  u: 'herramientas/convertidores-de-texto/texto-a-json' },
    { n: 'Texto a CSV',                     i: '📊', u: 'herramientas/convertidores-de-texto/texto-a-csv' },
    { n: 'CSV a texto',                     i: '📋', u: 'herramientas/convertidores-de-texto/csv-a-texto' },
    { n: 'Texto a código QR',               i: '▦',  u: 'herramientas/convertidores-de-texto/qr' },
    // Limpiadores
    { n: 'Eliminar espacios extra',         i: '🧹', u: 'herramientas/limpiadores-de-texto/eliminar-espacios' },
    { n: 'Eliminar líneas en blanco',       i: '🗑️', u: 'herramientas/limpiadores-de-texto/eliminar-lineas-blanco' },
    { n: 'Eliminar líneas duplicadas',      i: '♻️', u: 'herramientas/limpiadores-de-texto/eliminar-duplicados' },
    { n: 'Eliminar HTML',                   i: '🚫', u: 'herramientas/limpiadores-de-texto/eliminar-html' },
    { n: 'Eliminar emojis',                 i: '🙅', u: 'herramientas/limpiadores-de-texto/eliminar-emojis' },
    { n: 'Eliminar URLs',                   i: '🔇', u: 'herramientas/limpiadores-de-texto/eliminar-urls' },
    { n: 'Eliminar acentos',                i: '´',  u: 'herramientas/limpiadores-de-texto/eliminar-acentos' },
    { n: 'Eliminar signos de puntuación',   i: '.,', u: 'herramientas/limpiadores-de-texto/eliminar-puntuacion' },
    { n: 'Eliminar números',                i: '🔢', u: 'herramientas/limpiadores-de-texto/eliminar-numeros' },
    { n: 'Limpiar texto de Word',           i: '📎', u: 'herramientas/limpiadores-de-texto/limpiar-word' },
    { n: 'Limpiar texto de PDF',            i: '📕', u: 'herramientas/limpiadores-de-texto/limpiar-pdf' },
    { n: 'Limpiar texto para SEO',          i: '📈', u: 'herramientas/limpiadores-de-texto/limpiar-seo' },
    { n: 'Normalizar espacios',             i: '⬜', u: 'herramientas/limpiadores-de-texto/normalizar-espacios' },
    // Manipulación
    { n: 'Invertir texto',                  i: '↩️', u: 'herramientas/manipulacion-de-texto/invertir-texto' },
    { n: 'Ordenar líneas alfabéticamente',  i: '🔤', u: 'herramientas/manipulacion-de-texto/ordenar-lineas' },
    { n: 'Mezclar líneas aleatoriamente',   i: '🔀', u: 'herramientas/manipulacion-de-texto/mezclar-lineas' },
    { n: 'Extraer emails',                  i: '📧', u: 'herramientas/manipulacion-de-texto/extraer-emails' },
    { n: 'Extraer URLs',                    i: '🔗', u: 'herramientas/manipulacion-de-texto/extraer-urls' },
    { n: 'Extraer números',                 i: '🔢', u: 'herramientas/manipulacion-de-texto/extraer-numeros' },
    { n: 'Reemplazar texto',                i: '🔁', u: 'herramientas/manipulacion-de-texto/reemplazar-texto' },
    { n: 'Repetir texto',                   i: '🔄', u: 'herramientas/manipulacion-de-texto/repetir-texto' },
    // Generadores
    { n: 'Generador Lorem Ipsum',           i: '📝', u: 'herramientas/generadores-de-texto/lorem-ipsum' },
    { n: 'Generador de contraseñas',        i: '🔑', u: 'herramientas/generadores-de-texto/contrasenas' },
    { n: 'Generador de UUID',               i: '🆔', u: 'herramientas/generadores-de-texto/uuid' },
    { n: 'Generador de nombres aleatorios', i: '👤', u: 'herramientas/generadores-de-texto/nombres-aleatorios' },
    { n: 'Generador de hashtags',           i: '#️⃣', u: 'herramientas/generadores-de-texto/hashtags' },
    { n: 'Generador de firmas de email',    i: '✍️', u: 'herramientas/generadores-de-texto/firma-email' },
    { n: 'Generador de texto aleatorio',    i: '🎲', u: 'herramientas/generadores-de-texto/texto-aleatorio' },
    // SEO
    { n: 'Contador meta description',       i: '📏', u: 'herramientas/seo-tools-de-texto/meta-description' },
    { n: 'Contador meta title',             i: '🏷️', u: 'herramientas/seo-tools-de-texto/meta-title' },
    { n: 'Densidad de palabras clave',      i: '🎯', u: 'herramientas/seo-tools-de-texto/densidad-palabras' },
    { n: 'Generador de slug',               i: '🔗', u: 'herramientas/seo-tools-de-texto/generador-slug' },
    { n: 'Generador de meta tags',          i: '🏷️', u: 'herramientas/seo-tools-de-texto/meta-tags' },
    { n: 'Generador OpenGraph',             i: '📢', u: 'herramientas/seo-tools-de-texto/opengraph' },
    { n: 'Analizador de legibilidad',       i: '📖', u: 'herramientas/seo-tools-de-texto/legibilidad' },
    { n: 'Generador de robots.txt',         i: '🤖', u: 'herramientas/seo-tools-de-texto/robots-txt' },
    { n: 'Generador de snippets',           i: '🖼️', u: 'herramientas/seo-tools-de-texto/snippets' },
    // Estudiantes
    { n: 'Generador de citas APA',          i: '📚', u: 'herramientas/herramientas-para-estudiantes/citas-apa' },
    { n: 'Generador MLA',                   i: '📗', u: 'herramientas/herramientas-para-estudiantes/mla' },
    { n: 'Calculadora de notas',            i: '🎓', u: 'herramientas/herramientas-para-estudiantes/calculadora-notas' },
    { n: 'Calculadora GPA',                 i: '📊', u: 'herramientas/herramientas-para-estudiantes/gpa' },
    { n: 'Generador de bibliografía',       i: '📋', u: 'herramientas/herramientas-para-estudiantes/bibliografia' },
    // Desarrollo
    { n: 'Formateador JSON',                i: '{}',  u: 'herramientas/desarrollo-y-codificacion/formateador-json' },
    { n: 'Validador JSON',                  i: '✅', u: 'herramientas/desarrollo-y-codificacion/validador-json' },
    { n: 'Minificador JSON',                i: '📦', u: 'herramientas/desarrollo-y-codificacion/minificador-json' },
    { n: 'Codificador Base64',              i: '🔐', u: 'herramientas/desarrollo-y-codificacion/base64' },
    { n: 'Decodificador Base64',            i: '🔓', u: 'herramientas/desarrollo-y-codificacion/base64-decode' },
    { n: 'Codificador URL',                 i: '🌐', u: 'herramientas/desarrollo-y-codificacion/url-encode' },
    { n: 'Decodificador URL',               i: '🌍', u: 'herramientas/desarrollo-y-codificacion/url-decode' },
    { n: 'Generador de UUID',               i: '🆔', u: 'herramientas/desarrollo-y-codificacion/generador-uuid' },
    { n: 'Generador MD5',                   i: '#️⃣', u: 'herramientas/desarrollo-y-codificacion/hash-md5' },
    { n: 'Generador SHA256',                i: '🔒', u: 'herramientas/desarrollo-y-codificacion/sha256' },
    { n: 'Minificador HTML',                i: '🗜️', u: 'herramientas/desarrollo-y-codificacion/minificador-html' },
    { n: 'Minificador CSS',                 i: '🎨', u: 'herramientas/desarrollo-y-codificacion/minificador-css' },
    { n: 'Convertidor HEX',                 i: '🔢', u: 'herramientas/desarrollo-y-codificacion/hex' },
    { n: 'Formateador XML',                 i: '📄', u: 'herramientas/desarrollo-y-codificacion/formateador-xml' },
    // Redes sociales
    { n: 'Contador caracteres Twitter/X',   i: '🐦', u: 'herramientas/redes-sociales/twitter' },
    { n: 'Contador caracteres Instagram',   i: '📸', u: 'herramientas/redes-sociales/instagram' },
    { n: 'Contador caracteres LinkedIn',    i: '💼', u: 'herramientas/redes-sociales/linkedin' },
    { n: 'Contador caracteres TikTok',      i: '🎵', u: 'herramientas/redes-sociales/tiktok' },
    { n: 'Generador de hashtags Instagram', i: '#️⃣', u: 'herramientas/redes-sociales/hashtags-instagram' },
    { n: 'Generador bio Instagram',         i: '👤', u: 'herramientas/redes-sociales/bio-instagram' },
    { n: 'Generador bio LinkedIn',          i: '💼', u: 'herramientas/redes-sociales/bio-linkedin' },
    { n: 'Texto negrita para redes',        i: '𝐁',  u: 'herramientas/redes-sociales/texto-negrita' },
    // Utilidades
    { n: 'Cifrador César',                  i: '🔐', u: 'herramientas/utilidades-avanzadas/cifrado-cesar' },
    { n: 'Codificador ROT13',               i: '🔄', u: 'herramientas/utilidades-avanzadas/rot13' },
    { n: 'Detector de idioma',              i: '🌍', u: 'herramientas/utilidades-avanzadas/detector-idioma' },
    { n: 'Analizador de sentimiento',       i: '💭', u: 'herramientas/utilidades-avanzadas/sentimiento' },
    { n: 'Verificador de contraseñas',      i: '🛡️', u: 'herramientas/utilidades-avanzadas/verificar-contrasena' },
    { n: 'Selector aleatorio',              i: '🎰', u: 'herramientas/utilidades-avanzadas/selector-aleatorio' },
    { n: 'Generador de tokens',             i: '🔑', u: 'herramientas/utilidades-avanzadas/tokens' },
  ];


  /* ── Búsqueda ────────────────────────────────── */
  const searchInput       = document.getElementById('searchInput');
  const searchResults     = document.getElementById('searchResults');
  const searchResultsGrid = document.getElementById('searchResultsGrid');
  const searchResultsTitle= document.getElementById('searchResultsTitle');
  const mainContent       = document.getElementById('mainContent');

  let searchTimeout = null;

  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    const q = this.value.trim().toLowerCase();

    if (!q) {
      searchResults.classList.add('hidden');
      mainContent.style.display = '';
      return;
    }

    searchTimeout = setTimeout(function () {
      const results = TOOLS.filter(function (t) {
        return t.n.toLowerCase().includes(q);
      });

      mainContent.style.display = 'none';
      searchResults.classList.remove('hidden');

      if (results.length === 0) {
        searchResultsTitle.textContent = 'Sin resultados para "' + q + '"';
        searchResultsGrid.innerHTML = '<p class="search-no-result">Prueba con otro término de búsqueda.</p>';
        return;
      }

      searchResultsTitle.textContent =
        results.length + ' resultado' + (results.length !== 1 ? 's' : '') + ' para "' + q + '"';

      searchResultsGrid.innerHTML = results.map(function (t) {
        return '<a href="' + t.u + '" class="tool-card">' +
          '<span class="tool-card__icon" aria-hidden="true">' + t.i + '</span>' +
          '<span class="tool-card__name">' + t.n + '</span>' +
          '</a>';
      }).join('');
    }, 180);
  });

  // Tecla ESC cierra búsqueda
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      this.value = '';
      searchResults.classList.add('hidden');
      mainContent.style.display = '';
      this.blur();
    }
  });

});
