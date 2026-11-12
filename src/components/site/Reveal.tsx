import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold-deep uppercase">
        <span className="h-px w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-4xl leading-[1.05] font-medium md:text-5xl",
          tone === "dark" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            tone === "dark" ? "text-ink-foreground/70" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}
