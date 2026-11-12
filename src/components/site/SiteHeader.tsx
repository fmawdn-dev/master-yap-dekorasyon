import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/projeler", label: "Projeler" },
  { to: "/maliyet-hesaplama", label: "Maliyet Hesapla" },
  { to: "/proje-asistani", label: "AI Asistan" },
  { to: "/iletisim", label: "İletişim" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // The home showcase is a tall sticky section; keep the header dark while it is on screen.
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setInHero(window.scrollY < window.innerHeight * 2.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const overHero = pathname === "/" && inHero && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overHero
          ? cn("text-ink-foreground", scrolled ? "bg-ink/40 backdrop-blur-xl" : "bg-transparent")
          : "border-b border-border/60 bg-background/85 text-foreground shadow-soft backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-gold font-display text-xl font-semibold text-gold-foreground shadow-gold transition-transform duration-300 group-hover:rotate-6">
            M
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold tracking-wide">Master Yapı</span>
            <span className={cn("block text-[10px] font-semibold tracking-[0.3em] uppercase", overHero ? "text-ink-foreground/70" : "text-muted-foreground")}>
              Dekorasyon
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                overHero ? "hover:bg-ink-foreground/10" : "hover:bg-secondary",
              )}
              activeProps={{ className: "text-gold-deep" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" className="hidden sm:inline-flex">
            <Link to="/iletisim">Ücretsiz Keşif Al</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-xl lg:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-in fade-in slide-in-from-top-2 border-t border-border bg-background px-5 pb-6 lg:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="block rounded-xl px-3 py-3.5 font-display text-2xl"
              activeProps={{ className: "text-gold-deep" }}
            >
              {n.label}
            </Link>
          ))}
          <Button asChild variant="gold" size="lg" className="mt-3 w-full">
            <Link to="/iletisim">Ücretsiz Keşif Al</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
