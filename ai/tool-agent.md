# Tool Agent — HerramientasDeTexto.com

Guía permanente para crear las 300 herramientas de texto del proyecto.
Este documento es la fuente de verdad para cualquier IA o desarrollador que trabaje en el proyecto.

---

## 1. Descripción del proyecto

**HerramientasDeTexto.com** es una web de utilidades de texto en español.
Ofrece 300 herramientas online gratuitas, organizadas en 10 categorías.
Cada herramienta es una página HTML independiente, sin frameworks, sin backend, sin base de datos.
Todo el procesamiento ocurre en el navegador del usuario (100% client-side).

**Tecnología:** HTML5 + CSS3 + JavaScript vanilla  
**Idioma:** Español (es-ES)  
**Audiencia:** Redactores, SEOs, estudiantes, desarrolladores, profesores  

---

## 2. Objetivos

### SEO y tráfico
- Posicionar cada herramienta para su keyword principal (ej. "contador de palabras online gratis")
- Obtener tráfico orgánico de long-tail (ej. "contar sílabas en español")
- Velocidad de carga máxima: sin dependencias externas, CSS/JS mínimo
- Estructura semántica correcta: H1 único, meta description, canonical, schema.org

### Monetización
- Espacios reservados para Google AdSense (banners 728×90 y rectangles 300×250)
- Sin interrupciones en el flujo de la herramienta (los ads son periféricos)
- Posible afiliación futura a herramientas de escritura premium

### Escalabilidad
- Cada herramienta sigue el mismo template: copiar, adaptar lógica JS, publicar
- CSS y JS globales compartidos entre todas las herramientas
- Sin deuda técnica: código limpio, sin hacks, sin `!important` innecesarios

---

## 3. Estructura de carpetas y URLs

```
/
├── index.html                        ← Página de inicio (directorio de herramientas)
├── css/
│   ├── tools.css                     ← Estilos compartidos de todas las herramientas
│   └── legal.css                     ← Estilos de páginas legales
├── js/
│   └── tools.js                      ← Funciones JS compartidas (HT.paste, HT.copy, etc.)
├── legal/
│   ├── sobre-nosotros.html
│   ├── contacto.html
│   ├── cookies.html
│   ├── politica-de-privacidad.html
│   └── aviso-legal.html
├── tools/
│   ├── contadores-de-texto/
│   │   ├── contador-de-palabras.html
│   │   └── ...
│   ├── seo-tools-de-texto/
│   ├── generadores-de-texto/
│   ├── desarrollo-y-codificacion/
│   ├── redes-sociales/
│   └── ...
└── ai/
    └── tool-agent.md                 ← Este archivo
```

### Convención de URLs
- Siempre en minúsculas y con guiones: `contador-de-palabras.html`
- Sin tildes ni caracteres especiales en el nombre de archivo
- URL canónica: `https://herramientasdetexto.com/{categoria}/{slug}` (sin trailing slash)
- La carpeta de categoría tiene su propio `index.html` con listado de herramientas

### Categorías (10 en total)
1. `contadores-de-texto` — 30 herramientas
2. `seo-tools-de-texto` — 30 herramientas
3. `generadores-de-texto` — 30 herramientas
4. `desarrollo-y-codificacion` — 30 herramientas
5. `redes-sociales` — 30 herramientas
6. `formateadores-de-texto` — 30 herramientas
7. `convertidores-de-texto` — 30 herramientas
8. `analizadores-de-texto` — 30 herramientas
9. `herramientas-de-escritura` — 30 herramientas
10. `utilidades-de-texto` — 30 herramientas

---

## 4. Reglas de desarrollo

### HTML
- DOCTYPE HTML5, `lang="es"`, charset UTF-8
- Un único `<h1>` por página (en el hero)
- Usar etiquetas semánticas: `<header>`, `<main>`, `<aside>`, `<footer>`, `<nav>`
- Atributos `aria-label`, `aria-live="polite"`, `aria-hidden="true"` donde corresponda
- Labels visibles o `.sr-only` para todos los inputs
- IDs únicos y descriptivos: `ht-txt`, `s-palabras`, `hdr-chars`, etc.
- No usar tablas para layout
- No usar atributos `style=""` en línea salvo excepciones justificadas (ej. footer padding)

