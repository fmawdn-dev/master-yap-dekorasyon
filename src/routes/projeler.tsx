import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { Stats } from "@/components/site/Trust";
import { BEFORE_AFTER, GALLERY, IMAGES } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projeler")({
  head: () => ({
    meta: [
      { title: "Projelerimiz – Önce & Sonra | Master Yapı Dekorasyon" },
      { name: "description", content: "Tamamlanan tadilat, iç mimari ve anahtar teslim ev projelerimizi önce ve sonra karşılaştırmasıyla inceleyin." },
      { property: "og:title", content: "Projelerimiz – Önce & Sonra | Master Yapı Dekorasyon" },
      { property: "og:description", content: "Tadilat öncesi ve sonrasını kaydırarak karşılaştırın." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projeler"
        title={<>Sözümüzün <em className="text-gold">kanıtı</em>, bitmiş işlerimiz</>}
        text="İmleci görsellerin üzerinde gezdirin veya kaydırın: tadilat öncesi ve sonrası tek bakışta."
        image={IMAGES.villa}
      />

      <section className="mx-auto max-w-7xl space-y-20 px-5 py-24 md:px-8 md:py-32">
        {BEFORE_AFTER.map((p, i) => (
          <div key={p.title} className="grid items-center gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <p className="text-xs font-semibold tracking-[0.25em] text-gold-deep uppercase">Önce & Sonra · {String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-4xl font-medium">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.place}</p>
            </Reveal>
            <Reveal delay={100}>
              <BeforeAfter before={p.before} after={p.after} alt={p.title} width={p.w} height={p.h} />
            </Reveal>
          </div>
        ))}
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <Stats />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow="Galeri" title="Tamamlanan projelerden seçkiler" />
        <div className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 100} className={cn(i === 0 && "md:col-span-2 md:row-span-2", i === 3 && "md:col-span-2")}>
              <figure className="group relative h-full overflow-hidden rounded-2xl shadow-soft">
                <img src={g.image} alt={g.title} width={g.w} height={g.h} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 text-ink-foreground">
                  <span className="rounded-md bg-gold px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] text-gold-foreground uppercase">{g.tag}</span>
                  <p className="mt-2 font-display text-2xl">{g.title}</p>
                  <p className="text-sm text-ink-foreground/70">{g.place}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Button asChild variant="gold" size="xl">
            <Link to="/iletisim">Sıradaki proje sizinki olsun <ArrowRight /></Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
