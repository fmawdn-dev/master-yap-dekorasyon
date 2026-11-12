import { createFileRoute } from "@tanstack/react-router";
import { Clock, ShieldCheck, Ruler } from "lucide-react";
import { CostWizard } from "@/components/site/CostWizard";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { IMAGES } from "@/lib/projects";

export const Route = createFileRoute("/maliyet-hesaplama")({
  head: () => ({
    meta: [
      { title: "Tadilat Maliyet Hesaplama | Master Yapı Dekorasyon" },
      { name: "description", content: "Mutfak, banyo, komple ev tadilatı veya ev yapımı için metrekareye göre yaklaşık bütçenizi online hesaplayın." },
      { property: "og:title", content: "Tadilat Maliyet Hesaplama | Master Yapı Dekorasyon" },
      { property: "og:description", content: "Alan, metrekare ve malzeme seviyesine göre tahmini bütçe aralığı." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalculatorPage,
});

const NOTES = [
  { icon: Ruler, title: "Ücretsiz keşif", text: "Kesin ölçü ve ihtiyaç analizi yerinde yapılır." },
  { icon: ShieldCheck, title: "Sabit fiyat garantisi", text: "Onaylanan teklif, iş bitene kadar değişmez." },
  { icon: Clock, title: "24 saatte dönüş", text: "Talebinize en geç bir iş günü içinde yanıt veririz." },
];

function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Maliyet Hesaplama"
        title={<>Bütçenizi <em className="text-gold">önceden</em> bilin</>}
        text="Dört kısa adımda yaklaşık maliyet ve süreyi görün; sonucu dilerseniz WhatsApp'tan bize iletin."
        image={IMAGES.kitchenAfter}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <CostWizard />
        </Reveal>
        <div className="space-y-4">
          {NOTES.map((n, i) => (
            <Reveal key={n.title} delay={i * 110}>
              <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-gold">
                  <n.icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