### CSS
- Todo el CSS global va en `/css/tools.css` — no crear `<style>` en cada herramienta
- Usar las clases del sistema: `ht-wrap`, `ht-hero`, `ht-tool-layout`, `ht-stat-card`, etc.
- No añadir CSS por herramienta salvo que sea estrictamente necesario y único
- Variables CSS globales definidas en `:root` dentro de `tools.css`
- Sin frameworks (no Bootstrap, no Tailwind)
- Sin `!important` salvo casos extremos documentados

### JavaScript
- Todo JS va dentro de un IIFE `(function(){ ... })()` al final del `<body>`
- Funciones compartidas (paste, copy) se invocan como `HT.paste()`, `HT.copy()`
- La función principal se llama siempre al arrancar: `analyze()` al final del IIFE
- Escuchar siempre el evento `input` sobre el textarea para actualizar en tiempo real
- `window.clearText` expuesto para el botón de limpiar
- Sin jQuery, sin lodash, sin dependencias externas
- Sin `console.log` en producción
- Sin `eval()`, sin `innerHTML` con contenido de usuario (prevenir XSS)

### Meta y SEO técnico
Cada herramienta incluye obligatoriamente:
```html
<title>{Nombre de herramienta} Online Gratis | HerramientasDeTexto.com</title>
<meta name="description" content="{Descripción de 140-160 caracteres con keyword principal}">
<link rel="canonical" href="https://herramientasdetexto.com/{categoria}/{slug}">
<meta property="og:title" content="{Nombre de herramienta} Online Gratis">
<meta property="og:description" content="{Descripción corta}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://herramientasdetexto.com/{categoria}/{slug}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="HerramientasDeTexto.com">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{Nombre de herramienta} Online Gratis">
<meta name="twitter:description" content="{Descripción corta}">
```

Schema.org obligatorio (WebApplication):
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "{Nombre}",
  "description": "{Descripción}",
  "url": "https://herramientasdetexto.com/{categoria}/{slug}",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "inLanguage": "es"
}
```

---

## 5. Reglas de diseño

### Principios
- **Minimalista:** cada elemento en pantalla tiene una razón de ser
- **Velocidad visual:** el usuario ve el resultado en menos de 1 segundo
- **Jerarquía clara:** H1 → herramienta → stats → contenido SEO
- **Sin distracciones:** la herramienta es el protagonista, no los ads

### Paleta de colores (definida en `tools.css`)
- Primario: `#2563EB` (azul)
- Acento: `#7C3AED` (violeta, para marks y highlights)
- Fondo: `#F8FAFC`
- Superficie: `#FFFFFF`
- Texto principal: `#0F172A`
- Texto secundario: `#64748B`
- Borde: `#E2E8F0`
- Danger: `#EF4444`

### Tipografía
- Fuente del sistema: `font-family: system-ui, -apple-system, sans-serif`
- Sin Google Fonts (evitar peticiones externas)
- H1: 2rem–2.4rem, weight 800
- Body: 1rem, line-height 1.6

### Componentes del sistema (no reinventar)
| Clase | Descripción |
|---|---|
| `ht-wrap` | Contenedor principal centrado (max-width 1100px) |
| `ht-hero` | Sección hero con H1, badge y pills |
| `ht-tool-layout` | Grid 2 columnas (textarea + panel stats) |
| `ht-textarea-card` | Card que contiene el textarea |
| `ht-stats-panel` | Panel lateral con estadísticas |
| `ht-stat-card` | Tarjeta individual de estadística |
| `ht-stat-card--primary` | Stat destacada (número principal) |
| `ht-toolbar` | Barra de botones bajo el textarea |
| `ht-btn` | Botón estándar |
| `ht-btn--danger` | Botón de limpiar (rojo) |
| `ht-ad-banner` | Placeholder de publicidad 728×90 |
| `ht-tip` | Bloque de consejo/tip |
| `ht-long` | Contenido SEO largo (H2s, párrafos, listas) |
| `ht-bc` | Breadcrumb |
| `ht-page-footer` | Footer con copyright y nav legal |

---

## 6. Reglas de UX

