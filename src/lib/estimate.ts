// Approximate renovation cost model. Unit prices are indicative placeholders (TL / m²).
export type SpaceId = "mutfak" | "banyo" | "salon" | "yatak" | "komple" | "insaat";
export type TierId = "standart" | "premium" | "luks";

export interface SpaceOption {
  id: SpaceId;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  defaultArea: number;
  pricePerM2: number;
  weeksPer10m2: number;
  minWeeks: number;
}

export const SPACES: SpaceOption[] = [
  { id: "mutfak", label: "Mutfak", hint: "Dolap, tezgâh, tesisat", min: 5, max: 40, step: 1, defaultArea: 12, pricePerM2: 26000, weeksPer10m2: 1.5, minWeeks: 2 },
  { id: "banyo", label: "Banyo", hint: "Seramik, vitrifiye, duş", min: 3, max: 20, step: 1, defaultArea: 6, pricePerM2: 32000, weeksPer10m2: 2.5, minWeeks: 2 },
  { id: "salon", label: "Salon", hint: "Zemin, duvar, aydınlatma", min: 12, max: 80, step: 1, defaultArea: 30, pricePerM2: 11000, weeksPer10m2: 0.6, minWeeks: 2 },
  { id: "yatak", label: "Yatak Odası", hint: "Giyinme, panel, zemin", min: 8, max: 40, step: 1, defaultArea: 16, pricePerM2: 10000, weeksPer10m2: 0.8, minWeeks: 1 },
  { id: "komple", label: "Komple Ev Tadilatı", hint: "Anahtar teslim yenileme", min: 50, max: 400, step: 5, defaultArea: 120, pricePerM2: 15000, weeksPer10m2: 0.6, minWeeks: 6 },
  { id: "insaat", label: "Anahtar Teslim Ev Yapımı", hint: "Villa / müstakil konut", min: 100, max: 800, step: 10, defaultArea: 250, pricePerM2: 34000, weeksPer10m2: 0.22, minWeeks: 24 },
];

export const TIERS: { id: TierId; label: string; hint: string; multiplier: number }[] = [
  { id: "standart", label: "Standart", hint: "Kaliteli, ekonomik seçimler", multiplier: 1 },
  { id: "premium", label: "Premium", hint: "Üst segment markalar", multiplier: 1.35 },
  { id: "luks", label: "Lüks", hint: "Doğal taş, özel üretim", multiplier: 1.8 },
];

export function estimateCost(spaceId: SpaceId, area: number, tierId: TierId) {
  const space = SPACES.find((s) => s.id === spaceId)!;
  const tier = TIERS.find((t) => t.id === tierId)!;
  const mid = space.pricePerM2 * area * tier.multiplier;
  const round = (n: number) => Math.round(n / 5000) * 5000;
  const weeks = Math.max(space.minWeeks, Math.round((area / 10) * space.weeksPer10m2));
  return { low: round(mid * 0.88), high: round(mid * 1.12), weeks };
}

export const formatTL = (n: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
