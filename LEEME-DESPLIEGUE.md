# BBW — Tienda premium + temporadas por mes
### Paquete de producción · 9 de septiembre de 2026

Construido sobre lo que está **vivo en GitHub** (`main`), no sobre el clon local
—que está atrasado y no tiene la línea de niños.

---

## 1 · Qué copiar

Copia estos archivos dentro de `bigbangworkshops-changes/`, respetando las carpetas:

```
index.html                        ← REEMPLAZA
tienda.html                       ← REEMPLAZA (2 cambios mínimos)
producto.html                     ← REEMPLAZA (2 cambios mínimos)
assets/js/app.js                  ← REEMPLAZA
assets/css/bbw.css                ← NUEVO  (crear carpeta assets/css/)
assets/js/seasons.js              ← NUEVO
assets/brand/…                    ← NUEVO  (8 archivos, crear carpeta)
```

**No toco** `config.js`, `products.json`, `carrito.html`, `calculadora.html`,
`herramientas.html`, `terminos.html`, `admin.html` ni ninguna imagen de producto.

> ⚠️ Antes de copiar: tu clon local está **detrás de `origin`**. Bájalo primero
> (`git pull`) o copia estos archivos sobre una copia recién clonada. Si copias sobre
> el clon viejo y haces `git commit -a`, revertirías cosas que ya están publicadas.

---

## 2 · Cómo se cambian los temas del año

**Un solo archivo: `assets/js/seasons.js`.** Arriba está el arreglo `BBW_SEASONS`.
Cada temporada es un objeto:

```js
{
  id:"navidad", label:"Navidad", from:"12-10", to:"12-31",
  color:"#FFC629", color2:"#E63946", glow:"rgba(230,57,70,.28)",
  fx:["snow","lights"],
  ticker:[ … ],                    // la barra de arriba
  hero:{ kicker, title, lede },    // el titular grande
  band:{ kicker, title, em, text, cta, href }   // la banda de campaña; null = no sale
}
```

### ⚠️ Dos colores distintos, no confundir

- **`--accent` = `#FFC629`, el amarillo de la marca.** Ninguna temporada lo toca, nunca.
  Manda en el logotipo, los botones, el tab activo, la barra superior y el contador del carrito.
- **`color` / `color2` de la temporada** → escriben `--season` / `--season-2`, y viven **solo** en
  la palabra destacada del hero, la banda de campaña, los efectos y el brillo del tab activo.

Eso es SEASON-R2 en código: la campaña **añade un acento, no repinta la marca**. En Halloween,
"TALLER." va en naranja y el resto del sitio sigue siendo BBW.

El motor elige por fecha, **el primero que calce manda**, y `base` va siempre al final
como red de seguridad. No hay que tocar CSS ni HTML: `accent`, `accent2` y `glow`
son las tres únicas variables que la temporada sobreescribe, y todo el sitio las hereda.

### Calendario que dejé cargado (Panamá)

| Temporada | Rango | `color` | Efectos |
|---|---|---|---|
| San Valentín | 01–15 feb | `#FF4D6D` | corazones |
| Regreso a clases | 16 feb – 15 mar | amarillo BBW | — (solo copy) |
| Día del Padre | 01–21 jun | `#2F80ED` | — (solo copy) |
| Halloween | 05 oct – 01 nov | `#FF7A18` | niebla, brasas, murciélagos, telaraña, viñeta |
| Mes de la Patria | 02–20 nov | `#D62828` | confeti rojo/blanco/azul |
| Black Friday | 21–30 nov | amarillo BBW | chispas |
| Día de la Madre | 01–09 dic | `#FF6FA5` | corazones |
| Navidad | 10–31 dic | amarillo BBW | nieve, guirnalda de luces |
| Sin campaña | resto del año | amarillo BBW | — |

Fechas verificadas: Día de la Madre en Panamá es el **8 de diciembre** (feriado);
Día del Padre es el **tercer domingo de junio** (Ley 31 de 1949; en 2026 cae el 21).
Fiestas patrias: 3, 4, 5, 10 y 28 de noviembre.

### Efectos disponibles
`fog` · `embers` · `bats` · `web` · `candle` · `snow` · `lights` · `hearts` · `confetti`

Se combinan libremente en el arreglo `fx`. Una temporada puede llevar `fx:[]` y ser
solo cambio de copy y color — sigue siendo una campaña completa.

---

## 2 bis · El hero y sus fotos

**Altura:** 589 px en escritorio (era 802). Ahora la barra de tabs entra en pantalla
sin hacer scroll, que es lo que importa: el cliente ve el catálogo de una.
Se ajusta en `bbw.css` → `.bbw-hero-in { padding-block: 72px 58px }`.

**Las fotos NO son random.** Son producto real de tu catálogo, en escala de grises y
al 44% de opacidad debajo del degradado. Son textura, no vitrina: no llevan enlace y
no se hace clic en ellas. Se controlan desde `index.html`, arriba del todo:

```js
const HERO_MEDIA = { modo: "variado", cantidad: 6, manual: [] };
```

| modo | qué hace |
|---|---|
| `"variado"` | **por defecto** — la playera más nueva de cada familia |
| `"nuevos"` | las 6 más nuevas, salgan como salgan |
| `"manual"` | las que tú elijas: `manual: ["bts-arirang","jjk-sukuna"]` (handles) |

⚠️ Por qué existe `variado`: tus 6 productos más nuevos son **todos BTS**. En modo
`nuevos` el hero mostraba seis veces la misma camisa. Y no se puede agrupar por
`tags[0]`, porque en los productos nuevos ese tag es el *fit* ("Oversize",
"Regular Fit", "Fit de mujer"), no la franquicia — tres BTS con tres fits pasaban
como tres familias. El agrupador usa la **primera palabra del título**, que sí
identifica la familia (`BTS ARIRANG` → BTS, `JJK | Sukuna` → JJK).