### Interacción
- El análisis ocurre en tiempo real con cada pulsación (`input` event), sin botón "Analizar"
- El panel de stats muestra siempre `0` como estado inicial (nunca vacío)
- El contador de caracteres en el header del textarea se actualiza en tiempo real
- El indicador "En vivo" (dot verde animado) refuerza que es tiempo real

### Botones
- **Pegar:** usa `HT.paste('ht-txt')` del JS global — accede al portapapeles
- **Copiar resultado:** (cuando aplique) usa `HT.copy(valor)` del JS global
- **Limpiar:** limpia el textarea y resetea todas las stats a 0
- Los botones tienen iconos SVG inline + texto — nunca solo icono sin label

### Accesibilidad
- El panel de stats tiene `aria-live="polite"` para lectores de pantalla
- El textarea tiene `<label>` visible o `.sr-only` asociado con `for`
- Los SVGs decorativos tienen `aria-hidden="true"`
- Los SVGs funcionales tienen `aria-label` o título

### Estados vacíos
- Con 0 caracteres, todos los números muestran `0`
- No mostrar mensajes de error — simplemente no computar si no hay texto

---

## 7. Reglas de SEO (contenido)

### Estructura de contenido en cada herramienta
1. **H1** — incluye la keyword principal + "online gratis"  
   Ejemplo: `Contador de palabras <mark>online gratis</mark>`
2. **Hero description** — 1-2 frases explicando qué hace la herramienta y para quién
3. **Hero pills** — 3 beneficios rápidos: "Tiempo real", "100% privado", "Sin registro"
4. **Bloque `.ht-tip`** — consejo práctico relacionado con la herramienta
5. **Bloque `.ht-long`** — contenido SEO de 300-500 palabras con:
   - H2: "¿Qué es un contador de X?"
   - H2: "¿Para qué sirve contar X?"
   - Lista de casos de uso con `<strong>` en las palabras clave
   - Opcional: H2 con preguntas frecuentes (FAQ markup)

### Keywords
- Keyword principal en: title, H1, meta description, primer párrafo del `.ht-long`
- Variaciones semánticas naturales a lo largo del texto
- No keyword stuffing — máximo 1 mención cada 100 palabras

### Meta description
- Entre 140 y 160 caracteres
- Incluir keyword principal + beneficio + CTA implícito
- Ejemplo: "Cuenta palabras en tu texto al instante. Obtén estadísticas completas de caracteres, frases y tiempo de lectura. Gratis, sin registro."

### Canonical
- Siempre apunta a la URL SIN trailing slash: `.../contador-de-palabras`

---

## 8. Reglas de monetización

### Espacios de publicidad
Cada herramienta incluye exactamente **2 espacios** reservados para ads:

1. **Banner horizontal 728×90** — justo antes del `<main>`, después del hero  
   Clase: `ht-ad-banner`  
   Markup: `<div class="ht-ad-banner" aria-hidden="true">Publicidad · 728×90</div>`

2. **Rectangle 300×250** — (opcional) dentro del panel de stats, al final, si hay espacio  
   Solo añadir si el panel tiene espacio sobrante visual

### Reglas de colocación
- **Nunca** entre el textarea y el panel de estadísticas
- **Nunca** dentro del flujo de interacción principal
- **Nunca** en el hero ni en el breadcrumb
- Los ads deben tener `aria-hidden="true"` para no interferir con lectores de pantalla
- En producción, el placeholder `ht-ad-banner` se reemplaza por el script de AdSense

---

## 9. Reglas de consistencia

### Header (igual en todas las herramientas)
```html
<header class="ht-site-header">
  <a href="/" class="ht-logo" aria-label="HerramientasDeTexto.com — Inicio">
    <div class="ht-logo-icon">Ht</div>
    <span class="ht-logo-text">HerramientasDeTexto<span>.com</span></span>
  </a>
  <div class="ht-header-sep"></div>
  <nav class="ht-header-nav" aria-label="Categorías principales">
    <a href="/tools/contadores-de-texto/" class="active">Contadores</a>
    <a href="/tools/seo-tools-de-texto/">SEO</a>
    <a href="/tools/generadores-de-texto/">Generadores</a>
    <a href="/tools/desarrollo-y-codificacion/">Dev</a>
    <a href="/tools/redes-sociales/">Redes</a>
  </nav>
  <div class="ht-header-right">
    <a href="/" class="ht-home-btn">
      <!-- SVG de casa -->
      Todas las herramientas
    </a>
  </div>
</header>
```
- El `class="active"` va en el enlace de la categoría actual
- El header NO cambia entre herramientas (salvo el `active`)

