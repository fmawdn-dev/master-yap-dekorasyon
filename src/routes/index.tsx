import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroShowcase } from "@/components/site/HeroShowcase";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { CostWizard } from "@/components/site/CostWizard";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { Brands, Stats, Testimonials } from "@/components/site/Trust";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { BEFORE_AFTER } from "@/lib/projects";
import { PROCESS, SERVICES } from "@/lib/services";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Master Yapı Dekorasyon | Anahtar Teslim Ev Yapımı & Tadilat" },
      {
        name: "description",
        content: "Anahtar teslim ev yapımı, komple tadilat, iç mimari ve dekorasyon. Ücretsiz keşif, şeffaf bütçe ve söz verilen teslim tarihi.",
      },
      { property: "og:title", content: "Master Yapı Dekorasyon | Anahtar Teslim Ev Yapımı & Tadilat" },
      { property: "og:description", content: "Keşiften anahtar teslimine ev yapımı, tadilat ve dekorasyonda tek muhatap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const feature = BEFORE_AFTER[0]!;
  return (
    <>
      <HeroShowcase />

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Hizmetlerimiz"
            title={<>Tek çatı altında <em className="text-gold-deep">üç uzmanlık</em></>}
            text="İster sıfırdan bir villa, ister tek bir banyo; aynı titizlik, aynı ekip ve aynı garanti."
          />
          <Reveal>
            <Button asChild variant="soft" size="lg">
              <Link to="/hizmetler">Tüm hizmetler <ArrowRight /></Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 120}>
              <Link to="/hizmetler" className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.title} width={s.w} height={s.h} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.25em] text-gold-deep">{s.no}</p>
                      <h3 className="mt-1 text-2xl font-medium">{s.title}</h3>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-all duration-300 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-gold-foreground">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHeading
              eyebrow="Önce & Sonra"
              title={<>Farkı kendi gözünüzle <em className="text-gold-deep">görün</em></>}
              text="İmleci görselin üzerinde gezdirin ya da parmağınızla kaydırın; tadilat öncesi ve sonrasını anında karşılaştırın."
            />
            <Reveal delay={150} className="mt-8">
              <p className="font-display text-2xl">{feature.title}</p>
              <p className="text-sm text-muted-foreground">{feature.place}</p>
              <Button asChild variant="ink" size="lg" className="mt-6">
                <Link to="/projeler">Projelerimiz <ArrowRight /></Link>
              </Button>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <BeforeAfter before={feature.before} after={feature.after} alt={feature.title} width={feature.w} height={feature.h} />
          </Reveal>
        </div>
      </section>

      {/* Stats + process */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <SectionHeading
            tone="dark"
            eyebrow="Rakamlarla Master Yapı"
            title={<>Her biri zamanında teslim edilmiş <em className="text-gold">yüzlerce yuva</em></>}
          />
          <div className="mt-14">
            <Stats />
          </div>
          <div className="mt-20 grid gap-8 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.no} delay={i * 110} className="relative">
                <p className="font-display text-6xl font-medium text-ink-foreground/15">{p.no}</p>
                <p className="mt-2 font-display text-2xl">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-foreground/65">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Online Bütçe Hesaplama"
            title={<>30 saniyede <em className="text-gold-deep">yaklaşık maliyet</em></>}
            text="Alanı, metrekareyi ve malzeme seviyesini seçin; tahmini bütçe aralığını ve süreyi hemen görün. Sonucu tek tıkla WhatsApp'tan bize iletebilirsiniz."
          />
        </div>
        <Reveal delay={100}>
          <CostWizard />
        </Reveal>
      </section>

      <div className="bg-muted/50">
        <Testimonials />
        <Brands />
      </div>

      {/* CTA */}
      <section className="px-5 py-24 md:px-8">
        <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-ink-foreground shadow-lift md:px-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">Ücretsiz & yükümlülüksüz</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight font-medium md:text-6xl">
            Hayalinizdeki evi konuşmaya bir keşifle başlayalım.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="xl">
              <Link to="/iletisim">Ücretsiz Keşif Al <ArrowRight /></Link>
            </Button>
            <Button asChild variant="whatsapp" size="xl">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp ile Bilgi Al
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