---

## 3 · Cómo previsualizar sin esperar al mes

```
bigbangworkshops.com/index.html?season=navidad     ← fuerza una temporada
bigbangworkshops.com/index.html?preview=1          ← panel con las 9, abajo a la izquierda
```

El panel **solo aparece con `?preview=1`**. Un cliente que entre normal nunca lo ve.

---

## 4 · Qué cambió por dentro

**`assets/css/bbw.css` (nuevo, ~20 KB)** — el design system completo: header, hero,
tabs, tarjetas, rieles, pilares, footer y la biblioteca de efectos. No depende de
Tailwind: si el CDN falla, la tienda sigue viéndose.

**`assets/js/seasons.js` (nuevo, ~16 KB)** — calendario + motor. Todos los efectos son
CSS/SVG generados en el DOM: cero librerías, cero GIF, cero video. Se anima solo
`transform` y `opacity`; `prefers-reduced-motion` apaga el 100%.

**`index.html`** — reescrito. Tabs sticky sobre el catálogo real (`bbwProducts()`,
los 1,292 productos), riel de recién agregado, banda de campaña, y el bloque SEO
que la home **no tenía**: `canonical`, `og:image`, `twitter:card`, favicons y
schema `Organization`.

**`assets/js/app.js`** — tres cambios:
1. `bbwCard()` nueva (4:5, badge, barra de tallas, añadido rápido). Al vivir en `app.js`,
   la tarjeta nueva aparece sola en `index`, `tienda` y los relacionados de `producto`.
2. Añadido rápido delegado: click en una talla la manda al carrito sin abrir el producto.
3. `products.json?v=3` → `?v=5`, para romper la caché vieja del catálogo.

**`tienda.html` / `producto.html`** — solo dos cambios cada uno: cargar `bbw.css` y
cambiar el contenedor del grid a `class="bbw-grid"`, para que use la misma retícula
hairline que la home.

**`assets/brand/` (nuevo)** — favicons 16/32/48/180/192, `favicon.ico`, `bbw-logo.png`
(512, para el schema) y `bbw-og.png` (1200×630). Generados de los **dos logos aprobados**:
los favicons del escudo, el `og:image` del logotipo a color sobre `#111111` con la
retícula blueprint. Ningún logo fue recoloreado.

---

## 5 · Cosas que encontré de paso

1. **`assets/brand/` no existía.** `tienda.html` ya apuntaba a esos favicons y a ese
   `og:image` desde su bloque SEO: los 8 archivos daban **404**. La tienda se compartía
   en WhatsApp sin imagen y sin ícono. Resuelto con los archivos de este paquete.

2. **`index.html` no tenía SEO.** Sin `canonical`, sin `og:image`, sin favicon. Es la
   página más compartida del sitio. Resuelto.

3. **"Default Title" llegaba al carrito.** 1,049 productos traen `variants:["Default Title"]`.
   `producto.html` lo mandaba tal cual al carrito y al correo del pedido. Ahora se
   normaliza a "Única" dentro de `bbwCart.add()` — un solo punto, arregla todas las páginas.

4. **El orden "más nuevos" estaba roto.** Conviven IDs `bbw1788754279735` (epoch en ms)
   y `9503359762687` (heredado de Shopify). `Number("bbw…")` da `NaN`, así que el
   comparador devolvía `NaN` y el orden era arbitrario. `index.html` ahora usa un
   comparador que entiende los dos formatos. **`tienda.html` todavía usa el viejo** —
   lo dejé así a propósito para no cambiarte el orden del catálogo sin avisar. Dime y lo paso.

5. **El filtro "Hombre / Mujer / Niños" casi no sirve.** Solo 9 de 1,292 productos
   tienen el campo `gender`. El filtro existe pero devuelve casi nada. Se arregla
   cargando el campo en el admin, no en el frontend.

6. **Todo el sitio depende del CDN de Tailwind.** Si `cdn.tailwindcss.com` no carga,
   `tienda`, `producto` y `carrito` se caen visualmente. `bbw.css` es independiente,
   así que la home aguanta. Migrar el resto es un proyecto aparte.

---

## 6 · Verificado antes de entregar

Servido por HTTP con el `products.json` real (1,292 productos) y navegador real:

- Las 9 temporadas aplican acento, banda, efectos y titular correctos.
- Sin `?season`, hoy (9 sep) resuelve a `base`. Correcto.
- El panel de preview no aparece en visita normal.
- Añadido rápido: escribe bien en `localStorage`, sube el contador, no navega.
- Tallas reales de niño: `4T · 6T · XS BOY · S BOY · M BOY`.
- Packs digitales: "DESCARGAR AHORA", imagen sin recortar.
- `tienda.html`: 1,292 productos, filtro de niños devuelve 2, grid de 4 columnas.
- Móvil 390px: sin desbordamiento horizontal.
- Cero errores de JavaScript.

---

## 7 · Despliegue

`device_bash` no tiene credenciales de git, así que el push es tuyo:

```bash
cd bigbangworkshops-changes
git pull
# copiar los archivos de este paquete
git add index.html tienda.html producto.html assets/css assets/js assets/brand
git commit -m "feat(tienda): tabs de catálogo, tarjeta 4:5 y sistema de campañas por temporada"
git push
```

GitHub Pages tarda 1–2 minutos. Si ves la versión vieja, es caché del navegador:
`Ctrl+Shift+R`. Los `?v=` de este paquete ya fuerzan la recarga de CSS y JS.
