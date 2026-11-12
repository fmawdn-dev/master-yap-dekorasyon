import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { IMAGES } from "@/lib/projects";
import { SITE, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim & Ücretsiz Keşif | Master Yapı Dekorasyon" },
      { name: "description", content: "Ücretsiz keşif randevusu alın veya WhatsApp üzerinden hızlı teklif isteyin." },
      { property: "og:title", content: "İletişim & Ücretsiz Keşif | Master Yapı Dekorasyon" },
      { property: "og:description", content: "Ücretsiz keşif ve hızlı teklif için bize ulaşın." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const TYPES = ["Ev Yapımı", "Komple Tadilat", "Mutfak", "Banyo", "İç Mimari"];

function ContactPage() {
  const [type, setType] = useState(TYPES[1]);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    const district = String(f.get("district") || "").trim();
    const note = String(f.get("note") || "").trim();
    if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
      setError("Lütfen adınızı ve geçerli bir telefon numarası girin.");
      return;
    }
    setError("");
    const msg = `Merhaba, ücretsiz keşif talep ediyorum.\nAd Soyad: ${name}\nTelefon: ${phone}\nHizmet: ${type}${district ? `\nİlçe: ${district}` : ""}${note ? `\nNot: ${note}` : ""}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  const info = [
    { icon: Phone, label: "Telefon", value: SITE.phoneDisplay, href: SITE.phoneHref },
    { icon: Mail, label: "E-posta", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: "Ofis", value: SITE.address },
    { icon: Clock, label: "Çalışma saatleri", value: SITE.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title={<>Ücretsiz keşif için <em className="text-gold">bir adım</em> uzaktasınız</>}
        text="Formu doldurun, talebiniz WhatsApp üzerinden doğrudan proje ekibimize ulaşsın. Aynı gün dönüş yapıyoruz."
        image={IMAGES.livingAfter}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-card p-6 shadow-lift md:p-10">
            <h2 className="text-3xl font-medium">Keşif talep formu</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input id="name" name="name" required maxLength={80} autoComplete="name" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" name="phone" type="tel" required maxLength={20} autoComplete="tel" placeholder="05xx xxx xx xx" className="h-12 rounded-xl" />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <Label>Hizmet türü</Label>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    aria-pressed={type === t}
                    className={cn(
                      "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300",
                      type === t ? "border-gold bg-secondary shadow-gold" : "border-border hover:border-gold/60",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <Label htmlFor="district">İl / İlçe</Label>
              <Input id="district" name="district" maxLength={80} className="h-12 rounded-xl" />
            </div>
            <div className="mt-5 space-y-2">
              <Label htmlFor="note">Projenizden kısaca bahsedin</Label>
              <Textarea id="note" name="note" rows={4} maxLength={1000} className="rounded-xl" />
            </div>
            {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button type="submit" variant="gold" size="xl">
                <Send /> Ücretsiz Keşif Al
              </Button>
              <Button asChild variant="whatsapp" size="xl">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp ile Bilgi Al
                </a>
              </Button>
            </div>
          </form>
        </Reveal>
        <div className="space-y-4">
          {info.map((i, k) => (
            <Reveal key={i.label} delay={k * 100}>
              <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-gold">
                  <i.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{i.label}</p>
                  {i.href ? (
                    <a href={i.href} className="font-semibold hover:text-gold-deep">{i.value}</a>
                  ) : (
                    <p className="font-semibold">{i.value}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