### Footer (igual en todas las herramientas)
```html
<footer class="ht-page-footer" style="max-width:1100px;margin:0 auto;padding-left:1.25rem;padding-right:1.25rem">
  <span class="ht-footer-copy">© 2026 HerramientasDeTexto.com</span>
  <nav class="ht-footer-nav" aria-label="Legal">
    <a href="/">Inicio</a>
    <a href="/legal/aviso-legal.html">Aviso legal</a>
    <a href="/legal/politica-de-privacidad.html">Privacidad</a>
    <a href="/legal/cookies.html">Cookies</a>
    <a href="/legal/contacto.html">Contacto</a>
  </nav>
</footer>
```

### Scripts al final del body (orden obligatorio)
```html
<script src="/js/tools.js"></script>
<script>
(function(){
  /* lógica específica de la herramienta */
})();
</script>
</body>
```

### Favicon (igual en todas)
```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%232563EB'/><text x='50%25' y='54%25' font-family='system-ui' font-size='14' font-weight='800' fill='white' text-anchor='middle' dominant-baseline='middle'>Ht</text></svg>">
```

---

## 10. Flujo de trabajo para crear una nueva herramienta

Sigue estos pasos en orden para cada herramienta nueva:

### Paso 1 — Definir la herramienta
- Nombre en español: "Contador de párrafos"
- Slug: `contador-de-parrafos`
- Categoría: `contadores-de-texto`
- Ruta del archivo: `tools/contadores-de-texto/contador-de-parrafos.html`
- URL canónica: `https://herramientasdetexto.com/contadores-de-texto/contador-de-parrafos`
- Keyword principal: "contador de párrafos online gratis"
- Estadísticas que mostrará: (listar las métricas del panel)

### Paso 2 — Copiar el template base
- Partir siempre del archivo más reciente y funcional de la misma categoría
- Nunca empezar desde cero
- Archivo de referencia actual: `tools/contadores-de-texto/contador-de-frases.html`

### Paso 3 — Adaptar metadatos
Modificar en orden:
1. `<title>` — nuevo nombre de herramienta
2. `<meta name="description">` — nueva descripción con keyword
3. `<link rel="canonical">` — nueva URL
4. Todas las etiquetas `og:` y `twitter:`
5. El JSON-LD de schema.org (name, description, url)

### Paso 4 — Adaptar el hero
1. El badge de categoría (solo si cambia de categoría)
2. El `<h1>` con el nombre de la herramienta y `<mark>`
3. La descripción del hero (`.ht-hero-desc`)
4. Las pills (pueden reutilizarse: "Tiempo real", "100% privado", "Sin registro")

### Paso 5 — Adaptar el breadcrumb
```html
<a href="/">Inicio</a> › 
<a href="/tools/contadores-de-texto/">Contadores de texto</a> › 
<span aria-current="page">Contador de párrafos</span>
```

### Paso 6 — Adaptar el panel de estadísticas
- Cambiar los IDs de cada `.ht-stat-card` (ej. `id="s-parrafos"`)
- Cambiar las etiquetas (`.ht-stat-label`) y sublabels (`.ht-stat-sublabel`)
- La primera card usa `ht-stat-card--primary` (la métrica principal)
- El placeholder del textarea debe describir la herramienta

### Paso 7 — Escribir la lógica JavaScript
Dentro del IIFE:
1. Obtener referencia al textarea: `var txt = document.getElementById('ht-txt')`
2. Escribir la función `analyze()` que:
   - Lee `txt.value`
   - Actualiza `hdr-chars` con la longitud del texto
   - Calcula cada métrica
   - Actualiza cada `id` del panel con `textContent`
3. Añadir listener: `txt.addEventListener('input', analyze)`
4. Escribir `clearText()` y exponerla: `window.clearText = clearText`
5. Llamar a `analyze()` al final para estado inicial

