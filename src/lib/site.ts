// Contact details shown across the site. Placeholder values — replace with the real ones.
export const SITE = {
  name: "Master Yapı Dekorasyon",
  phoneDisplay: "+90 555 000 00 00",
  phoneHref: "tel:+905550000000",
  whatsappNumber: "905550000000",
  email: "info@masteryapidekorasyon.com",
  address: "Bağdat Caddesi No: 000, Kadıköy / İstanbul",
  hours: "Pzt – Cmt · 09:00 – 19:00",
};

export function whatsappLink(message = "Merhaba, projem hakkında bilgi almak istiyorum.") {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
