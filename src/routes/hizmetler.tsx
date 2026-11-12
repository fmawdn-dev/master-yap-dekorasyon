import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { IMAGES } from "@/lib/projects";
import { PROCESS, SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hizmetler")({
  head: () => ({
    meta: [
      { title: "Hizmetlerimiz | Master Yapı Dekorasyon" },
      { name: "description", content: "Anahtar teslim ev yapımı, mutfak-banyo ve komple ev tadilatı, iç mimari ve dekorasyon hizmetleri." },
      { property: "og:title", content: "Hizmetlerimiz | Master Yapı Dekorasyon" },
      { property: "og:description", content: "Ev yapımı, anahtar teslim tadilat ve iç mimaride tek elden çözüm." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetler"
        title={<>Projenizin her aşamasında <em className="text-gold">tek muhatap</em></>}
        text="Tasarım, inşaat, tadilat ve dekorasyonu ayrı ayrı firmalarla yürütmenin yorgunluğunu bize bırakın."
        image={IMAGES.bedroom}
      />

      <section className="mx-auto max-w-7xl space-y-24 px-5 py-24 md:px-8 md:py-32">
        {SERVICES.map((s, i) => (
          <div key={s.id} id={s.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <img src={s.image} alt={s.title} width={s.w} height={s.h} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1500ms] hover:scale-105" />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-display text-7xl font-medium text-stone">{s.no}</p>
              <h2 className="mt-2 text-4xl font-medium md:text-5xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.short}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm shadow-soft">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-gold text-gold-foreground">
                      <Check className="size-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Button asChild variant="gold" size="lg" className="mt-8">
                <Link to="/iletisim">Ücretsiz Keşif Al <ArrowRight /></Link>
              </Button>
            </Reveal>
          </div>
        ))}
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHeading eyebrow="Çalışma Sürecimiz" title="Dört adımda anahtar teslim" align="center" />
          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.no} delay={i * 110}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid size-12 place-items-center rounded-xl bg-ink font-display text-xl text-gold">{p.no}</span>
                  <p className="mt-5 font-display text-2xl">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
