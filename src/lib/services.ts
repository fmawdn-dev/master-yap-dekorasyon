import { IMAGES } from "./projects";

export const SERVICES = [
  {
    id: "ev-yapimi",
    no: "01",
    title: "Anahtar Teslim Ev Yapımı",
    short: "Arsadan anahtara; proje, ruhsat, inşaat ve iç mimari tek elden.",
    image: IMAGES.villa,
    w: 1920,
    h: 1088,
    points: ["Mimari & statik proje, ruhsat süreçleri", "Kaba ve ince inşaat", "Peyzaj, havuz ve dış cephe", "Akıllı ev ve enerji verimliliği"],
  },
  {
    id: "tadilat",
    no: "02",
    title: "Anahtar Teslim Tadilat",
    short: "Mutfak, banyo veya komple ev; söküm dahil, söz verilen tarihte teslim.",
    image: IMAGES.kitchenAfter,
    w: 1920,
    h: 1088,
    points: ["Mutfak & banyo yenileme", "Elektrik, sıhhi tesisat, yalıtım", "Zemin, alçı, boya ve aydınlatma", "Haftalık fotoğraflı ilerleme raporu"],
  },
  {
    id: "ic-mimari",
    no: "03",
    title: "İç Mimari & Dekorasyon",
    short: "Yaşam tarzınıza göre kurgulanan, 3D ile önceden gördüğünüz mekânlar.",
    image: IMAGES.livingAfter,
    w: 1920,
    h: 1088,
    points: ["3D görselleştirme ve moodboard", "Özel üretim mobilya & dolap", "Malzeme ve renk danışmanlığı", "Aksesuar ve tekstil stilizasyonu"],
  },
];

export const PROCESS = [
  { no: "01", title: "Ücretsiz Keşif", text: "Yerinde ölçü, ihtiyaç analizi ve ilk fikirler." },
  { no: "02", title: "Proje & Teklif", text: "3D tasarım, kalem kalem şeffaf bütçe." },
  { no: "03", title: "Uygulama", text: "Tek proje yöneticisi, haftalık raporlama." },
  { no: "04", title: "Anahtar Teslim", text: "Temizlik dahil teslim ve 2 yıl işçilik garantisi." },
];
