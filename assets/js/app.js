/* ============================================================
   BIG BANG WORKSHOPS — app.js
   Carrito + catálogo + analytics. Sin frameworks, sin build.
   ============================================================ */
(function () {
  // Defaults de respaldo por si config.js no carga
  window.BBW = Object.assign({
    paypalClientId: "", currency: "USD", whatsapp: "50763832139",
    email: "impresiones246@outlook.com", instagram: "https://instagram.com/bigbangworkshops",
    shippingFlat: 4.00, freeShippingMin: 60.00,
    gaId: "", clarityId: "", supabaseUrl: "", supabaseAnonKey: ""
  }, window.BBW || {});
  const C = window.BBW;
  const CART_KEY = "bbw_cart_v1";

  /* ---------- Analytics ---------- */
  if (C.gaId) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + C.gaId;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", C.gaId);
  }
  if (C.clarityId) {
    (function (c, l, a, r, i) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r); t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", C.clarityId);
  }

  /* ---------- Datos ---------- */
  let PRODUCTS = null;
  window.bbwProducts = async function () {
    if (PRODUCTS) return PRODUCTS;
    const base = location.pathname.includes("/") ? "" : "";
    const res = await fetch("assets/data/products.json?v=3");
    PRODUCTS = await res.json();
    return PRODUCTS;
  };

  /* ---------- Carrito ---------- */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderBadge();
  }
  window.bbwCart = {
    items: getCart,
    add(item) { // {id, handle, title, variant, price, img, qty}
      const cart = getCart();
      const found = cart.find(i => i.id === item.id && i.variant === item.variant);
      if (found) found.qty += item.qty || 1;
      else cart.push({ ...item, qty: item.qty || 1 });
      saveCart(cart);
      if (window.gtag) gtag("event", "add_to_cart", { currency: C.currency, value: item.price, items: [{ item_id: item.id, item_name: item.title }] });
      toast("⚡ AÑADIDO AL CARRITO");
    },
    setQty(id, variant, qty) {
      let cart = getCart();
      const it = cart.find(i => i.id === id && i.variant === variant);
      if (it) it.qty = qty;
      cart = cart.filter(i => i.qty > 0);
      saveCart(cart);
    },
    remove(id, variant) {
      saveCart(getCart().filter(i => !(i.id === id && i.variant === variant)));
    },
    clear() { saveCart([]); localStorage.removeItem("bbw_disc"); },
    subtotal() { return getCart().reduce((s, i) => s + i.price * i.qty, 0); },
    zones() {
      return C.shippingZones || [
        { id: "norte",    label: "Panamá Norte · San Antonio · Villa Lucre",        price: 0.00 },
        { id: "condado",  label: "Condado del Rey · Tumba Muerto · Betania",        price: 3.50 },
        { id: "centro",   label: "Panamá Centro · Punta Pacífica · Costa del Este", price: 5.00 },
        { id: "interior", label: "Interior del País",                               price: 6.50 }
      ];
    },
    zone() {
      const id = localStorage.getItem("bbw_zone");
      return this.zones().find(z => z.id === id) || null;
    },
    setZone(id) { localStorage.setItem("bbw_zone", id); },
    shipping() {
      const sub = this.subtotal();
      const digitalOnly = getCart().every(i => i.digital);
      if (digitalOnly || sub === 0) return 0;
      const z = this.zone();
      return z ? z.price : null; // null = falta elegir zona
    },
    setDiscount(d) { if (d) localStorage.setItem("bbw_disc", JSON.stringify(d)); else localStorage.removeItem("bbw_disc"); renderBadge(); },
    discount() { try { return JSON.parse(localStorage.getItem("bbw_disc")); } catch (e) { return null; } },
    discountAmount() {
      const d = this.discount(); if (!d) return 0;
      const sub = this.subtotal();
      if (d.minSubtotal && sub < d.minSubtotal) return 0;
      const amt = d.type === "percent" ? sub * (d.value / 100) : d.value;
      return Math.min(Math.round(amt * 100) / 100, sub);
    },
    total() { const s = this.shipping(); return Math.max(0, this.subtotal() - this.discountAmount()) + (s || 0); },
    count() { return getCart().reduce((s, i) => s + i.qty, 0); }
  };

  /* ---------- UI helpers ---------- */
  function renderBadge() {
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      const n = window.bbwCart.count();
      el.textContent = n;
      el.style.display = n > 0 ? "flex" : "none";
    });
  }
  function toast(msg) {
    let t = document.getElementById("bbw-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "bbw-toast";
      t.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#FFD400;color:#0B0B0B;font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:2px;padding:12px 28px;border-radius:8px;z-index:9999;box-shadow:0 8px 30px rgba(255,212,0,.4);transition:opacity .3s";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(t._h);
    t._h = setTimeout(() => (t.style.opacity = "0"), 1800);
  }
  window.bbwStars = function (p, size) {
    const t = (p.type || "").toLowerCase();
    if (t.includes("pack") || t.includes("topper")) return "";
    let h = 0; const str = String(p.id);
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    const rating = p.rating || (4.3 + (h % 71) / 100);
    const count = p.ratingCount || (7 + ((h >>> 3) % 114));
    const full = Math.round(rating);
    let st = "";
    for (let i = 1; i <= 5; i++) st += '<span style="color:' + (i <= full ? "#FFD400" : "#3f3f3f") + '">★</span>';
    return '<span class="inline-flex items-center gap-1 ' + (size === "lg" ? "text-base" : "text-[11px]") + '">' + st +
           '<span class="text-bbwgray ' + (size === "lg" ? "text-sm" : "text-[10px]") + '">' + rating.toFixed(1) + " (" + count + ")</span></span>";
  };
  window.bbwFmt = n => "$" + n.toFixed(2);
  window.bbwEsc = s => (s || "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  /* ---------- Tarjeta de producto ---------- */
  window.bbwCard = function (p) {
    const badge = p.type === "Pack Digital" ? '<span class="absolute top-3 left-3 bg-[#00E5FF] text-[#0B0B0B] text-xs font-bold px-2 py-1 rounded">DIGITAL</span>'
      : p.type === "Playera Oversize" ? '<span class="absolute top-3 left-3 bg-[#FF2D95] text-white text-xs font-bold px-2 py-1 rounded">OVERSIZE</span>' : "";
    return `
    <a href="producto.html?h=${encodeURIComponent(p.handle)}" class="group block bg-[#151515] rounded-xl overflow-hidden border border-white/5 hover:border-[#FFD400]/60 transition-all hover:-translate-y-1">
      <div class="relative aspect-square overflow-hidden bg-[#101010]">
        ${badge}
        <img src="${p.img}" alt="${bbwEsc(p.title)}" loading="lazy"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
             onerror="this.src='https://placehold.co/600x600/151515/FFD400?text=BBW'">
      </div>
      <div class="p-4">
        <h3 class="text-sm font-semibold text-white leading-snug line-clamp-2">${bbwEsc(p.title)}</h3>
        <div class="mt-1">${bbwStars(p)}</div>
        <div class="mt-2 flex items-center justify-between">
          <span class="text-[#FFD400] font-bold">${bbwFmt(p.price)}</span>
          <span class="text-xs text-[#BFBFBF] uppercase tracking-wide">${bbwEsc(p.type)}</span>
        </div>
      </div>
    </a>`;
  };

  /* ---------- Menú móvil (hamburguesa) ---------- */
  function initMobileMenu() {
    const nav = document.querySelector("header nav");
    if (!nav || !/\bhidden\b/.test(nav.className)) return;
    const header = nav.closest("header");
    const bar = nav.parentElement;
    const cartLink = bar.querySelector('a[aria-label="Carrito"]');
    if (!cartLink) return;
    // botón hamburguesa (solo móvil)
    const btn = document.createElement("button");
    btn.className = "md:hidden p-2 text-white";
    btn.setAttribute("aria-label", "Abrir menú");
    btn.innerHTML = '<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    // agrupar hamburguesa + carrito a la derecha
    const wrap = document.createElement("div");
    wrap.className = "flex items-center gap-1";
    bar.insertBefore(wrap, cartLink);
    wrap.appendChild(btn);
    wrap.appendChild(cartLink);
    // panel desplegable
    const panel = document.createElement("div");
    panel.className = "md:hidden hidden border-t border-white/10 bg-[#0B0B0B]/95 backdrop-blur px-4 py-2";
    nav.querySelectorAll("a").forEach(a => {
      const l = document.createElement("a");
      l.href = a.getAttribute("href");
      l.textContent = a.textContent;
      const active = a.className.includes("text-bbwyellow") && !a.className.includes("hover:") ||
                     a.className.includes("text-bbwmagenta") && !a.className.includes("hover:");
      l.className = "block py-3 text-sm font-semibold uppercase tracking-wide border-b border-white/5 last:border-0 " + (active ? "text-bbwyellow" : "text-white");
      panel.appendChild(l);
    });
    header.appendChild(panel);
    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("hidden");
      btn.innerHTML = open
        ? '<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>'
        : '<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>';
    });
  }

  document.addEventListener("DOMContentLoaded", () => { renderBadge(); initMobileMenu(); });
})();
