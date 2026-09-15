/* =========================================================================
   bbw-motor.js — el motor de precios de Big Bang Workshops, en un archivo.
   Generado el 15 sep 2026 desde precios.json + calculo.js. NO editar a mano:
   se regenera con  node construir.js  y se vuelve a copiar a los dos HTML.

   Lo cargan la calculadora del sitio y el cotizador del Master Console.
   Mientras los dos carguen ESTE archivo, no se pueden desalinear.

        <script src="bbw-motor.js"></script>

   Uso:   BBW.cot({ modo:'estandar', fit:'regular', impresion:'front30',
                    tallas:{ S:4, M:8, XXL:4 }, envio:3.50 })
   ========================================================================= */

window.BBW_PRECIOS = {
  "_meta": {
    "version": "2.0.0",
    "fecha": "2026-09-15",
    "descripcion": "Único lugar donde viven los números del precio de BBW. Ni Tyler ni ningún modelo calcula precios: los lee de aquí y los pasa por calculo.js.",
    "fuentes": {
      "motor_publico": "BBW_Cotizador.html (copia exacta de calculadora.html del sitio), leído 14 sep 2026",
      "motor_interno": "Supplier_Costs (doc 11) v1.6 · costos Create it DTF capturados 2 ago 2026",
      "validado_contra": "9 cotizaciones reales entregadas por Zid (ago-sep 2026)"
    },
    "regla": "Cambiar un número aquí cambia el precio en el cotizador, la calculadora pública y el asistente Tyler. No editar a mano sin correr validar.js.",
    "decisiones_de_zid_15_sep_2026": {
      "1_margen": "Bajar el margen en vez de subir el precio. Estándar: $1.50 regular / $5.00 oversize y hoodie. Con el costo honesto los precios quedan donde estaban (12 y 24 pzs bajan $0.06, 50 sube $0.17).",
      "2_yarda": "La yarda cuesta $11.76. Se elimina el $11.50 del código.",
      "3_envio": "El sitio NO debe sumar $3.50 fijo. Hay precios por zona y los elige el cliente. Faltan los montos por zona.",
      "4_recargo_talla": "Se aplica en las herramientas (antes se hacía a mano).",
      "5_vigencia": "15 días por defecto en la página.",
      "6_diseno": "Se regala solo si el cliente es recurrente O si el arte no necesita ajustes del diseñador. Si necesita ajustes, el monto lo define el diseñador DESPUÉS de revisar el arte: es variable, no una tarifa fija."
    }
  },
  "insumos": {
    "prenda": {
      "regular": {
        "costo": 4.5,
        "nota": "GILDAN Heavy Cotton 5000",
        "confirmado": true
      },
      "oversize": {
        "costo": 12.75,
        "confirmado": true
      },
      "hoodie": {
        "costo": 12.0,
        "confirmado": true
      },
      "_variantes_color": {
        "confirmado": false,
        "nota": "Beige/Sand sin costo confirmado; doc 11 §5 solo confirma $4.50 genérico"
      }
    },
    "mano_de_obra": {
      "costo": 2.0,
      "entra_al_precio_publico": false,
      "entra_al_precio_interno": true,
      "_conflicto": "El motor público NO suma mano de obra al precio (la usa solo para la lectura interna). El motor interno (doc 11) SÍ la suma al costo directo. Los dos motores definen 'costo' distinto."
    }
  },
  "hojas_dtf": {
    "_nota": "Precios Create it DTF capturados 2 ago 2026. El material se factura por HOJA, no por área.",
    "media_yarda": {
      "ancho": 63.5,
      "alto": 45.7,
      "precio": 7.48,
      "confirmado": true
    },
    "yarda": {
      "ancho": 58.5,
      "alto": 90.0,
      "precio": 11.76,
      "confirmado": true
    },
    "super_yarda": {
      "ancho": 114.0,
      "alto": 96.5,
      "precio": 21.39,
      "confirmado": false,
      "_pendiente": "doc 11 §2 la describe como 'polo poliamida blanca'. Confirmar con Create it si sirve para DTF textil normal antes de cotizar con ella."
    }
  },
  "yarda_area": {
    "_uso": "Solo para reproducir cotizaciones anteriores al 15 sep 2026 (modo 'legacy'). NO usar para cotizar.",
    "precio": 11.5,
    "area_util_cm2": 5265,
    "_historico": "El motor viejo repartía el material por área a $11.50 la yarda. Zid confirmó el 15 sep que la yarda cuesta $11.76 y que el material va por acomodo real de hoja."
  },
  "impresiones": {
    "front30": {
      "etiqueta": "Solo Frontal",
      "piezas": [
        [
          30,
          30
        ]
      ],
      "grupos_area": [
        900
      ]
    },
    "back": {
      "etiqueta": "Solo Trasera",
      "piezas": [
        [
          30,
          30
        ]
      ],
      "grupos_area": [
        900
      ]
    },
    "both30": {
      "etiqueta": "Trasera + Frontal",
      "piezas": [
        [
          30,
          30
        ],
        [
          30,
          30
        ]
      ],
      "grupos_area": [
        1800
      ]
    },
    "front": {
      "etiqueta": "Solo Logo",
      "piezas": [
        [
          10,
          10
        ]
      ],
      "grupos_area": [
        100
      ]
    },
    "both": {
      "etiqueta": "Trasera + Logo",
      "piezas": [
        [
          30,
          30
        ],
        [
          10,
          10
        ]
      ],
      "grupos_area": [
        900,
        100
      ]
    },
    "fullback": {
      "etiqueta": "Full Back",
      "piezas": [
        [
          35,
          45
        ]
      ],
      "grupos_area": [
        1575
      ]
    },
    "fullback_logo": {
      "etiqueta": "Full Back + Logo",
      "piezas": [
        [
          35,
          45
        ],
        [
          10,
          10
        ]
      ],
      "grupos_area": [
        1575,
        100
      ]
    },
    "_nota": {
      "piezas": "medidas reales en cm, para el acomodo por hoja",
      "grupos_area": "cm2 que el motor publico mete en cada Math.ceil por separado; replicarlo tal cual o los numeros no cuadran"
    }
  },
  "impresion_proporcional": {
    "_uso": "Estampado que crece con la talla. NO es el estándar: va por el motor interno.",
    "_estado": "sin ratificar en Governance (09) frente a Print 06 §4.2",
    "S": {
      "ancho": 30,
      "alto": 40,
      "confirmado": true
    },
    "M": {
      "ancho": 35,
      "alto": 44,
      "confirmado": true
    },
    "L": {
      "ancho": 38,
      "alto": 50,
      "confirmado": false,
      "_nota": "interpolado entre M y XL; confirmar antes de producir"
    },
    "XL": {
      "ancho": 42,
      "alto": 57,
      "confirmado": true
    },
    "XXL": {
      "ancho": 48,
      "alto": 65,
      "confirmado": true
    }
  },
  "margen": {
    "_nota": "Ganancia fija en dólares por pieza, no porcentaje. Es lo que queda DESPUÉS de prenda, material real y mano de obra.",
    "estandar": {
      "regular": 1.5,
      "oversize": 5.0,
      "hoodie": 5.0,
      "_decidido": "Zid, 15 sep 2026. El $5.00 anterior era ficticio: se calculaba sobre un costo de material subestimado. Con el costo real, $1.50 deja los precios donde estaban."
    },
    "proporcional_por_tramo": [
      {
        "min": 1,
        "max": 11,
        "regular": 6.0,
        "oversize": 9.0
      },
      {
        "min": 12,
        "max": 25,
        "regular": 5.0,
        "oversize": 8.0
      },
      {
        "min": 26,
        "max": 999999,
        "regular": 5.0,
        "oversize": 8.0,
        "confirmado": false,
        "_nota": "doc 11 §6.2 no documenta tramo sobre 25; asumido igual al 12-25"
      }
    ],
    "_pendiente": "Una camiseta estándar deja $1.50 y una de impresión proporcional deja $5.00-$6.00 por un trabajo parecido. El margen de la proporcional SÍ era real (se calculaba sobre acomodo de hoja), por eso no se tocó — pero la diferencia entre las dos líneas conviene revisarla.",
    "legacy_publico": {
      "regular": 5.0,
      "oversize": 8.0,
      "hoodie": 8.0,
      "_uso": "Margen del motor viejo. Era ficticio (se calculaba sobre material subestimado). Solo para reproducir cotizaciones anteriores al 15 sep 2026."
    }
  },
  "recargos_por_cantidad": {
    "_uso": "Solo motor público. No aparece explicado en ninguna cotización al cliente.",
    "tabla": [
      {
        "hasta": 2,
        "recargo": 2.0
      },
      {
        "hasta": 5,
        "recargo": 1.0
      }
    ]
  },
  "recargo_talla": {
    "monto": 2.0,
    "aplica_desde": "XXL",
    "_regla": "Zid, 6 sep 2026 (doc 11 v1.6): la XL NO lleva recargo. Antes del 6 sep se aplicaba desde XL.",
    "_explicacion_redistribucion": "En el motor público el recargo NO sube el total: mueve $2.00 desde las tallas base hacia las XXL manteniendo el total del pedido igual. Derivado de la cotización del 2 ago 2026 (25 pzs): unidad $13.64 -> $12.76 base / $14.76 XL+, total $341.00 en ambos casos.",
    "_doble_conteo": "doc 11 §5 dice que el +$2.00 ya incluye $1.00 de mano de obra. Si alguna vez se diferencia la mano de obra por talla, ese dólar se cuenta dos veces.",
    "modo": "suma",
    "aplicar_en_herramientas": true,
    "_decidido": "Zid, 15 sep 2026: se aplica en las herramientas. Modo SUMA, no redistribución: con el costo honesto una XXL cuesta más de verdad, y redistribuir haría que un pedido entero de XXL costara lo mismo que uno de S.",
    "_cambio": "Las cotizaciones de agosto redistribuían (total del pedido igual). Desde ahora el recargo SUBE el total: +$2.00 por cada pieza XXL o mayor."
  },
  "tope_producto_estandar": {
    "precio": 11.8,
    "cantidad_minima": 12,
    "aplica_a": {
      "fit": [
        "regular"
      ],
      "impresion": [
        "back",
        "front30"
      ]
    },
    "_regla": "PR-1: producto estándar de 12 piezas en adelante nunca pasa de $11.80."
  },
  "redondeo_cliente": {
    "modo": "arriba",
    "paso": 0.5,
    "_derivado_de": "Las 9 cotizaciones reales redondean el precio unitario al siguiente múltiplo de $0.50 sin excepción (16.24->16.50, 17.91->18.00, 26.26->26.50).",
    "aplica_a": [
      "proporcional"
    ],
    "_no_aplica_a_estandar": "El estándar sale exacto, como lo muestra el sitio hoy ($11.80). Si se redondeara hacia arriba, un precio de $11.76 saldría a $12.00 y rompería el tope PR-1."
  },
  "envio": {
    "modo": "por_zona",
    "lo_elige_el_cliente": true,
    "_decidido": "Zid, 15 sep 2026: el sitio NO puede sumar $3.50 fijo. El cliente elige su zona.",
    "zonas": [
      {
        "id": "retiro",
        "etiqueta": "Retiro en taller",
        "monto": 0.0
      }
    ],
    "_pendiente": "FALTAN LOS MONTOS POR ZONA. Están en Web System (doc 07). Hasta tenerlos, el selector solo ofrece retiro en taller y 'por confirmar'.",
    "permitir_por_confirmar": true
  },
  "abono": {
    "porcentaje": 50,
    "_nota": "50% para iniciar producción, saldo contra entrega."
  },
  "vigencia_dias": {
    "valor": 15,
    "_decidido": "Zid, 15 sep 2026: 15 días por defecto en la página. Se elimina la variante de 7 días."
  },
  "servicio_diseno": {
    "modo": "variable_tras_revision",
    "_decidido": "Zid, 15 sep 2026.",
    "se_regala_si": [
      "cliente_recurrente",
      "arte_no_necesita_ajustes"
    ],
    "_regla": "Si el cliente es recurrente O el arte no necesita ajustes del diseñador, el servicio es $0. En cualquier otro caso el monto lo pone el diseñador DESPUÉS de revisar el arte — no hay tarifa fija.",
    "monto_por_defecto": null,
    "_para_tyler": "Tyler NUNCA inventa este monto. Si el arte necesita ajustes, responde 'el diseño se cotiza después de revisar el archivo' y deja el campo vacío."
  },
  "descuento": {
    "modo": "porcentaje_sobre_subtotal_mas_diseno",
    "maximo_sugerido": null,
    "_pendiente": "No hay tope documentado. Ver la alerta de guardrail en calculo.js: sobre el tope de $11.80 un 20% deja la ganancia en cero."
  },
  "productos_sin_modelo": {
    "stickers_rascables": {
      "precio_unitario": 1.0,
      "referencia": "Cotizacion_Stickers_Rascables_BBW.html, 80 uds, 3x4 pulgadas, diseño incluido",
      "costo_documentado": false,
      "_pendiente": "No existe estructura de costo para esta línea. El precio de $1.00 no se puede verificar ni recalcular."
    }
  }
};

