# BIG BANG WORKSHOPS — Web en GitHub Pages

Tienda estática completa con los **1,268 productos activos** exportados de tu Shopify (snapshot 4-jul-2026). HTML + Tailwind + JavaScript puro, sin build ni servidor.

## Estructura

```
website/
├── index.html        Home (hero, colecciones, destacados)
├── tienda.html       Catálogo completo: búsqueda, filtros, orden, paginación
├── producto.html     Detalle de producto (?h=handle) con tallas y cantidad
├── carrito.html      Carrito + checkout PayPal + pedido por WhatsApp
├── gracias.html      Confirmación post-pago
├── CNAME             Dominio personalizado (bigbangworkshops.com)
├── .nojekyll         Desactiva Jekyll en GitHub Pages
└── assets/
    ├── data/products.json   Catálogo (1.1 MB)
    └── js/
        ├── config.js        ⚙️ TUS CLAVES Y AJUSTES — edita esto primero
        └── app.js           Carrito, analytics, tarjetas de producto
```

## Dependencias (todas por CDN, $0)

| Dependencia | Para qué | Costo |
|---|---|---|
| Tailwind CSS (CDN) | Estilos | $0 |
| Google Fonts (Bebas Neue + Montserrat) | Tipografía de marca | $0 |
| PayPal JS SDK | Checkout | $0 fijo (comisión por venta) |
| Google Analytics 4 | Analytics | $0 |
| Microsoft Clarity | Heatmaps/grabaciones | $0 |
| Supabase (opcional) | Guardar órdenes + Storage | $0 (plan Free) |
| Resend (opcional) | Emails de orden/archivos digitales | $0 (3,000 emails/mes) |

No hay npm, no hay build. Editas el HTML y haces push.

## Paso a paso: publicar en GitHub Pages

1. Crea un repositorio en GitHub (ej. `bigbangworkshops`), público.
2. Sube TODO el contenido de esta carpeta `website/` a la raíz del repo.
3. En el repo: **Settings → Pages → Source: Deploy from a branch → main / (root)** → Save.
4. En 1–2 minutos tu sitio estará en `https://tuusuario.github.io/bigbangworkshops/`.

### Conectar bigbangworkshops.com

1. El archivo `CNAME` ya está incluido con tu dominio.
2. En tu registrador de dominio (donde compraste bigbangworkshops.com), configura DNS:
   - **CNAME**: `www` → `tuusuario.github.io`
   - **A** (apex/@): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. En GitHub **Settings → Pages → Custom domain**: escribe `bigbangworkshops.com` y activa **Enforce HTTPS**.
4. ⚠️ Quita el dominio de Shopify ANTES (Shopify admin → Settings → Domains → remove) para liberar el DNS.

### Configurar PayPal

1. Entra a https://developer.paypal.com → Apps & Credentials → **Live** → Create App.
2. Copia el **Client ID** y pégalo en `assets/js/config.js` → `paypalClientId`.
3. Listo: los botones aparecen solos en el carrito. Comisión PayPal Panamá ~5.4% + $0.30 por venta internacional.

### Configurar Analytics

- **GA4**: crea propiedad en analytics.google.com → copia el ID `G-XXXX` en `config.js`.
- **Clarity**: crea proyecto en clarity.microsoft.com → copia el ID en `config.js`.

### Supabase + Resend (opcional, fase 2)

Para registrar órdenes y enviar emails automáticos (ej. entregar Packs Digitales):

1. Crea proyecto gratis en supabase.com → copia URL y anon key a `config.js`.
2. Crea tabla `ordenes` (id, paypal_id, payer jsonb, items jsonb, total, created_at).
3. Crea una **Edge Function** `nueva-orden` que inserte la orden y llame a la API de Resend para enviar el email con los archivos (los archivos digitales van en **Supabase Storage**).
4. El carrito ya llama a `/functions/v1/nueva-orden` automáticamente si configuras las claves.

Sin esto, el sitio funciona igual: PayPal te notifica cada venta por email y tú entregas los packs digitales manualmente.

## 💰 Costos mensuales: Shopify vs GitHub Pages

### Hoy (Shopify Basic)

| Concepto | Mensual |
|---|---|
| Plan Shopify Basic | $39.00 |
| Comisión Shopify Payments no disponible en Panamá → pasarela externa + fee extra 2% | variable |
| Dominio (anual $15 ÷ 12) | $1.25 |
| **Total fijo** | **≈ $40.25/mes ($483/año)** |

### Nuevo stack (GitHub Pages)

| Concepto | Mensual |
|---|---|
| GitHub Pages (hosting + SSL) | $0.00 |
| Tailwind, fuentes, JS | $0.00 |
| PayPal | $0 fijo (solo % por venta) |
| Supabase Free (500 MB DB + 1 GB Storage) | $0.00 |
| Resend Free (3,000 emails/mes) | $0.00 |
| GA4 + Clarity | $0.00 |
| Dominio (anual $15 ÷ 12) | $1.25 |
| **Total fijo** | **≈ $1.25/mes ($15/año)** |

### 💥 Ahorro: ~$39/mes → **~$468/año**

### Lo que pierdes al salir de Shopify (para decidir con ojos abiertos)

- Panel de inventario/órdenes automático → ahora las órdenes llegan por PayPal y (opcional) Supabase.
- El catálogo ya no se sincroniza solo: para agregar/editar productos editas `products.json` (pídeme y te regenero el archivo o te hago un mini-admin).
- Checkout con tarjeta nativa, cálculo de impuestos, apps del ecosistema.
- **Las imágenes siguen alojadas en cdn.shopify.com**: funcionan mientras la tienda Shopify exista. Antes de cancelar Shopify hay que descargar las imágenes y subirlas al repo o a Supabase Storage (te puedo automatizar esto).

### Alternativa intermedia

Shopify **Starter ($5/mes)**: mantienes checkout/órdenes/inventario de Shopify con botones de compra dentro de esta misma web estática. Ahorro: $34/mes.

## Mantenimiento del catálogo

`products.json` es un snapshot. Cuando agregues productos en Shopify (o quieras precios nuevos), vuelve a pedirme: *"regenera products.json"* y lo actualizo desde tu tienda en segundos.
