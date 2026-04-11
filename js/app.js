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
    { n: 'Contador de palabras',           i: '🔢', u: 'herramientas/contadores/contador-de-palabras.html' },
    { n: 'Contador de caracteres',          i: '🔤', u: 'herramientas/contadores/contador-de-caracteres.html' },
    { n: 'Contador de frases',              i: '💬', u: 'herramientas/contadores/contador-de-frases.html' },
    { n: 'Contador de párrafos',            i: '📄', u: 'herramientas/contadores/contador-de-parrafos.html' },
    { n: 'Contador de líneas',              i: '↕️', u: 'herramientas/contadores/contador-de-lineas.html' },
    { n: 'Contador de emojis',              i: '😊', u: 'herramientas/contadores/contador-de-emojis.html' },
    { n: 'Contador de hashtags',            i: '#️⃣', u: 'herramientas/contadores/contador-de-hashtags.html' },
    { n: 'Contador de sílabas',             i: '🗣️', u: 'herramientas/contadores/contador-de-silabas.html' },
    { n: 'Contador de palabras únicas',     i: '✨', u: 'herramientas/contadores/palabras-unicas.html' },
    { n: 'Tiempo de lectura',               i: '⏱️', u: 'herramientas/contadores/tiempo-de-lectura.html' },
    { n: 'Tiempo de habla',                 i: '🎤', u: 'herramientas/contadores/tiempo-de-habla.html' },
    { n: 'Densidad de palabras',            i: '📊', u: 'herramientas/contadores/densidad-de-palabras.html' },
    { n: 'Analizador completo de texto',    i: '🔍', u: 'herramientas/contadores/analizador-completo.html' },
    // Convertidores
    { n: 'Convertir a mayúsculas',          i: '🔠', u: 'herramientas/convertidores/mayusculas.html' },
    { n: 'Convertir a minúsculas',          i: '🔡', u: 'herramientas/convertidores/minusculas.html' },
    { n: 'Convertir a formato título',      i: '🅰️', u: 'herramientas/convertidores/titulo.html' },
    { n: 'Convertir a formato oración',     i: '📝', u: 'herramientas/convertidores/oracion.html' },
    { n: 'Texto a camelCase',               i: '🐪', u: 'herramientas/convertidores/camelcase.html' },
    { n: 'Texto a snake_case',              i: '🐍', u: 'herramientas/convertidores/snake-case.html' },
    { n: 'Texto a kebab-case',              i: '🍢', u: 'herramientas/convertidores/kebab-case.html' },
    { n: 'Texto a PascalCase',              i: '🅿️', u: 'herramientas/convertidores/pascal-case.html' },
    { n: 'Texto a slug URL',                i: '🔗', u: 'herramientas/convertidores/slug.html' },
    { n: 'Texto a HTML',                    i: '🌐', u: 'herramientas/convertidores/texto-a-html.html' },
    { n: 'HTML a texto',                    i: '📃', u: 'herramientas/convertidores/html-a-texto.html' },
    { n: 'Texto a Markdown',                i: '⬇️', u: 'herramientas/convertidores/texto-a-markdown.html' },
    { n: 'Markdown a HTML',                 i: '🔀', u: 'herramientas/convertidores/markdown-a-html.html' },
    { n: 'Texto a binario',                 i: '01', u: 'herramientas/convertidores/binario.html' },
    { n: 'Binario a texto',                 i: '🔤', u: 'herramientas/convertidores/binario-a-texto.html' },
    { n: 'Texto a ASCII',                   i: '🔣', u: 'herramientas/convertidores/ascii.html' },
    { n: 'Texto a JSON',                    i: '{}',  u: 'herramientas/convertidores/texto-a-json.html' },
    { n: 'Texto a CSV',                     i: '📊', u: 'herramientas/convertidores/texto-a-csv.html' },
    { n: 'CSV a texto',                     i: '📋', u: 'herramientas/convertidores/csv-a-texto.html' },
    { n: 'Texto a código QR',               i: '▦',  u: 'herramientas/convertidores/qr.html' },
    // Limpiadores
    { n: 'Eliminar espacios extra',         i: '🧹', u: 'herramientas/limpiadores/eliminar-espacios.html' },
    { n: 'Eliminar líneas en blanco',       i: '🗑️', u: 'herramientas/limpiadores/eliminar-lineas-blanco.html' },
    { n: 'Eliminar líneas duplicadas',      i: '♻️', u: 'herramientas/limpiadores/eliminar-duplicados.html' },
    { n: 'Eliminar HTML',                   i: '🚫', u: 'herramientas/limpiadores/eliminar-html.html' },
    { n: 'Eliminar emojis',                 i: '🙅', u: 'herramientas/limpiadores/eliminar-emojis.html' },
    { n: 'Eliminar URLs',                   i: '🔇', u: 'herramientas/limpiadores/eliminar-urls.html' },
    { n: 'Eliminar acentos',                i: '´',  u: 'herramientas/limpiadores/eliminar-acentos.html' },
    { n: 'Eliminar signos de puntuación',   i: '.,', u: 'herramientas/limpiadores/eliminar-puntuacion.html' },
    { n: 'Eliminar números',                i: '🔢', u: 'herramientas/limpiadores/eliminar-numeros.html' },
    { n: 'Limpiar texto de Word',           i: '📎', u: 'herramientas/limpiadores/limpiar-word.html' },
    { n: 'Limpiar texto de PDF',            i: '📕', u: 'herramientas/limpiadores/limpiar-pdf.html' },
    { n: 'Limpiar texto para SEO',          i: '📈', u: 'herramientas/limpiadores/limpiar-seo.html' },
    { n: 'Normalizar espacios',             i: '⬜', u: 'herramientas/limpiadores/normalizar-espacios.html' },
    // Manipulación
    { n: 'Invertir texto',                  i: '↩️', u: 'herramientas/manipulacion/invertir-texto.html' },
    { n: 'Ordenar líneas alfabéticamente',  i: '🔤', u: 'herramientas/manipulacion/ordenar-lineas.html' },
    { n: 'Mezclar líneas aleatoriamente',   i: '🔀', u: 'herramientas/manipulacion/mezclar-lineas.html' },
    { n: 'Extraer emails',                  i: '📧', u: 'herramientas/manipulacion/extraer-emails.html' },
    { n: 'Extraer URLs',                    i: '🔗', u: 'herramientas/manipulacion/extraer-urls.html' },
    { n: 'Extraer números',                 i: '🔢', u: 'herramientas/manipulacion/extraer-numeros.html' },
    { n: 'Reemplazar texto',                i: '🔁', u: 'herramientas/manipulacion/reemplazar-texto.html' },
    { n: 'Repetir texto',                   i: '🔄', u: 'herramientas/manipulacion/repetir-texto.html' },
    // Generadores
    { n: 'Generador Lorem Ipsum',           i: '📝', u: 'herramientas/generadores/lorem-ipsum.html' },
    { n: 'Generador de contraseñas',        i: '🔑', u: 'herramientas/generadores/contrasenas.html' },
    { n: 'Generador de UUID',               i: '🆔', u: 'herramientas/generadores/uuid.html' },
    { n: 'Generador de nombres aleatorios', i: '👤', u: 'herramientas/generadores/nombres-aleatorios.html' },
    { n: 'Generador de hashtags',           i: '#️⃣', u: 'herramientas/generadores/hashtags.html' },
    { n: 'Generador de firmas de email',    i: '✍️', u: 'herramientas/generadores/firma-email.html' },
    { n: 'Generador de texto aleatorio',    i: '🎲', u: 'herramientas/generadores/texto-aleatorio.html' },
    // SEO
    { n: 'Contador meta description',       i: '📏', u: 'herramientas/seo/meta-description.html' },
    { n: 'Contador meta title',             i: '🏷️', u: 'herramientas/seo/meta-title.html' },
    { n: 'Densidad de palabras clave',      i: '🎯', u: 'herramientas/seo/densidad-palabras.html' },
    { n: 'Generador de slug',               i: '🔗', u: 'herramientas/seo/generador-slug.html' },
    { n: 'Generador de meta tags',          i: '🏷️', u: 'herramientas/seo/meta-tags.html' },
    { n: 'Generador OpenGraph',             i: '📢', u: 'herramientas/seo/opengraph.html' },
    { n: 'Analizador de legibilidad',       i: '📖', u: 'herramientas/seo/legibilidad.html' },
    { n: 'Generador de robots.txt',         i: '🤖', u: 'herramientas/seo/robots-txt.html' },
    { n: 'Generador de snippets',           i: '🖼️', u: 'herramientas/seo/snippets.html' },
    // Estudiantes
    { n: 'Generador de citas APA',          i: '📚', u: 'herramientas/estudiantes/citas-apa.html' },
    { n: 'Generador MLA',                   i: '📗', u: 'herramientas/estudiantes/mla.html' },
    { n: 'Calculadora de notas',            i: '🎓', u: 'herramientas/estudiantes/calculadora-notas.html' },
    { n: 'Calculadora GPA',                 i: '📊', u: 'herramientas/estudiantes/gpa.html' },
    { n: 'Generador de bibliografía',       i: '📋', u: 'herramientas/estudiantes/bibliografia.html' },
    // Desarrollo
    { n: 'Formateador JSON',                i: '{}',  u: 'herramientas/desarrollo/formateador-json.html' },
    { n: 'Validador JSON',                  i: '✅', u: 'herramientas/desarrollo/validador-json.html' },
    { n: 'Minificador JSON',                i: '📦', u: 'herramientas/desarrollo/minificador-json.html' },
    { n: 'Codificador Base64',              i: '🔐', u: 'herramientas/desarrollo/base64.html' },
    { n: 'Decodificador Base64',            i: '🔓', u: 'herramientas/desarrollo/base64-decode.html' },
    { n: 'Codificador URL',                 i: '🌐', u: 'herramientas/desarrollo/url-encode.html' },
    { n: 'Decodificador URL',               i: '🌍', u: 'herramientas/desarrollo/url-decode.html' },
    { n: 'Generador de UUID',               i: '🆔', u: 'herramientas/desarrollo/generador-uuid.html' },
    { n: 'Generador MD5',                   i: '#️⃣', u: 'herramientas/desarrollo/hash-md5.html' },
    { n: 'Generador SHA256',                i: '🔒', u: 'herramientas/desarrollo/sha256.html' },
    { n: 'Minificador HTML',                i: '🗜️', u: 'herramientas/desarrollo/minificador-html.html' },
    { n: 'Minificador CSS',                 i: '🎨', u: 'herramientas/desarrollo/minificador-css.html' },
    { n: 'Convertidor HEX',                 i: '🔢', u: 'herramientas/desarrollo/hex.html' },
    { n: 'Formateador XML',                 i: '📄', u: 'herramientas/desarrollo/formateador-xml.html' },
    // Redes sociales
    { n: 'Contador caracteres Twitter/X',   i: '🐦', u: 'herramientas/redes-sociales/twitter.html' },
    { n: 'Contador caracteres Instagram',   i: '📸', u: 'herramientas/redes-sociales/instagram.html' },
    { n: 'Contador caracteres LinkedIn',    i: '💼', u: 'herramientas/redes-sociales/linkedin.html' },
    { n: 'Contador caracteres TikTok',      i: '🎵', u: 'herramientas/redes-sociales/tiktok.html' },
    { n: 'Generador de hashtags Instagram', i: '#️⃣', u: 'herramientas/redes-sociales/hashtags-instagram.html' },
    { n: 'Generador bio Instagram',         i: '👤', u: 'herramientas/redes-sociales/bio-instagram.html' },
    { n: 'Generador bio LinkedIn',          i: '💼', u: 'herramientas/redes-sociales/bio-linkedin.html' },
    { n: 'Texto negrita para redes',        i: '𝐁',  u: 'herramientas/redes-sociales/texto-negrita.html' },
    // Utilidades
    { n: 'Cifrador César',                  i: '🔐', u: 'herramientas/utilidades/cifrado-cesar.html' },
    { n: 'Codificador ROT13',               i: '🔄', u: 'herramientas/utilidades/rot13.html' },
    { n: 'Detector de idioma',              i: '🌍', u: 'herramientas/utilidades/detector-idioma.html' },
    { n: 'Analizador de sentimiento',       i: '💭', u: 'herramientas/utilidades/sentimiento.html' },
    { n: 'Verificador de contraseñas',      i: '🛡️', u: 'herramientas/utilidades/verificar-contrasena.html' },
    { n: 'Selector aleatorio',              i: '🎰', u: 'herramientas/utilidades/selector-aleatorio.html' },
    { n: 'Generador de tokens',             i: '🔑', u: 'herramientas/utilidades/tokens.html' },
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