/* =========================================================================
   calculo.js — motor de precios de Big Bang Workshops
   -------------------------------------------------------------------------
   Funciones puras. No toca el DOM, no llama a internet, no usa ningún modelo
   de lenguaje. Corre igual en el navegador, en Node y detrás del asistente
   Tyler (puerto 7870).

   REGLA CENTRAL DEL SISTEMA: Tyler nunca calcula un precio. Le pasa los datos
   del pedido a este archivo, recibe un número, y solo lo redacta.

   Todos los números viven en precios.json. Aquí no hay ni una constante.
   ========================================================================= */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BBWCalculo = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function r2(n) { return Math.round(n * 100) / 100; }

  /* El sitio usa 'over' y el JSON usa 'oversize'. Que no importe cuál llegue. */
  var ALIAS_FIT = { over: 'oversize', oversize: 'oversize', hoodie: 'hoodie', regular: 'regular' };
  function fitOk(f) { return ALIAS_FIT[f] || 'regular'; }

  /* ---------------------------------------------------------------------
     1. ACOMODO REAL EN LA HOJA (gang)
     Cuántas piezas de ancho×alto caben en una hoja, probando las dos
     orientaciones. Reproduce exactamente los números del doc 11.
     --------------------------------------------------------------------- */
  function piezasPorHoja(ancho, alto, hojaAncho, hojaAlto) {
    var a = Math.floor(hojaAncho / ancho) * Math.floor(hojaAlto / alto);
    var b = Math.floor(hojaAncho / alto) * Math.floor(hojaAlto / ancho);
    return Math.max(a, b);
  }

  /* Plan de material más barato para N piezas iguales, combinando tipos de
     hoja. Programación dinámica sobre la cantidad de espacios a cubrir.
     Devuelve {costo, hojas:{tipo:cantidad}, porUnidad}. */
  function planMaterial(P, ancho, alto, cantidad, opts) {
    opts = opts || {};
    var hojas = [];
    Object.keys(P.hojas_dtf).forEach(function (k) {
      if (k.charAt(0) === '_') return;
      var h = P.hojas_dtf[k];
      if (h.confirmado === false && !opts.incluirNoConfirmadas) return;
      var n = piezasPorHoja(ancho, alto, h.ancho, h.alto);
      if (n > 0) hojas.push({ tipo: k, cabe: n, precio: h.precio });
    });
    if (!hojas.length) return { costo: null, hojas: {}, porUnidad: null, error: 'La pieza de ' + ancho + '×' + alto + ' cm no cabe en ninguna hoja disponible.' };
    if (cantidad <= 0) return { costo: 0, hojas: {}, porUnidad: 0 };

    var mejor = [{ costo: 0, usa: null, prev: -1 }];
    for (var i = 1; i <= cantidad; i++) {
      var best = null;
      for (var j = 0; j < hojas.length; j++) {
        var h = hojas[j];
        var prev = Math.max(0, i - h.cabe);
        var c = mejor[prev].costo + h.precio;
        if (best === null || c < best.costo - 1e-9) best = { costo: c, usa: h.tipo, prev: prev };
      }
      mejor[i] = best;
    }
    var conteo = {}, k = cantidad;
    while (k > 0) { var s = mejor[k]; conteo[s.usa] = (conteo[s.usa] || 0) + 1; k = s.prev; }
    return { costo: r2(mejor[cantidad].costo), hojas: conteo, porUnidad: r2(mejor[cantidad].costo / cantidad) };
  }

  /* Material real para una impresión completa (puede llevar varias piezas,
     p.ej. Full Back + Logo) sobre una cantidad de prendas. */
  function materialReal(P, impresionKey, cantidad, opts) {
    var imp = P.impresiones[impresionKey];
    if (!imp) throw new Error('Impresión desconocida: ' + impresionKey);
    var total = 0, detalle = [];
    imp.piezas.forEach(function (pz) {
      var plan = planMaterial(P, pz[0], pz[1], cantidad, opts);
      if (plan.costo === null) throw new Error(plan.error);
      total += plan.costo;
      detalle.push({ pieza: pz[0] + '×' + pz[1], hojas: plan.hojas, costo: plan.costo });
    });
    return { costo: r2(total), porUnidad: r2(total / cantidad), detalle: detalle };
  }

  /* ---------------------------------------------------------------------
     2. MOTOR PÚBLICO — réplica exacta de calculadora.html / BBW_Cotizador
     Reparte el material por ÁREA. Se conserva tal cual para que el
     asistente y el sitio den el mismo número.
     --------------------------------------------------------------------- */
  function yardasPorArea(P, impresionKey, q) {
    var YA = P.yarda_area.area_util_cm2;
    return P.impresiones[impresionKey].grupos_area.reduce(function (acc, cm2) {
      return acc + Math.ceil(q * cm2 / YA);
    }, 0);
  }

  function esEstandar(P, fit, impresionKey) {
    var t = P.tope_producto_estandar.aplica_a;
    return t.fit.indexOf(fit) >= 0 && t.impresion.indexOf(impresionKey) >= 0;
  }

  /* MOTOR VIEJO (hasta el 14 sep 2026). Solo para reproducir cotizaciones
     anteriores. Reparte el material por área y no cuenta la mano de obra. */
  function unitarioLegacy(P, q, fit, impresionKey) {
    if (q < 1) q = 1;
    fit = fitOk(fit);
    var prenda = P.insumos.prenda[fit].costo;
    var yardas = yardasPorArea(P, impresionKey, q);
    var transfer = yardas * P.yarda_area.precio / q;
    var margen = P.margen.legacy_publico[fit];
    var u = prenda + transfer + margen;

    var tabla = P.recargos_por_cantidad.tabla;
    for (var i = 0; i < tabla.length; i++) {
      if (q <= tabla[i].hasta) { u += tabla[i].recargo; break; }
    }

    var tope = P.tope_producto_estandar;
    if (esEstandar(P, fit, impresionKey) && q >= tope.cantidad_minima && u > tope.precio) u = tope.precio;

    return { unitario: r2(u), yardas: yardas, transfer: r2(transfer), prenda: prenda, margen: margen };
  }

  /* ---------------------------------------------------------------------
     MOTOR ESTÁNDAR (desde el 15 sep 2026)
     precio = prenda + material REAL de hoja + mano de obra + margen
     Decisión de Zid: se baja el margen en vez de subir el precio.
     --------------------------------------------------------------------- */
  function unitarioEstandar(P, q, fit, impresionKey) {
    if (q < 1) q = 1;
    fit = fitOk(fit);
    var prenda = P.insumos.prenda[fit].costo;
    var mat = materialReal(P, impresionKey, q);
    var labor = P.insumos.mano_de_obra.costo;
    var margen = P.margen.estandar[fit];
    var u = prenda + mat.porUnidad + labor + margen;

    var tabla = P.recargos_por_cantidad.tabla, recargoQ = 0;
    for (var i = 0; i < tabla.length; i++) {
      if (q <= tabla[i].hasta) { recargoQ = tabla[i].recargo; break; }
    }
    u += recargoQ;

    var tope = P.tope_producto_estandar, topeAplicado = false;
    if (esEstandar(P, fit, impresionKey) && q >= tope.cantidad_minima && u > tope.precio) {
      u = tope.precio; topeAplicado = true;
    }
    return {
      unitario: r2(u), prenda: prenda, transfer: mat.porUnidad, hojas: mat.detalle,
      manoDeObra: labor, margen: margen, recargoCantidad: recargoQ,
      topeAplicado: topeAplicado, costoDirecto: r2(prenda + mat.porUnidad + labor)
    };
  }

  /* Recargo de talla en modo SUMA: +$2.00 sobre cada pieza XXL o mayor.
     Con el costo honesto una talla grande cuesta más de verdad. */
  function sumarPorTalla(P, unitario, conteos) {
    var out = {};
    Object.keys(conteos).forEach(function (t) {
      if (!conteos[t]) return;
      out[t] = r2(unitario + (llevaRecargo(P, t) ? P.recargo_talla.monto : 0));
    });
    return out;
  }

  /* ---------------------------------------------------------------------
     SERVICIO DE DISEÑO — regla de Zid, 15 sep 2026.
     Gratis si el cliente es recurrente o si el arte no necesita ajustes.
     Si necesita ajustes, el monto lo pone el diseñador DESPUÉS de revisar:
     esta función devuelve null, nunca un número inventado.
     --------------------------------------------------------------------- */
  function servicioDiseno(P, ctx) {
    ctx = ctx || {};
    if (ctx.clienteTraeArte === false && ctx.monto == null && ctx.requiereAjustes == null) {
      return { monto: null, gratis: false, motivo: 'Falta saber si el arte necesita ajustes.' };
    }
    if (ctx.clienteRecurrente) return { monto: 0, gratis: true, motivo: 'Cliente recurrente.' };
    if (ctx.requiereAjustes === false) return { monto: 0, gratis: true, motivo: 'El arte no necesita ajustes.' };
    if (ctx.monto != null) return { monto: r2(ctx.monto), gratis: false, motivo: 'Monto puesto por el diseñador tras revisar el arte.' };
    return { monto: null, gratis: false, motivo: 'Se cotiza después de que el diseñador revise el archivo.' };
  }

  /* Recargo de talla en modo REDISTRIBUCIÓN: mueve dinero de las tallas base
     a las grandes sin cambiar el total del pedido. Es lo que hace la
     cotización del 2 ago 2026. */
  var ORDEN_TALLAS = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

  function llevaRecargo(P, talla) {
    var desde = ORDEN_TALLAS.indexOf(P.recargo_talla.aplica_desde);
    var aqui = ORDEN_TALLAS.indexOf(talla);
    return desde >= 0 && aqui >= desde;
  }

  function redistribuirPorTalla(P, unitario, conteos) {
    var monto = P.recargo_talla.monto, qTot = 0, qGrande = 0;
    Object.keys(conteos).forEach(function (t) {
      qTot += conteos[t];
      if (llevaRecargo(P, t)) qGrande += conteos[t];
    });
    if (!qTot) return {};
    var base = qGrande ? (unitario * qTot - monto * qGrande) / qTot : unitario;
    var out = {};
    Object.keys(conteos).forEach(function (t) {
      if (!conteos[t]) return;
      out[t] = r2(llevaRecargo(P, t) ? base + monto : base);
    });
    return out;
  }

  /* ---------------------------------------------------------------------
     3. MOTOR INTERNO — doc 11. Impresión no estándar (proporcional a la
     talla). Suma mano de obra al costo y el recargo de talla SÍ sube el
     precio.
     --------------------------------------------------------------------- */
  function margenPorTramo(P, qTotal, fit) {
    var tramos = P.margen.proporcional_por_tramo;
    for (var i = 0; i < tramos.length; i++) {
      if (qTotal >= tramos[i].min && qTotal <= tramos[i].max) return tramos[i][fit];
    }
    return tramos[tramos.length - 1][fit];
  }

  function precioProporcional(P, items, opts) {
    opts = opts || {};
    var fit = fitOk(opts.fit || 'regular');
    var qTotal = items.reduce(function (a, i) { return a + i.cantidad; }, 0);
    var margen = margenPorTramo(P, qTotal, fit);
    var prenda = P.insumos.prenda[fit].costo;
    var labor = P.insumos.mano_de_obra.costo;
    var lineas = [], costoTotal = 0, subtotal = 0, avisos = [];

    items.forEach(function (it) {
      var med = P.impresion_proporcional[it.talla];
      if (!med) throw new Error('No hay medida de impresión para la talla ' + it.talla);
      if (med.confirmado === false) avisos.push('La medida de impresión de la talla ' + it.talla + ' (' + med.ancho + '×' + med.alto + ' cm) no está confirmada.');
      var plan = planMaterial(P, med.ancho, med.alto, it.cantidad, opts);
      if (plan.costo === null) throw new Error(plan.error);
      var recargo = llevaRecargo(P, it.talla) ? P.recargo_talla.monto : 0;
      var costoDir = r2(plan.porUnidad + prenda + labor + recargo);
      var precio = r2(costoDir + margen);
      lineas.push({
        talla: it.talla, cantidad: it.cantidad,
        impresion: med.ancho + '×' + med.alto + ' cm',
        hojas: plan.hojas, transferUnit: plan.porUnidad,
        prenda: prenda, manoDeObra: labor, recargoTalla: recargo,
        costoDirecto: costoDir, margen: margen,
        precio: precio, precioCliente: redondearCliente(P, precio),
        subtotal: r2(precio * it.cantidad)
      });
      costoTotal += costoDir * it.cantidad;
      subtotal += precio * it.cantidad;
    });

    return {
      motor: 'interno', tramo: qTotal, margenUnitario: margen,
      lineas: lineas, costoDirecto: r2(costoTotal),
      subtotal: r2(subtotal), ganancia: r2(subtotal - costoTotal), avisos: avisos
    };
  }

  /* ---------------------------------------------------------------------
     4. Redondeo al cliente
     --------------------------------------------------------------------- */
  function redondearCliente(P, n) {
    var paso = P.redondeo_cliente.paso;
    var f = P.redondeo_cliente.modo === 'arriba' ? Math.ceil : Math.round;
    return r2(f(n / paso - 1e-9) * paso);
  }

  /* ---------------------------------------------------------------------
     5. COTIZAR — entrada única. Esto es lo que llama Tyler.
     --------------------------------------------------------------------- */
  function cotizar(P, pedido) {
    var conteos = pedido.tallas || {};
    var q = Object.keys(conteos).reduce(function (a, t) { return a + (conteos[t] || 0); }, 0);
    if (!q) throw new Error('El pedido no tiene piezas.');

    var res;
    if (pedido.modo === 'proporcional') {
      var items = Object.keys(conteos).filter(function (t) { return conteos[t] > 0; })
        .map(function (t) { return { talla: t, cantidad: conteos[t] }; });
      res = precioProporcional(P, items, { fit: pedido.fit || 'regular' });
    } else if (pedido.modo === 'legacy') {
      var fitL = pedido.fit || 'regular', impL = pedido.impresion || 'front30';
      var uL = unitarioLegacy(P, q, fitL, impL);
      var porTallaL = redistribuirPorTalla(P, uL.unitario, conteos);
      var lineasL = Object.keys(porTallaL).map(function (t) {
        return { talla: t, cantidad: conteos[t], precio: porTallaL[t], subtotal: r2(porTallaL[t] * conteos[t]) };
      });
      res = {
        motor: 'legacy', impresion: impL, fit: fitL,
        unitario: uL.unitario, yardasPorArea: uL.yardas, transferPorArea: uL.transfer,
        lineas: lineasL, subtotal: r2(uL.unitario * q),
        avisos: ['Modo legacy: reparte el material por área y no cuenta la mano de obra. Solo para reproducir cotizaciones anteriores al 15 sep 2026.']
      };
    } else {
      var fit = pedido.fit || 'regular';
      var imp = pedido.impresion || 'front30';
      var u = unitarioEstandar(P, q, fit, imp);
      var porTalla = sumarPorTalla(P, u.unitario, conteos);
      var lineas = Object.keys(porTalla).map(function (t) {
        return {
          talla: t, cantidad: conteos[t], precio: porTalla[t],
          precioCliente: porTalla[t],   /* el estándar no se redondea: rompería el tope PR-1 */
          recargoTalla: llevaRecargo(P, t) ? P.recargo_talla.monto : 0,
          subtotal: r2(porTalla[t] * conteos[t])
        };
      });
      res = {
        motor: 'estandar', impresion: imp, fit: fit,
        unitario: u.unitario, transfer: u.transfer, hojas: u.hojas,
        costoDirecto: u.costoDirecto, margen: u.margen,
        recargoCantidad: u.recargoCantidad, topeAplicado: u.topeAplicado,
        lineas: lineas,
        subtotal: r2(lineas.reduce(function (a, l) { return a + l.subtotal; }, 0)),
        avisos: []
      };
    }

    var dis = servicioDiseno(P, pedido.diseno || {});
    var diseno = dis.monto || 0;
    var base = res.subtotal + diseno;
    var pct = pedido.descuentoPct || 0;
    var descuento = r2(base * pct / 100);
    var envio = pedido.envio != null ? pedido.envio : 0;
    var total = r2(base - descuento + envio);
    var abonoPct = pedido.abonoPct != null ? pedido.abonoPct : P.abono.porcentaje;

    return {
      piezas: q, detalle: res,
      subtotal: res.subtotal, diseno: dis,
      descuentoPct: pct, descuento: descuento,
      envio: r2(envio), total: total,
      abonoPct: abonoPct, abono: r2(total * abonoPct / 100),
      vigenciaDias: P.vigencia_dias.valor,
      auditoria: auditar(P, pedido, res, descuento),
      avisos: res.avisos
    };
  }

  /* ---------------------------------------------------------------------
     6. AUDITORÍA — la lectura que NO sale al cliente.
     Recalcula el costo con el acomodo real de la hoja y avisa si el precio
     que se va a cobrar no cubre lo que cuesta producirlo.
     --------------------------------------------------------------------- */
  function auditar(P, pedido, res, descuento) {
    var alertas = [];
    var q = res.lineas.reduce(function (a, l) { return a + l.cantidad; }, 0);
    var labor = P.insumos.mano_de_obra.costo;
    var out = { piezas: q, manoDeObra: labor };

    if (res.motor === 'legacy') {
      var prenda = P.insumos.prenda[res.fit].costo;
      var real;
      try { real = materialReal(P, res.impresion, q); }
      catch (e) { alertas.push('No se pudo calcular el acomodo real: ' + e.message); real = null; }

      if (real) {
        var costoRealUnit = r2(prenda + real.porUnidad + labor);
        var cobrado = r2(res.subtotal - descuento) / q;
        out.transferPorArea = res.transferPorArea;
        out.transferReal = real.porUnidad;
        out.hojasReales = real.detalle;
        out.costoRealUnitario = costoRealUnit;
        out.gananciaRealUnitaria = r2(cobrado - costoRealUnit);
        out.gananciaRealPedido = r2((cobrado - costoRealUnit) * q);

        var brecha = r2(real.porUnidad - res.transferPorArea);
        if (brecha > 0.01) {
          alertas.push('El motor público reparte el material por área y cobra $' + res.transferPorArea.toFixed(2) +
            ' de transfer por pieza, pero el acomodo real en la hoja cuesta $' + real.porUnidad.toFixed(2) +
            '. Faltan $' + brecha.toFixed(2) + ' por pieza ($' + r2(brecha * q).toFixed(2) + ' en este pedido).');
        }
        if (out.gananciaRealUnitaria < 0) {
          alertas.push('PIERDE DINERO: cobrando $' + cobrado.toFixed(2) + ' por pieza y costando $' +
            costoRealUnit.toFixed(2) + ', este pedido deja $' + out.gananciaRealUnitaria.toFixed(2) + ' por pieza.');
        } else if (out.gananciaRealUnitaria < 1) {
          alertas.push('Margen al filo: quedan $' + out.gananciaRealUnitaria.toFixed(2) + ' por pieza después de material, prenda y mano de obra.');
        }

        // ¿cuánto descuento aguanta antes de perder dinero?
        var precioLista = res.subtotal / q;
        var maxPct = precioLista > 0 ? Math.max(0, (1 - costoRealUnit / precioLista) * 100) : 0;
        out.descuentoMaximoPct = Math.floor(maxPct * 10) / 10;
        if ((pedido.descuentoPct || 0) > out.descuentoMaximoPct) {
          alertas.push('El descuento de ' + pedido.descuentoPct + '% pasa del máximo que aguanta este pedido (' +
            out.descuentoMaximoPct.toFixed(1) + '%) antes de dejar de cubrir costos.');
        }
      }
    } else if (res.motor === 'estandar') {
      var cobradoE = r2((res.subtotal - descuento) / q);
      out.costoRealUnitario = res.costoDirecto;
      out.gananciaRealUnitaria = r2(cobradoE - res.costoDirecto);
      out.gananciaRealPedido = r2((cobradoE - res.costoDirecto) * q);
      var listaE = res.subtotal / q;
      out.descuentoMaximoPct = Math.floor(Math.max(0, (1 - res.costoDirecto / listaE) * 100) * 10) / 10;
      if (out.gananciaRealUnitaria < 0) alertas.push('PIERDE DINERO: quedan ' + out.gananciaRealUnitaria.toFixed(2) + ' por pieza.');
      if ((pedido.descuentoPct || 0) > out.descuentoMaximoPct) {
        alertas.push('El descuento de ' + pedido.descuentoPct + '% pasa del máximo que aguanta este pedido (' + out.descuentoMaximoPct.toFixed(1) + '%).');
      }
    } else {
      out.costoDirecto = res.costoDirecto;
      out.ganancia = r2(res.ganancia - descuento);
      if (out.ganancia < 0) alertas.push('PIERDE DINERO: el descuento deja la ganancia del pedido en $' + out.ganancia.toFixed(2) + '.');
      var maxI = res.subtotal > 0 ? (res.ganancia / res.subtotal) * 100 : 0;
      out.descuentoMaximoPct = Math.floor(maxI * 10) / 10;
      if ((pedido.descuentoPct || 0) > out.descuentoMaximoPct) {
        alertas.push('El descuento de ' + pedido.descuentoPct + '% pasa del máximo que aguanta este pedido (' + out.descuentoMaximoPct.toFixed(1) + '%).');
      }
    }

    out.alertas = alertas;
    return out;
  }

  return {
    fitOk: fitOk,
    piezasPorHoja: piezasPorHoja,
    planMaterial: planMaterial,
    materialReal: materialReal,
    yardasPorArea: yardasPorArea,
    unitarioLegacy: unitarioLegacy,
    unitarioEstandar: unitarioEstandar,
    sumarPorTalla: sumarPorTalla,
    servicioDiseno: servicioDiseno,
    redistribuirPorTalla: redistribuirPorTalla,
    precioProporcional: precioProporcional,
    redondearCliente: redondearCliente,
    margenPorTramo: margenPorTramo,
    cotizar: cotizar,
    auditar: auditar
  };
});


(function () {
  var api = window.BBWCalculo, P = window.BBW_PRECIOS;
  window.BBW = {
    P: P,
    version: P._meta.version,
    /* atajo: no hay que pasar precios.json en cada llamada */
    cot: function (pedido) { return api.cotizar(P, pedido); },
    /* ZONAS DE ENVÍO — llenar con los montos reales del doc 07 (Web System).
       Mientras estén vacías el selector solo ofrece retiro y "por confirmar". */
    zonas: (P.envio.zonas || []),
    material: function (impresion, cantidad) { return api.materialReal(P, impresion, cantidad); },
    diseno: function (ctx) { return api.servicioDiseno(P, ctx); }
  };
  Object.keys(api).forEach(function (k) { if (!(k in window.BBW)) window.BBW[k] = api[k]; });
})();
