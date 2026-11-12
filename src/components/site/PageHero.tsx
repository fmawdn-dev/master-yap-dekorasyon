import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: ReactNode; text: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink pt-18 text-ink-foreground">
      {image && (
        <>
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" style={{ animation: "kenburns 2.4s cubic-bezier(0.22,1,0.36,1) both" }} />
          <div className="absolute inset-0 bg-gradient-hero" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="animate-in fade-in slide-in-from-bottom-2 mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold uppercase duration-700">
          <span className="h-px w-8 bg-gold" /> {eyebrow}
        </p>
        <h1 className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl text-5xl leading-[1.02] font-medium duration-1000 md:text-7xl">{title}</h1>
        <p className="animate-in fade-in slide-in-from-bottom-4 mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/75 delay-150 duration-1000 fill-mode-both">{text}</p>
      </div>
    </section>
  );
}
