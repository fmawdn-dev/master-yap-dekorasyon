import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function BeforeAfter({
  before,
  after,
  alt,
  width,
  height,
  className,
}: {
  before: string;
  after: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={`${alt} – önce ve sonra karşılaştırması`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onPointerMove={(e) => {
        // Mouse: follow the cursor on hover. Touch/pen: only while dragging.
        if (e.pointerType === "mouse" || dragging.current) setFromX(e.clientX);
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
      }}
      className={cn(
        "group relative cursor-ew-resize touch-pan-y overflow-hidden rounded-2xl bg-muted shadow-lift select-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none",
        className,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <img src={after} alt={`${alt} – sonra`} width={width} height={height} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={before}
        alt={`${alt} – önce`}
        width={width}
        height={height}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="absolute top-4 left-4 rounded-lg bg-ink/75 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-ink-foreground uppercase backdrop-blur">
        Önce
      </span>
      <span className="absolute top-4 right-4 rounded-lg bg-gradient-gold px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gold-foreground uppercase">
        Sonra
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-ink-foreground shadow-soft" />
        <div className="absolute top-1/2 left-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink-foreground bg-gradient-gold text-gold-foreground shadow-gold transition-transform duration-300 group-hover:scale-110">
          <ChevronsLeftRight className="size-5" />
        </div>
      </div>
    </div>
  );
}
