import kitchenAfter from "@/assets/kitchen-after.jpg";
import kitchenBefore from "@/assets/kitchen-before.jpg";
import livingAfter from "@/assets/living-after.jpg";
import livingBefore from "@/assets/living-before.jpg";
import bathroomAfter from "@/assets/bathroom-after.jpg";
import bathroomBefore from "@/assets/bathroom-before.jpg";
import villa from "@/assets/villa.jpg";
import bedroom from "@/assets/bedroom.jpg";

export const IMAGES = { kitchenAfter, kitchenBefore, livingAfter, livingBefore, bathroomAfter, bathroomBefore, villa, bedroom };

export const SHOWCASE = [
  { image: kitchenAfter, tag: "Tadilat", title: "Lüks Mutfak Tadilatı", place: "Ataşehir · 38 m²" },
  { image: livingAfter, tag: "Dekorasyon", title: "Minimalist Salon Dekorasyonu", place: "Nişantaşı · 64 m²" },
  { image: villa, tag: "Anahtar Teslim", title: "Komple Villa Yapımı", place: "Bodrum · 420 m²" },
];

export const BEFORE_AFTER = [
  { title: "Mutfak Yenileme", place: "Ataşehir · 38 m² · 5 hafta", before: kitchenBefore, after: kitchenAfter, w: 1920, h: 1088 },
  { title: "Banyo Tadilatı", place: "Kadıköy · 11 m² · 3 hafta", before: bathroomBefore, after: bathroomAfter, w: 1600, h: 1200 },
  { title: "Kaba İnşaattan Salona", place: "Nişantaşı · 64 m² · 8 hafta", before: livingBefore, after: livingAfter, w: 1920, h: 1088 },
];

export const GALLERY = [
  { image: villa, tag: "Ev Yapımı", title: "Ege Villası", place: "Bodrum", w: 1920, h: 1088 },
  { image: bedroom, tag: "İç Mimari", title: "Ebeveyn Yatak Odası", place: "Zekeriyaköy", w: 1600, h: 1200 },
  { image: kitchenAfter, tag: "Tadilat", title: "Antrasit Mutfak", place: "Ataşehir", w: 1920, h: 1088 },
  { image: bathroomAfter, tag: "Tadilat", title: "Taş Banyo", place: "Kadıköy", w: 1600, h: 1200 },
  { image: livingAfter, tag: "Dekorasyon", title: "Travertin Salon", place: "Nişantaşı", w: 1920, h: 1088 },
];
