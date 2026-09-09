/* ============================================================
   BIG BANG WORKSHOPS — seasons.js
   SEASON-R1: una sola fuente de verdad para las campañas del año.
   El motor decide la temporada por fecha y la aplica al <html>.

   PARA CAMBIAR UNA CAMPAÑA: edita SOLO el objeto de abajo.
   `color` y `color2` son el acento de la temporada. El amarillo BBW de la marca
   (logotipo, botones, tabs, barra superior) NO se toca nunca desde aquí.
   No se toca el CSS, no se toca el HTML, no se duplican archivos.

   PARA PREVISUALIZAR: agrega ?preview=1 a la URL y sale un panel
   abajo a la izquierda con todas las temporadas del año.
   O directo: index.html?season=navidad
   El cliente nunca ve el panel: solo aparece con ?preview=1.
   ============================================================ */

window.BBW_SEASONS = [

  /* ---------------- FEBRERO · San Valentín ---------------- */
  {
    id:"sanvalentin", label:"San Valentín", from:"02-01", to:"02-15",
    color:"#FF4D6D", color2:"#FF8FA3", glow:"rgba(255,77,109,.32)",
    fx:["hearts"],
    ticker:["Regalos que sí se usan","Personaliza para dos","Entrega antes del 14","Envío gratis en Panamá Norte"],
    hero:{ kicker:"14 de febrero · Edición limitada",
           title:"HECHO<br>PARA<br><em>DOS.</em>",
           lede:"Diseños en pareja, personalizados y listos en 48 horas. Si lo piensas hoy, lo tienes puesto el sábado." },
    band:{ kicker:"San Valentín · 14.02", title:"NO REGALES", em:"CUALQUIER COSA",
           text:"Playeras en pareja, packs digitales y personalización con nombre. Producción propia: si lo pides a tiempo, llega a tiempo.",
           cta:"VER LA SELECCIÓN", href:"tienda.html" }
  },

  /* ---------------- FEBRERO–MARZO · Regreso a clases ---------------- */
  {
    id:"regreso", label:"Regreso a clases", from:"02-16", to:"03-15",
    color:"#FFC629", color2:"#FFC629", glow:"rgba(255,198,41,.30)",
    fx:[],
    ticker:["Colección niños · tallas 2 a 12","Uniformes y grupos","Precio por volumen","Hecho en Panamá"],
    hero:{ kicker:"Regreso a clases · Panamá",
           title:"EL AÑO<br>EMPIEZA<br><em>ESTRENANDO.</em>",
           lede:"Playeras de niño, pedidos por grupo y personalización para colegios. Descuento real por volumen, sin mínimos absurdos." },
    band:{ kicker:"Regreso a clases", title:"PEDIDOS", em:"POR GRUPO",
           text:"Salones, equipos y academias: cotiza por cantidad y produce en un solo lote. Mientras más piezas, menor el precio por unidad.",
           cta:"COTIZAR UN GRUPO", href:"tienda.html?tipo=Playera%20Ni%C3%B1o" }
  },

  /* ---------------- JUNIO · Día del Padre (3er domingo) ---------------- */
  {
    id:"padre", label:"Día del Padre", from:"06-01", to:"06-21",
    color:"#2F80ED", color2:"#56CCF2", glow:"rgba(47,128,237,.30)",
    fx:[],
    ticker:["Día del Padre · tercer domingo de junio","Cool Dad Club","Personaliza con su nombre","Entrega en 48 horas"],
    hero:{ kicker:"Día del Padre · Panamá",
           title:"PARA EL<br>QUE NUNCA<br><em>PIDE NADA.</em>",
           lede:"Playeras con su chiste, su equipo o su nombre. Producción propia en Panamá: pídelo el lunes, lo tienes el miércoles." },
    band:{ kicker:"Tercer domingo de junio", title:"COOL DAD", em:"CLUB",
           text:"El pack digital y la playera que ya se volvieron tradición. Personalízalo con su nombre y quedas bien un año más.",
           cta:"VER LA COLECCIÓN", href:"tienda.html?q=Dad" }
  },

  /* ---------------- OCTUBRE · Halloween ---------------- */
  {
    id:"halloween", label:"Halloween", from:"10-05", to:"11-01",
    color:"#FF7A18", color2:"#7B2FF7", glow:"rgba(255,122,24,.38)",
    fx:["fog","embers","bats","web","candle"],
    ticker:["Drop Halloween · 31.10","Edición limitada · no se repone","Noche de Taller","Packs digitales de temporada","Envío gratis en Panamá Norte"],
    hero:{ kicker:"Drop de Halloween · 31.10",
           title:"LA NOCHE<br>ES NUESTRO<br><em>TALLER.</em>",
           lede:"Edición limitada de Halloween: diseños exclusivos en DTF, packs digitales de temporada y la nueva línea de niños. Se imprime, se agota, no se repone." },
    band:{ kicker:"31 · 10 · 2026 · Edición limitada", title:"NOCHE DE", em:"TALLER",
           text:"Drop de Halloween: diseños exclusivos en DTF, packs digitales de temporada y línea de niños. Se imprime, se agota, no se repone.",
           cta:"VER EL DROP", href:"tienda.html?q=Halloween" }
  },

  /* ---------------- NOVIEMBRE · Mes de la Patria ---------------- */
  {
    id:"patria", label:"Mes de la Patria", from:"11-02", to:"11-20",
    color:"#D62828", color2:"#005293", glow:"rgba(214,40,40,.30)",
    fx:["confetti"],
    ticker:["3 · 4 · 5 · 10 · 28 de noviembre","Mes de la Patria","Diseños panameños","Hecho en Panamá, para Panamá"],
    hero:{ kicker:"Noviembre · Mes de la Patria",
           title:"HECHO<br>EN<br><em>PANAMÁ.</em>",
           lede:"Siempre lo fuimos. Este mes se nota más: diseños panameños impresos en nuestro propio taller, para desfiles, familia y equipo." },
    band:{ kicker:"3 · 4 · 5 · 10 · 28 de noviembre", title:"MES DE LA", em:"PATRIA",
           text:"Diseños panameños en DTF, pedidos por grupo para desfiles y delegaciones. Producción local, entrega local.",
           cta:"VER DISEÑOS", href:"tienda.html?q=Panam%C3%A1" }
  },

  /* ---------------- NOVIEMBRE · Black Friday ---------------- */
  {
    id:"blackfriday", label:"Black Friday", from:"11-21", to:"11-30",
    color:"#FFC629", color2:"#FFFFFF", glow:"rgba(255,255,255,.28)",
    fx:["embers"],
    ticker:["Black Friday · solo esta semana","Precios que no se repiten","Packs digitales desde $3","Envío gratis en Panamá Norte"],
    hero:{ kicker:"Black Friday · solo esta semana",
           title:"UNA<br>SEMANA.<br><em>NADA MÁS.</em>",
           lede:"Los precios bajan, el catálogo no. Mismos materiales, misma impresión DTF, misma producción propia — solo que esta semana cuesta menos." },
    band:{ kicker:"Black Friday", title:"SOLO ESTA", em:"SEMANA",
           text:"Descuentos reales en playeras, oversize y packs digitales. Cuando se acaba la semana, vuelven los precios de siempre.",
           cta:"VER OFERTAS", href:"tienda.html" }
  },

  /* ---------------- DICIEMBRE · Día de la Madre (8 dic, Panamá) ---------------- */
  {
    id:"madre", label:"Día de la Madre", from:"12-01", to:"12-09",
    color:"#FF6FA5", color2:"#FFB3CE", glow:"rgba(255,111,165,.30)",
    fx:["hearts"],
    ticker:["8 de diciembre · Día de la Madre","Personaliza con su nombre","Entrega antes del 8","Hecho en Panamá"],
    hero:{ kicker:"8 de diciembre · Día de la Madre",
           title:"ELLA SE<br>LO PONE<br><em>DE VERDAD.</em>",
           lede:"Nada de tazas que terminan en el fondo del gabinete. Playeras y diseños personalizados con su nombre, impresos aquí mismo." },
    band:{ kicker:"8 de diciembre", title:"DÍA DE LA", em:"MADRE",
           text:"Personalización con nombre, foto o frase. Pídelo antes del 5 de diciembre y lo tienes en la mano para el 8.",
           cta:"PERSONALIZAR", href:"tu-diseno-personalizado.html" }
  },

  /* ---------------- DICIEMBRE · Navidad ---------------- */
  {
    id:"navidad", label:"Navidad", from:"12-10", to:"12-31",
    color:"#FFC629", color2:"#E63946", glow:"rgba(230,57,70,.28)",
    fx:["snow","lights"],
    ticker:["Regalos que sí se usan","Última fecha de pedido: 20 de diciembre","Packs digitales · descarga inmediata","Envío gratis en Panamá Norte"],
    hero:{ kicker:"Navidad · Panamá",
           title:"REGALA<br>ALGO QUE<br><em>SE USE.</em>",
           lede:"Playeras, oversize y packs digitales listos para regalar. Última fecha de pedido para entrega antes del 24: 20 de diciembre." },
    band:{ kicker:"Última fecha de pedido: 20.12", title:"REGALOS DE", em:"TALLER",
           text:"Producción propia en Panamá: no dependemos de un envío internacional que no llega. Pídelo a tiempo y llega a tiempo.",
           cta:"VER REGALOS", href:"tienda.html" }
  },

  /* ---------------- RESTO DEL AÑO · marca permanente ---------------- */
  {
    id:"base", label:"Sin campaña", from:"01-01", to:"12-31",
    color:"#FFC629", color2:"#FFC629", glow:"rgba(255,198,41,.32)",
    fx:[],
    ticker:["Envío gratis en Panamá Norte","Impresión DTF premium","Packs digitales · descarga inmediata","Hecho en Panamá","Nueva colección niños"],
    hero:{ kicker:"Creative Workshop · Panamá",
           title:"DISEÑAMOS.<br>CREAMOS.<br>PRODUCIMOS.",
           lede:"Transformamos ideas en marcas, apparel, merchandise y experiencias creativas. Diseño estratégico y producción premium, de principio a fin." },
    band:null
  }
];

