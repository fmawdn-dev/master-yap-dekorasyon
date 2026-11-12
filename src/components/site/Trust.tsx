import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const STATS = [
  { value: 480, suffix: "+", label: "Tamamlanan proje" },
  { value: 18, suffix: " yıl", label: "Sektör deneyimi" },
  { value: 98, prefix: "%", label: "Müşteri memnuniyeti" },
  { value: 45, suffix: "", label: "Uzman usta & mimar" },
];

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string | undefined; suffix?: string | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1600);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/10 md:grid-cols-4">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 90} className="bg-ink px-6 py-10 text-center">
          <p className="font-display text-5xl font-medium text-gold md:text-6xl">
            <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
          </p>
          <p className="mt-2 text-sm text-ink-foreground/65">{s.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

const TESTIMONIALS = [
  {
    text: "Mutfağımızı 5 haftada, söz verilen bütçenin bir lira üstüne çıkmadan teslim ettiler. Her gün fotoğraflı bilgi geldi; işimize hiç karışmak zorunda kalmadık.",
    name: "Elif & Murat K.",
    project: "Mutfak tadilatı · Ataşehir",
  },
  {
    text: "Kaba inşaattan teslim aldıkları daireyi bambaşka bir eve dönüştürdüler. Malzeme seçimlerinde gösterdikleri özen gerçekten fark yaratıyor.",
    name: "Selin A.",
    project: "Komple iç mimari · Nişantaşı",
  },
  {
    text: "Bodrum'daki villamızı projeden anahtara kadar tek elden yönettiler. Uzaktan takip etmemize rağmen hiçbir sürprizle karşılaşmadık.",
    name: "Kerem T.",
    project: "Anahtar teslim villa · Bodrum",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading eyebrow="Müşteri Yorumları" title={<>Evini bize emanet edenler <em className="text-gold-deep">anlatıyor</em></>} />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 120}>
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-4 fill-current" />
                  ))}
                </div>
                <Quote className="size-7 text-stone" />
              </div>
              <blockquote className="mt-5 flex-1 leading-relaxed text-foreground/85">“{t.text}”</blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.project}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const BRANDS = [
  { name: "VitrA", cls: "font-sans font-extrabold tracking-tight" },
  { name: "GROHE", cls: "font-sans font-black tracking-[0.2em]" },
  { name: "Kale", cls: "font-display italic font-semibold text-3xl" },
  { name: "Blum", cls: "font-sans font-bold tracking-wide" },
  { name: "Häfele", cls: "font-display font-semibold tracking-wide" },
  { name: "hansgrohe", cls: "font-sans font-semibold lowercase tracking-tight" },
  { name: "Filli Boya", cls: "font-sans font-extrabold italic" },
  { name: "JOTUN", cls: "font-sans font-black tracking-[0.25em]" },
  { name: "Schüco", cls: "font-sans font-bold tracking-[0.1em]" },
  { name: "Knauf", cls: "font-sans font-black" },
  { name: "Çanakkale Seramik", cls: "font-display font-semibold text-xl" },
  { name: "Artema", cls: "font-display italic font-medium tracking-wide" },
];

export function Brands() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
      <SectionHeading
        eyebrow="Çözüm Ortaklarımız"
        title="Yalnızca birinci sınıf malzeme"
        text="Projelerimizde garantili, uzun ömürlü ve sertifikalı markalarla çalışıyoruz."
        align="center"
      />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {BRANDS.map((b, i) => (
          <Reveal key={b.name} delay={(i % 6) * 60}>
            <div className="grid h-24 place-items-center rounded-2xl border border-border bg-card px-4 text-center text-2xl text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-foreground hover:shadow-soft">
              <span className={b.cls}>{b.name}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
