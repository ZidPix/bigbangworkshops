// ============================================================
// BIG BANG WORKSHOPS — CONFIGURACIÓN
// ============================================================
window.BBW = {
  // PayPal (developer.paypal.com → Live → Client ID)
  paypalClientId: "BAAsSw_l-3J5PD5dJd69au82TlG9VBhP5zWLz4xbAPSxCio_zDptORzeY6T2P0VwLOshQymkQq3h0r6VNA",
  currency: "USD",

  // Contacto
  whatsapp: "50763832139",
  email: "impresiones246@outlook.com",
  orderEmail: "impresiones246@outlook.com", // adonde llegan los pedidos
  instagram: "https://instagram.com/bigbangworkshops",

  // Zonas de envío (Panamá)
  shippingZones: [
    { id: "norte",    label: "Panamá Norte · San Antonio · Villa Lucre",        price: 0.00 },
    { id: "condado",  label: "Condado del Rey · Tumba Muerto · Betania",        price: 3.50 },
    { id: "centro",   label: "Panamá Centro · Punta Pacífica · Costa del Este", price: 5.00 },
    { id: "interior", label: "Interior del País",                               price: 6.50 }
  ],

  // Analytics (opcional)
  gaId: "",
  clarityId: "",

  // Supabase (opcional)
  supabaseUrl: "https://cglankaljvhcdyzhyooo.supabase.co",
  supabaseAnonKey: "sb_publishable_MpjauZ8iN8pzkkZaG33M2Q_iwKnSYgV"
};
