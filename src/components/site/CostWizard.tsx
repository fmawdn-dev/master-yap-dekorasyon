import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Bath, BedDouble, Building2, Check, ChefHat, Home, Sofa } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SPACES, TIERS, estimateCost, formatTL, type SpaceId, type TierId } from "@/lib/estimate";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

const ICONS: Record<SpaceId, typeof Home> = {
  mutfak: ChefHat,
  banyo: Bath,
  salon: Sofa,
  yatak: BedDouble,
  komple: Home,
  insaat: Building2,
};

const STEPS = ["Alan", "Metrekare", "Malzeme", "Sonuç"];

export function CostWizard({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [spaceId, setSpaceId] = useState<SpaceId>("mutfak");
  const space = SPACES.find((s) => s.id === spaceId)!;
  const [area, setArea] = useState(space.defaultArea);
  const [tierId, setTierId] = useState<TierId>("premium");
  const tier = TIERS.find((t) => t.id === tierId)!;

  const result = useMemo(() => estimateCost(spaceId, area, tierId), [spaceId, area, tierId]);

  const chooseSpace = (id: SpaceId) => {
    setSpaceId(id);
    setArea(SPACES.find((s) => s.id === id)!.defaultArea);
  };

  const message = `Merhaba, maliyet hesaplama aracından geliyorum.\nAlan: ${space.label}\nMetrekare: ${area} m²\nMalzeme: ${tier.label}\nTahmini bütçe: ${formatTL(result.low)} – ${formatTL(result.high)}\nÜcretsiz keşif rica ediyorum.`;

  return (
    <div className={cn("overflow-hidden rounded-3xl border border-border bg-card shadow-lift", className)}>
      {/* Stepper */}
      <div className="border-b border-border bg-muted/60 px-6 py-5 md:px-8">
        <ol className="flex items-center gap-2">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500",
                  i < step && "bg-gold text-gold-foreground",
                  i === step && "bg-ink text-ink-foreground scale-110",
                  i > step && "bg-card text-muted-foreground border border-border",
                )}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={cn("hidden text-sm font-medium sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <span className="h-px flex-1 bg-border">
                  <span className={cn("block h-px bg-gold transition-all duration-500", i < step ? "w-full" : "w-0")} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-6 md:p-8">
        <div key={step} className="animate-in fade-in slide-in-from-right-4 min-h-[300px] duration-500">
          {step === 0 && (
            <div>
              <h3 className="text-3xl font-medium">Hangi alanı yenilemek istiyorsunuz?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Projenize en yakın seçeneği işaretleyin.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                {SPACES.map((s) => {
                  const Icon = ICONS[s.id];
                  const sel = s.id === spaceId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => chooseSpace(s.id)}
                      aria-pressed={sel}
                      className={cn(
                        "group flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                        sel ? "border-gold bg-secondary shadow-gold" : "border-border bg-card hover:border-gold/60 hover:shadow-soft",
                      )}
                    >
                      <span className={cn("grid size-10 place-items-center rounded-xl transition-colors", sel ? "bg-gradient-gold text-gold-foreground" : "bg-muted text-foreground")}>
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block font-semibold">{s.label}</span>
                        <span className="block text-xs text-muted-foreground">{s.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-3xl font-medium">{space.label} kaç metrekare?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Yaklaşık değer yeterli; keşifte kesin ölçü alınır.</p>
              <div className="mt-10 flex items-baseline gap-2">
                <span className="font-display text-7xl font-medium tabular-nums">{area}</span>
                <span className="text-xl text-muted-foreground">m²</span>
              </div>
              <Slider
                className="mt-8"
                min={space.min}
                max={space.max}
                step={space.step}
                value={[area]}
                onValueChange={([v]) => setArea(v)}
                aria-label="Metrekare"
              />
              <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>{space.min} m²</span>
                <span>{space.max} m²</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-3xl font-medium">Malzeme ve işçilik seviyesi</h3>
              <p className="mt-2 text-sm text-muted-foreground">Bütçenizi en çok belirleyen tercih budur.</p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {TIERS.map((t) => {
                  const sel = t.id === tierId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTierId(t.id)}
                      aria-pressed={sel}
                      className={cn(
                        "rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5",
                        sel ? "border-gold bg-secondary shadow-gold" : "border-border hover:border-gold/60 hover:shadow-soft",
                      )}
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-display text-2xl font-medium">{t.label}</span>
                        <span className={cn("grid size-6 place-items-center rounded-full border", sel ? "border-gold bg-gold text-gold-foreground" : "border-border")}>
                          {sel && <Check className="size-3.5" />}
                        </span>
                      </span>
                      <span className="mt-2 block text-sm text-muted-foreground">{t.hint}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-gold-deep uppercase">Tahmini bütçe aralığı</p>
              <p className="mt-3 font-display text-4xl leading-tight font-medium tabular-nums md:text-5xl">
                {formatTL(result.low)} <span className="text-muted-foreground">–</span> {formatTL(result.high)}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["Alan", space.label],
                  ["Büyüklük", `${area} m²`],
                  ["Tahmini süre", `~${result.weeks} hafta`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-muted px-4 py-3">
                    <p className="text-xs text-muted-foreground">{k}</p>
                    <p className="font-semibold">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                Bu hesaplama {tier.label.toLowerCase()} malzeme seviyesine göre yaklaşık bir fikir verir. Kesin fiyat,
                ücretsiz yerinde keşif sonrası detaylı teklifle belirlenir.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="whatsapp" size="lg">
                  <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon /> Bu teklifi WhatsApp'tan gönder
                  </a>
                </Button>
                <Button asChild variant="gold" size="lg">
                  <Link to="/iletisim">Ücretsiz Keşif Al</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ArrowLeft /> Geri
          </Button>
          {step < 3 ? (
            <Button variant="ink" size="lg" onClick={() => setStep((s) => s + 1)}>
              {step === 2 ? "Hesapla" : "Devam"} <ArrowRight />
            </Button>
          ) : (
            <Button variant="soft" onClick={() => setStep(0)}>
              Yeniden hesapla
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
