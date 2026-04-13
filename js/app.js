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
    { n: 'Contador de palabras',            i: '🔢', u: '/contadores-de-texto/contador-de-palabras/' },
    { n: 'Contador de caracteres',          i: '🔤', u: '/contadores-de-texto/contador-de-caracteres/' },
    { n: 'Contador de frases',              i: '💬', u: '/contadores-de-texto/contador-de-frases/' },
    // Convertidores
    { n: 'Convertir a mayúsculas',          i: '🔠', u: '/convertidores-de-texto/convertir-a-mayusculas/' },
    { n: 'Convertir a minúsculas',          i: '🔡', u: '/convertidores-de-texto/convertir-a-minusculas/' },
    { n: 'Texto a camelCase',               i: '🐪', u: '/convertidores-de-texto/camelcase/' },
    { n: 'Texto a slug URL',                i: '🔗', u: '/convertidores-de-texto/texto-a-slug-url/' },
    // SEO
    { n: 'Generador de meta tags',          i: '🏷️', u: '/seo-tools-de-texto/generador-de-meta-tags/' },
    // Desarrollo
    { n: 'Formateador JSON',                i: '{}',  u: '/desarrollo-y-codificacion/formateador-json/' },
    { n: 'Codificador Base64',              i: '🔐', u: '/desarrollo-y-codificacion/base64/' },
    { n: 'Generador de UUID',               i: '🆔', u: '/desarrollo-y-codificacion/generador-uuid/' },
    { n: 'Generador MD5',                   i: '#️⃣', u: '/desarrollo-y-codificacion/hash-md5/' },
    // Redes sociales
    { n: 'Contador caracteres Twitter/X',   i: '🐦', u: '/redes-sociales/twitter/' },
    { n: 'Contador caracteres Instagram',   i: '📸', u: '/redes-sociales/instagram/' },
    { n: 'Generador de hashtags Instagram', i: '#️⃣', u: '/redes-sociales/generador-hashtags/' },
    { n: 'Generador bio Instagram',         i: '👤', u: '/redes-sociales/bio-instagram/' },
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
