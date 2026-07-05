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
    clear() { saveCart([]); },
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
    total() { const s = this.shipping(); return this.subtotal() + (s || 0); },
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
        <div class="mt-2 flex items-center justify-between">
          <span class="text-[#FFD400] font-bold">${bbwFmt(p.price)}</span>
          <span class="text-xs text-[#BFBFBF] uppercase tracking-wide">${bbwEsc(p.type)}</span>
        </div>
      </div>
    </a>`;
  };

  document.addEventListener("DOMContentLoaded", renderBadge);
})();