/* ============================================================
   MOTOR — de aquí para abajo no hace falta tocar nada
   ============================================================ */
(function () {
  const S = window.BBW_SEASONS;
  const root = document.documentElement;
  const qs = new URLSearchParams(location.search);
  const isPreview = qs.get("preview") === "1";

  function todayKey(d) {
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return m + "-" + day;
  }
  function pick() {
    const forced = qs.get("season");
    if (forced) { const f = S.find(s => s.id === forced); if (f) return f; }
    const k = todayKey(new Date());
    // el primero que calce manda: por eso "base" va al final
    return S.find(s => s.id !== "base" && k >= s.from && k <= s.to) || S.find(s => s.id === "base");
  }

  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ---------- constructores de efectos (MOTION-R1: CSS/SVG puro) ---------- */
  const FX = {
    fog: () => '<div class="fx-fog"><i></i><i></i><i></i></div>',
    embers: () => '<div class="fx-embers">' + Array.from({ length: 26 }, () =>
      `<i style="left:${rnd(0,100).toFixed(1)}%;--dx:${rnd(-8,8).toFixed(0)}vw;animation-duration:${rnd(9,20).toFixed(1)}s;animation-delay:-${rnd(0,14).toFixed(1)}s"></i>`).join("") + "</div>",
    snow: () => '<div class="fx-snow">' + Array.from({ length: 40 }, () => {
      const s = rnd(2, 5).toFixed(1);
      return `<i style="left:${rnd(0,100).toFixed(1)}%;width:${s}px;height:${s}px;--dx:${rnd(-6,6).toFixed(0)}vw;animation-duration:${rnd(8,18).toFixed(1)}s;animation-delay:-${rnd(0,16).toFixed(1)}s"></i>`;
    }).join("") + "</div>",
    hearts: () => '<div class="fx-hearts">' + Array.from({ length: 16 }, () =>
      `<i style="left:${rnd(0,100).toFixed(1)}%;--dx:${rnd(-6,6).toFixed(0)}vw;animation-duration:${rnd(11,22).toFixed(1)}s;animation-delay:-${rnd(0,18).toFixed(1)}s"></i>`).join("") + "</div>",
    confetti: () => {
      const cols = ["#D62828", "#FFFFFF", "#005293"]; // bandera de Panamá
      return '<div class="fx-confetti">' + Array.from({ length: 34 }, (_, i) =>
        `<i style="left:${rnd(0,100).toFixed(1)}%;background:${cols[i%3]};--dx:${rnd(-8,8).toFixed(0)}vw;animation-duration:${rnd(7,15).toFixed(1)}s;animation-delay:-${rnd(0,14).toFixed(1)}s"></i>`).join("") + "</div>";
    },
    bats: () => {
      const bat = '<svg viewBox="0 0 100 40"><g fill="#000">' +
        '<path class="wing wl" d="M50 20 C38 6 24 4 10 10 C20 12 24 18 22 26 C30 20 40 20 50 24 Z"/>' +
        '<path class="wing wr" d="M50 20 C62 6 76 4 90 10 C80 12 76 18 78 26 C70 20 60 20 50 24 Z"/>' +
        '<path d="M50 14 c4 0 6 4 6 8 c0 5-3 9-6 11 c-3-2-6-6-6-11 c0-4 2-8 6-8 Z"/>' +
        '<path d="M46 12 l-2-6 l5 4 Z M54 12 l2-6 l-5 4 Z"/></g></svg>';
      return [{ t: "6%", d: "22s", dl: "0s", w: "36px" },
              { t: "28%", d: "31s", dl: "-9s", w: "26px" },
              { t: "52%", d: "26s", dl: "-17s", w: "20px" }]
        .map(b => `<div class="fx-bat" style="top:${b.t};width:${b.w};animation-duration:${b.d};animation-delay:${b.dl}">${bat}</div>`).join("");
    }
  };

  // efectos que NO van dentro del hero
  const web = () => {
    const w = '<path d="M0 0 L150 60 M0 0 L120 120 M0 0 L60 150 M0 0 L150 20 M0 0 L20 150"/>' +
      '<path d="M30 6 Q22 22 6 30"/><path d="M58 13 Q42 42 13 58"/>' +
      '<path d="M88 20 Q64 64 20 88"/><path d="M118 27 Q86 86 27 118"/>';
    return `<svg class="fx-web l" viewBox="0 0 150 150" aria-hidden="true">${w}</svg>` +
           `<svg class="fx-web r" viewBox="0 0 150 150" aria-hidden="true">${w}</svg>`;
  };
  const lights = () => {
    let bulbs = "";
    for (let i = 0; i <= 24; i++) {
      const x = i * (100 / 24), y = 14 + Math.sin(i / 24 * Math.PI * 6) * 5;
      const c = ["#FFC629", "#E63946", "#E8E8E8", "#56CCF2"][i % 4];
      bulbs += `<circle cx="${x}%" cy="${y + 8}" r="3.2" fill="${c}" style="animation-delay:-${(i*0.21).toFixed(2)}s"/>`;
    }
    return '<div class="fx-lights"><svg preserveAspectRatio="none" viewBox="0 0 100 46">' +
      '<path d="M0 12 Q25 26 50 12 T100 12" vector-effect="non-scaling-stroke"/></svg>' +
      '<svg style="position:absolute;inset:0" preserveAspectRatio="none">' + bulbs + '</svg></div>';
  };

  /* ---------- aplicar ---------- */
  function apply(season) {
    root.dataset.season = season.id;
    // SEASON-R2: la temporada NUNCA toca --accent (el amarillo de marca).
    // Solo pinta su propio token, que vive en el hero, la banda y los efectos.
    root.style.setProperty("--season", season.color);
    root.style.setProperty("--season-2", season.color2);
    root.style.setProperty("--glow", season.glow);

    // ticker
    const tk = document.getElementById("bbwTicker");
    if (tk) {
      const m = season.ticker;
      tk.innerHTML = [...m, ...m, ...m, ...m].map(t => "<span>" + t + "</span>").join("");
    }

    // hero
    const k = document.getElementById("bbwHeroKicker");
    const t = document.getElementById("bbwHeroTitle");
    const l = document.getElementById("bbwHeroLede");
    if (k) k.textContent = season.hero.kicker;
    if (t) t.innerHTML = season.hero.title;
    if (l) l.textContent = season.hero.lede;

    // banda de campaña
    const band = document.getElementById("bbwCampaign");
    if (band) {
      if (!season.band) band.hidden = true;
      else {
        band.hidden = false;
        band.querySelector("[data-band-kicker]").textContent = season.band.kicker;
        band.querySelector("[data-band-title]").innerHTML =
          season.band.title + ' <em>' + season.band.em + '</em>';
        band.querySelector("[data-band-text]").textContent = season.band.text;
        const a = band.querySelector("[data-band-cta]");
        a.textContent = season.band.cta; a.href = season.band.href;
      }
    }

    // efectos
    const host = document.getElementById("bbwHeroFx");
    if (host) host.innerHTML = season.fx.filter(f => FX[f]).map(f => FX[f]()).join("");
    // la banda de campaña lleva su propia niebla, para que no se vea plana
    const bandFx = document.getElementById("bbwCampaignFx");
    if (bandFx) bandFx.innerHTML = season.fx.includes("fog") ? FX.fog() : "";
    document.querySelectorAll(".fx-web,.fx-candle,.fx-lights").forEach(n => n.remove());
    const hero = document.getElementById("bbwHero");
    if (hero && season.fx.includes("web")) hero.insertAdjacentHTML("beforeend", web());
    if (hero && season.fx.includes("lights")) hero.insertAdjacentHTML("beforeend", lights());
    if (season.fx.includes("candle")) document.body.insertAdjacentHTML("beforeend", '<div class="fx-candle"></div>');
  }

  /* ---------- panel de previsualización (?preview=1) ---------- */
  function previewPanel(active) {
    const p = document.createElement("div");
    p.className = "bbw-preview";
    p.innerHTML = "<b>Previsualizar temporada</b>" + S.map(s =>
      `<button data-s="${s.id}" aria-pressed="${s.id === active.id}">${s.label}</button>`).join("");
    p.addEventListener("click", e => {
      const b = e.target.closest("[data-s]"); if (!b) return;
      const s = S.find(x => x.id === b.dataset.s);
      apply(s);
      p.querySelectorAll("[data-s]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    });
    document.body.appendChild(p);
  }

  function boot() {
    const season = pick();
    apply(season);
    if (isPreview) previewPanel(season);
    window.bbwSeason = { current: () => root.dataset.season, apply, all: S };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