### Paso 8 — Escribir el contenido SEO
En el bloque `.ht-long`:
- H2: "¿Qué es un contador de {X}?"
- Párrafo explicativo con la keyword principal en las primeras 100 palabras
- H2: "¿Para qué sirve contar {X}?"
- Lista de 4-6 casos de uso con `<strong>` en los conceptos clave
- Mínimo 300 palabras en total

### Paso 9 — Escribir el bloque de tip
- Un consejo práctico y útil relacionado con la herramienta
- Incluir un dato concreto (número, porcentaje, referencia)

### Paso 10 — Verificar checklist final

**Metadatos**
- [ ] `<title>` tiene la keyword y el brand
- [ ] `<meta description>` tiene 140-160 caracteres
- [ ] `<link rel="canonical">` es correcto
- [ ] JSON-LD está completo y correcto

**Estructura**
- [ ] H1 único con `<mark>`
- [ ] Breadcrumb correcto
- [ ] `class="active"` en el nav del header apunta a la categoría correcta
- [ ] Footer con los 5 enlaces legales

**Herramienta**
- [ ] Textarea tiene placeholder descriptivo y `<label>`
- [ ] Panel de stats tiene al menos 3 métricas
- [ ] Los IDs del panel coinciden con los que actualiza el JS
- [ ] Botones Pegar y Limpiar funcionan
- [ ] El análisis responde en tiempo real (evento `input`)
- [ ] Con texto vacío todos los stats muestran `0`

**Código**
- [ ] JS dentro de IIFE
- [ ] Sin `console.log`
- [ ] Sin `innerHTML` con datos del usuario
- [ ] `<script src="/js/tools.js">` antes del script inline

**Contenido SEO**
- [ ] Bloque `.ht-long` con mínimo 300 palabras
- [ ] Keyword principal en H2 y primer párrafo
- [ ] Bloque `.ht-tip` con un consejo útil
- [ ] Banner de ad placeholder presente

---

## Referencia rápida — IDs del sistema

| ID | Descripción |
|---|---|
| `ht-txt` | Textarea principal |
| `hdr-chars` | Contador de caracteres en el header del textarea |
| `s-{metrica}` | Cualquier stat del panel (ej. `s-palabras`, `s-parrafos`) |

## Referencia rápida — Funciones globales (tools.js)

| Función | Descripción |
|---|---|
| `HT.paste(id)` | Pega portapapeles en el elemento con ese ID |
| `HT.copy(texto)` | Copia texto al portapapeles |
| `window.clearText` | Debe ser expuesta por cada herramienta para el botón Limpiar |

---

---

## 11. Regla permanente — Actualización de URLS.md y sitemap

**Cada vez que crees una herramienta nueva o una categoría nueva, debes actualizar `URLS.md` en el mismo commit.**

- Añade la URL de la herramienta en la sección correspondiente de `URLS.md` bajo el encabezado de su categoría.
- Si es una categoría nueva, añade primero su URL en la sección "Categorías" y crea el encabezado en "Herramientas por categoría".
- La URL en URLS.md debe coincidir exactamente con el `<link rel="canonical">` de la herramienta.

---

## 12. Regla permanente — Actualización del sitemap

**Cada vez que crees una herramienta nueva, debes actualizar `sitemap.xml` en el mismo commit.**

Añade el bloque siguiente al sitemap, justo antes del cierre `</urlset>`, sustituyendo `{categoria}` y `{slug}` por los valores reales y `{fecha}` por la fecha del día en formato `YYYY-MM-DD`:

```xml
<url>
  <loc>https://herramientasdetexto.com/{categoria}/{slug}</loc>
  <lastmod>{fecha}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

**Reglas:**
- Nunca crear el archivo HTML de una herramienta sin añadir su entrada al sitemap en el mismo commit.
- La URL del sitemap debe coincidir exactamente con el `<link rel="canonical">` de la herramienta.
- Sin trailing slash: `.../slug` (el .htaccess redirige 301 la versión con slash)
- Prioridad: `1.0` para index, `0.8` para herramientas, `0.5` para legales.

---

*Documento mantenido en `/ai/tool-agent.md`. Actualizar cuando cambien los estilos globales, el template base o las reglas del proyecto.*
