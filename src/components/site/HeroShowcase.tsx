import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOWCASE } from "@/lib/projects";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Sticky, scroll-driven project showcase: while the visitor scrolls through this
 * tall section, the full-screen background crossfades between finished projects.
 */
export function HeroShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const n = SHOWCASE.length;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const active = Math.min(n - 1, Math.floor(progress * n * 0.999));
  const local = progress * n - active; // 0..1 within current slide

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (total * (i + 0.15)) / n, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} style={{ height: `${n * 100 + 40}vh` }} className="relative bg-ink">
      <div className="sticky top-0 h-svh overflow-hidden">
        {SHOWCASE.map((s, i) => (
          <div
            key={s.title}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i !== active}
          >
            <img
              src={s.image}
              alt={s.title}
              width={1920}
              height={1088}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="h-full w-full object-cover will-change-transform"
              style={{
                transform: `scale(${i === active ? 1.12 - local * 0.08 : 1.12})`,
                transition: "transform 0.6s ease-out",
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-hero" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pt-28 pb-16 md:px-8 md:pb-20">
          <div className="max-w-3xl text-ink-foreground">
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-ink-foreground/25 bg-ink-foreground/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-gold" />
              Anahtar Teslim · Tadilat · İç Mimari
            </p>
            <h1 className="animate-in fade-in slide-in-from-bottom-6 text-5xl leading-[0.98] font-medium duration-1000 sm:text-6xl md:text-7xl lg:text-8xl">
              Yaşam alanınızı
              <br />
              <em className="text-gold not-italic">ustalıkla</em> inşa ediyoruz.
            </h1>
            <p className="animate-in fade-in slide-in-from-bottom-4 mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/80 delay-200 duration-1000 fill-mode-both md:text-lg">
              Keşiften anahtar teslimine; ev yapımı, komple tadilat ve dekorasyonda tek muhatap, net bütçe ve
              söz verilen teslim tarihi.
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-4 mt-9 flex flex-wrap gap-3 delay-300 duration-1000 fill-mode-both">
              <Button asChild variant="gold" size="xl">
                <Link to="/iletisim">
                  Ücretsiz Keşif Al <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/projeler">Projelerimiz</Link>
              </Button>
              <Button asChild variant="whatsapp" size="xl">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp ile Bilgi Al
                </a>
              </Button>
            </div>
          </div>

          {/* Project caption + progress */}
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-ink-foreground/15 pt-6 text-ink-foreground">
            <div key={active} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
              <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {SHOWCASE[active].tag}
              </p>
              <p className="mt-1 font-display text-2xl md:text-3xl">{SHOWCASE[active].title}</p>
              <p className="text-sm text-ink-foreground/65">{SHOWCASE[active].place}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {SHOWCASE.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`${s.title} projesine geç`}
                    className="relative h-1 w-12 overflow-hidden rounded-full bg-ink-foreground/25 md:w-16"
                  >
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-300"
                      style={{ width: i < active ? "100%" : i === active ? `${Math.max(8, local * 100)}%` : "0%" }}
                    />
                  </button>
                ))}
              </div>
              <span className="hidden items-center gap-2 text-xs tracking-[0.2em] text-ink-foreground/60 uppercase md:flex">
                <ArrowDown className="size-4 animate-bounce" /> Kaydırın
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
