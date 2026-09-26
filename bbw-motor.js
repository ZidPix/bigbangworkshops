/* =========================================================================
   bbw-motor.js — el motor de precios de Big Bang Workshops, en un archivo.
   GENERADO por construir.js el 2026-09-20. No editar a mano.

   Lo cargan la calculadora del sitio y el cotizador del Master Console.
   Mientras los dos carguen ESTE archivo, no se pueden desalinear.

        <script src="bbw-motor.js"></script>
   ========================================================================= */

window.BBW_PRECIOS = {

  /* ===================================================================
     ITBMS — impuesto. Un solo lugar, se aplica UNA sola vez.
     Por defecto apagado en textil para no mover ningún precio vigente.
     =================================================================== */
  "itbms": {
    "tasa": 0.07,
    "etiqueta": "ITBMS 7%",
    "base": "subtotal + diseño - descuento",
    "incluye_envio": false,
    "aplicar_por_defecto": { "estandar": false, "proporcional": false, "legacy": false, "bbw3d": true },
    "_regla": "Se calcula con itbmsDe(). Ninguna otra función lo suma: si aparece dos veces, es un bug."
  },

  /* ===================================================================
     BBW3D — línea de impresión 3D. Añadida 26 sep 2026.
     Manda el PRECIO COMERCIAL. El filamento solo sirve para auditar
     rentabilidad, nunca para construir el precio que ve el cliente.
     =================================================================== */
  "bbw3d": {
    "_uso": "Productos fabricados con impresión 3D. Catálogo con precio de venta fijo + dos modos de excepción: tabla de volumen (llaveros) y precio por peso (piezas sin precio definido).",
    "filamento": {
      "costo_por_gramo": 0.032,
      "_origen": "5 rollos de 250 g = 1250 g por $40.00 → 40/1250 = $0.032/g",
      "_uso": "Solo auditoría interna. No entra en el precio al cliente."
    },
    "diseno_personalizado": {
      "monto": 5.00,
      "_regla": "Se cobra UNA vez por cotización, no por pieza — igual que el servicio de diseño del textil."
    },
    "catalogo": {
      "topper_sencillo":       { "etiqueta": "Topper de cumpleaños",              "modo": "fijo",    "precio": 5.00,  "rango": [4, 5],   "grupo": "topper" },
      "topper_personalizado":  { "etiqueta": "Topper personalizado con nombre",   "modo": "fijo",    "precio": 7.00,  "rango": [6, 8],   "grupo": "topper" },
      "topper_complejo":       { "etiqueta": "Topper complejo / multicapa",       "modo": "fijo",    "precio": 10.00, "rango": [8, 12],  "grupo": "topper" },
      "placa_decorativa":      { "etiqueta": "Placa decorativa pequeña",          "modo": "fijo",    "precio": 9.00,  "rango": [8, 10],  "grupo": "placa" },
      "placa_auto":            { "etiqueta": "Placa personalizada para auto",     "modo": "fijo",    "precio": 15.00, "rango": [12, 18], "grupo": "placa" },
      "nombre_3d_pequeno":     { "etiqueta": "Nombre 3D — pequeño",               "modo": "fijo",    "precio": 6.00,  "rango": [6, 12],  "grupo": "nombre" },
      "nombre_3d_mediano":     { "etiqueta": "Nombre 3D — mediano",               "modo": "fijo",    "precio": 9.00,  "rango": [6, 12],  "grupo": "nombre" },
      "nombre_3d_grande":      { "etiqueta": "Nombre 3D — grande",                "modo": "fijo",    "precio": 12.00, "rango": [6, 12],  "grupo": "nombre" },
      "llavero":               { "etiqueta": "Llavero personalizado",             "modo": "volumen", "grupo": "llavero" },
      "pieza_peso":            { "etiqueta": "Pieza 3D por peso",                 "modo": "peso",    "grupo": "peso" },
      "figura_personalizada":  { "etiqueta": "Figura / pieza 3D personalizada",   "modo": "peso",    "grupo": "peso" },
      "otro":                  { "etiqueta": "Otro producto 3D",                  "modo": "manual",  "grupo": "otro" }
    },
    "llaveros_por_volumen": [
      { "cantidad": 1,   "precio": 8.00 },
      { "cantidad": 6,   "precio": 5.00 },
      { "cantidad": 12,  "precio": 4.00 },
      { "cantidad": 20,  "precio": 3.50 },
      { "cantidad": 50,  "precio": 3.00 },
      { "cantidad": 100, "precio": 2.75 },
      { "cantidad": 250, "precio": 2.50 },
      { "cantidad": 500, "precio": 2.25 }
    ],
    "_regla_volumen": "Sin interpolar. Una cantidad que no cae exacto en un nivel usa el NIVEL SIGUIENTE (7 → nivel 12 = $4.00). Por encima de 500 se mantiene $2.25.",
    "por_peso": {
      "base": 2.00,
      "por_gramo": 0.10,
      "minimo": 4.00,
      "_formula": "Math.max(4, 2 + gramos * 0.10), luego redondeo comercial al siguiente $0.50",
      "_uso": "SOLO para piezas sin precio comercial definido. Nunca para toppers ni llaveros."
    },
    "_pendiente": "Descuentos por volumen en toppers: no definidos aún. Hoy el precio fijo es plano en cualquier cantidad.",

    "tamanos": {
      "_uso": "El cliente piensa en tamaños, no en gramos. Flujo: tamaño → escala en cm → peso estimado → precio.",
      "_regla_precio": "EL TAMAÑO ES REFERENCIA (Zid, 26 sep 2026). NO cambia el precio de un producto que ya tiene precio comercial (llavero por tabla de volumen, topper, placa, nombre 3D). Solo alimenta la fórmula por peso en 'pieza_peso' y 'figura_personalizada'.",
      "_medidas": "Puntos de partida comerciales dados por Zid, no estándares rígidos: el tamaño real se adapta al diseño, la proporción y el número de letras.",
      "_pesos_confirmados": false,
      "_como_calibrar": "Los gramos son ESTIMADOS (PLA, pared normal, relleno 15-20%), escalados desde el único dato real que dio Zid: llavero de 60 mm = 18 g. Pesar 3 o 4 piezas reales de cada grupo y corregir aquí; el precio de los productos con precio comercial no cambia al hacerlo, solo la lectura de rentabilidad.",
      "etiquetas": { "S": "Pequeño", "M": "Mediano", "L": "Grande" },
      "grupos": {
        "llavero":    { "S": { "cm": "4–5 cm",   "gramos": 10 },  "M": { "cm": "6 cm",     "gramos": 18,  "recomendado": true }, "L": { "cm": "7–8 cm",   "gramos": 32 } },
        "topper":     { "S": { "cm": "10 cm",    "gramos": 13 },  "M": { "cm": "15 cm",    "gramos": 30,  "recomendado": true }, "L": { "cm": "18–20 cm", "gramos": 48 } },
        "figura":     { "S": { "cm": "5–8 cm",   "gramos": 25 },  "M": { "cm": "10–15 cm", "gramos": 70,  "recomendado": true }, "L": { "cm": "18–20 cm", "gramos": 200 } },
        "nombre":     { "S": { "cm": "10 cm",    "gramos": 15 },  "M": { "cm": "15 cm",    "gramos": 30,  "recomendado": true }, "L": { "cm": "20–25 cm", "gramos": 60 },
                        "_ojo": "El peso de un nombre depende del número de letras. Estos gramos asumen 5–6 letras." },
        "placa":      { "S": { "cm": "10 cm",    "gramos": 20 },  "M": { "cm": "15 cm",    "gramos": 45,  "recomendado": true }, "L": { "cm": "20–25 cm", "gramos": 95 } },
        "placa_auto": { "S": { "cm": "10–15 cm", "gramos": 35 },  "M": { "cm": "20 cm",    "gramos": 70,  "recomendado": true }, "L": { "cm": "25–30 cm", "gramos": 130 } },
        "peso":       { "S": { "cm": "5–8 cm",   "gramos": 25 },  "M": { "cm": "10–15 cm", "gramos": 70,  "recomendado": true }, "L": { "cm": "18–20 cm", "gramos": 200 } }
      },
      "leyenda_estimado": "Precio estimado. El precio final se confirma según el peso del modelo preparado para impresión."
    }
  },

  "_meta": {
    "version": "2.2.0",
    "fecha": "2026-09-26",
    "_cambio_2_2_0": "Selector de tamaño BBW3D (Pequeño/Mediano/Grande) con cm y peso estimado. Es REFERENCIA: no mueve el precio de productos con precio comercial; solo alimenta la fórmula por peso en figura y pieza genérica (decisión de Zid, 26 sep 2026).",
    "_cambio_2_1_0": "Se añade la línea BBW3D (impresión 3D) y el bloque ITBMS. Nada del textil cambia: unitarioEstandar, precioProporcional, unitarioLegacy y cotizar() quedan idénticos.",
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
      "3_envio": "El sitio NO debe sumar $3.50 fijo. Hay precios por zona y los elige el cliente. RESUELTO el 16 sep 2026: los montos estaban en el doc 07. Norte gratis, Condado $3.50, Centro $5.00, Interior $6.50.",
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
        "colores_disponibles": [
          "blanco",
          "negro",
          "azul",
          "navy",
          "crema/sand/beige",
          "rojo",
          "rosado"
        ],
        "_disponibilidad": "Zid, 16 sep 2026: estos son los colores que se manejan. Otros se consultan con el proveedor.",
        "nota": "La DISPONIBILIDAD esta confirmada; el COSTO por color no. doc 11 §5 solo confirma $4.50 generico. Si un color cuesta distinto, el margen de esa pieza esta mal calculado."
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
    "_fuente": "Web System (doc 07) §3 'Zonas de envío (Panamá)' y config.js shippingZones. Confirmado por Zid el 16 sep 2026.",
    "zonas": [
      {
        "id": "retiro",
        "etiqueta": "Retiro en taller",
        "monto": 0.0
      },
      {
        "id": "norte",
        "etiqueta": "Panamá Norte · San Antonio · Villa Lucre",
        "monto": 0.0,
        "nota": "envio gratis"
      },
      {
        "id": "condado",
        "etiqueta": "Condado del Rey · Tumba Muerto · Betania",
        "monto": 3.5
      },
      {
        "id": "centro",
        "etiqueta": "Panamá Centro · Punta Pacífica · Costa del Este",
        "monto": 5.0
      },
      {
        "id": "interior",
        "etiqueta": "Interior del País",
        "monto": 6.5
      }
    ],
    "permitir_por_confirmar": true,
    "_regla": "Si el cliente no dice su zona, Tyler pregunta. Nunca asume una zona ni promedia montos."
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
  },
  "tiempos_entrega": {
    "_decidido": "Zid, 16 sep 2026.",
    "_regla": "Corre desde arte aprobado y abono confirmado, no desde la cotizacion.",
    "tramos": [
      {
        "hasta": 6,
        "dias_min": 3,
        "dias_max": 5
      },
      {
        "desde": 7,
        "dias_min": 7,
        "dias_max": 10
      }
    ]
  },
  "cantidad_minima": {
    "valor": 1,
    "maximo_habitual": 500,
    "_decidido": "Zid, 16 sep 2026: no hay minimo. Desde 1 pieza hasta 500, ya contemplado en la calculadora."
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

  /* ---------------------------------------------------------------------
     7. ITBMS — un solo lugar. Si esto se suma dos veces, es un bug.
     --------------------------------------------------------------------- */
  function itbmsDe(P, base, incluir) {
    var tasa = P.itbms.tasa;
    if (!incluir) return { incluido: false, tasa: tasa, monto: 0, base: r2(base), etiqueta: P.itbms.etiqueta };
    return { incluido: true, tasa: tasa, base: r2(base), monto: r2(base * tasa), etiqueta: P.itbms.etiqueta };
  }

  /* ---------------------------------------------------------------------
     8. BBW3D — impresión 3D. Manda el precio comercial; el filamento
     solo audita. Nada de aquí toca el textil.
     --------------------------------------------------------------------- */
  function nivelLlavero(P, cantidad) {
    var tabla = P.bbw3d.llaveros_por_volumen;
    var q = Math.max(1, Math.floor(cantidad || 1));
    var nivel = null;
    for (var i = 0; i < tabla.length; i++) { if (q <= tabla[i].cantidad) { nivel = tabla[i]; break; } }
    if (!nivel) nivel = tabla[tabla.length - 1];           /* más de 500 mantiene el último nivel */
    return { unitario: nivel.precio, nivel: nivel.cantidad, exacto: nivel.cantidad === q };
  }

  function precioPorPeso(P, gramos) {
    var c = P.bbw3d.por_peso, gr = Math.max(0, gramos || 0);
    var bruto = c.base + gr * c.por_gramo;
    var minimoAplicado = bruto < c.minimo;
    var precio = Math.max(c.minimo, bruto);
    return { unitario: redondearCliente(P, precio), bruto: r2(bruto), minimoAplicado: minimoAplicado, gramos: gr };
  }

  /* Tamaño → cm + peso estimado. Referencia para el cliente; en productos
     sin precio comercial también alimenta la fórmula por peso. */
  function grupoTamano(key, prod) {
    if (key === 'placa_auto') return 'placa_auto';
    if (prod && prod.grupo === 'peso') return 'peso';
    return prod ? prod.grupo : key;
  }
  function tamano3D(P, grupo, size) {
    var t = P.bbw3d.tamanos, g3 = t.grupos[grupo];
    if (!g3) return null;
    var k = (size || 'M').toUpperCase();
    if (!g3[k]) k = 'M';
    return { size: k, etiqueta: t.etiquetas[k], cm: g3[k].cm, gramos: g3[k].gramos,
             recomendado: !!g3[k].recomendado, estimado: !t._pesos_confirmados };
  }

  function precio3D(P, item) {
    var key = item.producto;
    var prod = P.bbw3d.catalogo[key];
    if (!prod) throw new Error('Producto BBW3D desconocido: ' + key);
    var q = Math.max(1, Math.floor(item.cantidad || 1));
    var out = { producto: key, etiqueta: prod.etiqueta, modo: prod.modo, cantidad: q, avisos: [] };

    if (prod.modo === 'volumen') {
      var n = nivelLlavero(P, q);
      out.unitario = n.unitario; out.nivel = n.nivel;
      if (!n.exacto) out.avisos.push('Cantidad ' + q + ': se cobra al nivel de ' + n.nivel + ' unidades ($' + n.unitario.toFixed(2) + ' c/u), como manda la tabla.');
    } else if (prod.modo === 'peso') {
      /* sin peso escrito a mano, el tamaño da el estimado */
      var gr = item.gramos;
      if (!gr && item.tamano) {
        var tm = tamano3D(P, grupoTamano(key, prod), item.tamano);
        if (tm) { gr = tm.gramos; out.pesoEstimado = true; out.tamano = tm; }
      }
      var pw = precioPorPeso(P, gr);
      out.unitario = pw.unitario; out.gramos = pw.gramos;
      if (out.pesoEstimado) out.avisos.push('Precio estimado a partir del tamaño ' + out.tamano.etiqueta.toLowerCase() + ' (' + out.tamano.cm + ', ~' + out.tamano.gramos + ' g). Se confirma con el peso del modelo listo para imprimir.');
      if (pw.minimoAplicado) out.avisos.push('Pieza de ' + pw.gramos + ' g: se aplica el precio mínimo de $' + P.bbw3d.por_peso.minimo.toFixed(2) + '.');
      if (!gr) out.avisos.push('Falta el peso estimado: el precio sale al mínimo.');
    } else if (prod.modo === 'manual') {
      var pm = parseFloat(item.precioManual);
      if (isNaN(pm) || pm <= 0) { out.unitario = 0; out.avisos.push('Este producto necesita un precio puesto a mano.'); }
      else out.unitario = r2(pm);
    } else {
      out.unitario = prod.precio;
      if (item.gramos) out.gramos = item.gramos;
    }

    /* El tamaño viaja siempre como referencia, aunque no toque el precio.
       En productos con precio comercial solo sirve para mostrar cm/gramos
       al cliente y para leer la rentabilidad por dentro. */
    if (item.tamano && !out.tamano) {
      var tRef = tamano3D(P, grupoTamano(key, prod), item.tamano);
      if (tRef) {
        out.tamano = tRef;
        if (!out.gramos) { out.gramos = tRef.gramos; out.pesoEstimado = true; }
      }
    }

    out.subtotal = r2(out.unitario * q);
    return out;
  }

  function auditar3D(P, lineas, descuento, diseno) {
    var cpg = P.bbw3d.filamento.costo_por_gramo;
    var ingreso = 0, costoFil = 0, piezas = 0, conPeso = 0, alertas = [];
    lineas.forEach(function (l) {
      ingreso += l.subtotal; piezas += l.cantidad;
      if (l.gramos) { costoFil += l.gramos * l.cantidad * cpg; conPeso += l.cantidad; }
      (l.avisos || []).forEach(function (a) { alertas.push(a); });
    });
    ingreso += (diseno || 0);
    var ingresoNeto = ingreso - (descuento || 0);
    var out = {
      piezas: piezas, costoPorGramo: cpg,
      costoFilamento: r2(costoFil),
      pesoConocido: conPeso === piezas && piezas > 0,
      ingresoNeto: r2(ingresoNeto),
      margenSobreFilamento: r2(ingresoNeto - costoFil),
      alertas: alertas
    };
    if (conPeso === 0) out.alertas.push('Sin peso estimado no se puede leer la rentabilidad: el costo de filamento sale en cero.');
    if (out.pesoConocido && ingresoNeto > 0 && costoFil / ingresoNeto > 0.35)
      out.alertas.push('El filamento se lleva el ' + Math.round(costoFil / ingresoNeto * 100) + '% del ingreso. Revisar precio o peso de la pieza.');
    return out;
  }

  function cotizar3D(P, pedido) {
    var items = (pedido.items || []).filter(function (i) { return i && i.producto && (i.cantidad || 0) > 0; });
    if (!items.length) throw new Error('El pedido BBW3D no tiene productos.');
    var lineas = items.map(function (i) { return precio3D(P, i); });
    var subtotal = r2(lineas.reduce(function (a, l) { return a + l.subtotal; }, 0));
    var diseno = pedido.disenoPersonalizado ? P.bbw3d.diseno_personalizado.monto : 0;
    var base = r2(subtotal + diseno);
    var pct = pedido.descuentoPct || 0;
    var descuento = r2(base * pct / 100);
    var baseImp = r2(base - descuento);
    var incluirItbms = pedido.itbms != null ? pedido.itbms : P.itbms.aplicar_por_defecto.bbw3d;
    var imp = itbmsDe(P, baseImp, incluirItbms);
    var envio = pedido.envio != null ? pedido.envio : 0;
    var total = r2(baseImp + imp.monto + envio);
    var abonoPct = pedido.abonoPct != null ? pedido.abonoPct : P.abono.porcentaje;
    return {
      linea: 'bbw3d', piezas: lineas.reduce(function (a, l) { return a + l.cantidad; }, 0),
      lineas: lineas, subtotal: subtotal,
      diseno: { monto: diseno, gratis: diseno === 0 },
      descuentoPct: pct, descuento: descuento,
      itbms: imp, envio: r2(envio), total: total,
      abonoPct: abonoPct, abono: r2(total * abonoPct / 100),
      vigenciaDias: P.vigencia_dias.valor,
      auditoria: auditar3D(P, lineas, descuento, diseno)
    };
  }

  return {
    tamano3D: tamano3D,
    grupoTamano: grupoTamano,
    itbmsDe: itbmsDe,
    nivelLlavero: nivelLlavero,
    precioPorPeso: precioPorPeso,
    precio3D: precio3D,
    cotizar3D: cotizar3D,
    auditar3D: auditar3D,
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
    cot: function (pedido) { return api.cotizar(P, pedido); },
    zonas: (P.envio.zonas || []),
    material: function (impresion, cantidad) { return api.materialReal(P, impresion, cantidad); },
    diseno: function (ctx) { return api.servicioDiseno(P, ctx); },
    cot3D: function (pedido) { return api.cotizar3D(P, pedido); },
    cat3D: P.bbw3d.catalogo,
    tam3D: function (grupo, size) { return api.tamano3D(P, grupo, size); },
    tamDe: function (key, size) { var pr = P.bbw3d.catalogo[key]; return pr ? api.tamano3D(P, api.grupoTamano(key, pr), size) : null; },
    tamGrupos: P.bbw3d.tamanos.grupos,
    itbms: function (base, incluir) { return api.itbmsDe(P, base, incluir); }
  };
  Object.keys(api).forEach(function (k) { if (!(k in window.BBW)) window.BBW[k] = api[k]; });
})();
